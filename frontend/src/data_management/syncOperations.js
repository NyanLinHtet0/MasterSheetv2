function buildChangedData(oldData, newData) {
  const changedOld = {};
  const changedNew = {};

  const keys = new Set([
    ...Object.keys(oldData || {}),
    ...Object.keys(newData || {}),
  ]);

  for (const key of keys) {
    if (oldData?.[key] !== newData?.[key]) {
      changedOld[key] = oldData?.[key];
      changedNew[key] = newData?.[key];
    }
  }

  return { changedOld, changedNew };
}

export function queueUpdate(dirtyMap, setDirtyMap, tableName, rowId, oldData, newData) {
  const entityKey = `${tableName}_${rowId}_UPDATE`;

  setDirtyMap((prev) => {
    const next = { ...prev };
    const existing = next[entityKey];

    // If this row already has an update queued, compare against its ORIGINAL old state
    const baseOldData = existing?.changed_data?.old || oldData || {};
    const { changedOld, changedNew } = buildChangedData(baseOldData, newData || {});

    // Net zero change: remove the queued update entirely
    if (Object.keys(changedNew).length === 0) {
      delete next[entityKey];
      return next;
    }

    next[entityKey] = {
      table_name: tableName,
      row_id: rowId,
      action_type: 'UPDATE',
      changed_data: {
        old: changedOld,
        new: changedNew,
      },
    };

    return next;
  });
}

export function queueDelete(dirtyMap, setDirtyMap, draftData, tableName, rowId) {
  const additions = {};
  additions[`${tableName}_${rowId}_DELETE`] = {
    table_name: tableName,
    row_id: rowId,
    action_type: 'DELETE' // Treat as soft-delete on backend
  };

  // 2. Handling "Orphaned" Data
  if (tableName === 'corp_data') {
    const corp = draftData.corp_data.find(c => c.id === rowId);
    if (corp) {
      corp.transactions.forEach(tx => {
        additions[`transactions_${tx.id}_DELETE`] = {
          table_name: 'transactions',
          row_id: tx.id,
          action_type: 'DELETE'
        };
      });
      // Do the same for employees if needed
    }
  }

  setDirtyMap(prev => ({ ...prev, ...additions }));
}

export function queueInsert(setDirtyMap, tableName, rowId, changes) {
  const entityKey = `${tableName}_${rowId}_INSERT`;

  setDirtyMap((prev) => ({
    ...prev,
    [entityKey]: {
      table_name: tableName,
      row_id: rowId,
      action_type: 'INSERT',
      changes,
    },
  }));
}

export function removeDirtyEntry(setDirtyMap, actionType, tableName, rowId) {
  const entityKey = `${tableName}_${rowId}_${actionType}`;

  setDirtyMap((prev) => {
    const next = { ...prev };
    delete next[entityKey];
    delete next[`${tableName}_${rowId}_UPDATE`];
    delete next[`${tableName}_${rowId}_DELETE`];
    return next;
  });
}