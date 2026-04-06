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

    const baseOldData = existing?.changed_data?.old || oldData || {};
    const { changedOld, changedNew } = buildChangedData(baseOldData, newData || {});

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
  const queueSoftDelete = (oldRow) => {
    if (!oldRow) return;

    queueUpdate(
      dirtyMap,
      setDirtyMap,
      tableName,
      rowId,
      oldRow,
      {
        ...oldRow,
        soft_delete: 1,
      }
    );
  };

  if (tableName === 'corp_data') {
    const corp = draftData?.corp_data?.find((row) => row.id === rowId);
    queueSoftDelete(corp);

    (corp?.transactions || []).forEach((tx) => {
      queueUpdate(
        dirtyMap,
        setDirtyMap,
        'transactions',
        tx.id,
        tx,
        {
          ...tx,
          soft_delete: 1,
        }
      );
    });

    return;
  }

  const row = tableName === 'transactions'
    ? draftData?.corp_data?.flatMap((corp) => corp.transactions || []).find((item) => item.id === rowId)
    : draftData?.[tableName]?.find?.((item) => item.id === rowId);

  queueSoftDelete(row);
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
    return next;
  });
}
