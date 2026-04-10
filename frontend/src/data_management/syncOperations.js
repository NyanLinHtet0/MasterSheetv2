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

function normalizeTableName(tableName) {
  const normalized = String(tableName || '').trim();
  const aliases = {
    localTree: 'local_tree',
    inventoryTree: 'inventory_tree',
    globalTree: 'global_tree',
    corpData: 'corp_data',
    financialSummary: 'financial_summary',
    linkTable: 'link_table',
    paymentTable: 'payment_table',
  };

  return aliases[normalized] || normalized;
}

export function queueUpdate(dirtyMap, setDirtyMap, tableName, rowId, oldData, newData) {
  const normalizedTableName = normalizeTableName(tableName);
  const entityKey = `${normalizedTableName}_${rowId}_UPDATE`;

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
      table_name: normalizedTableName,
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
  const normalizedTableName = normalizeTableName(tableName);
  const queueSoftDelete = (oldRow) => {
    if (!oldRow) return;

    queueUpdate(
      dirtyMap,
      setDirtyMap,
      normalizedTableName,
      rowId,
      oldRow,
      {
        ...oldRow,
        soft_delete: 1,
      }
    );
  };

  if (normalizedTableName === 'corp_data') {
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

  const row = normalizedTableName === 'transactions'
    ? draftData?.corp_data?.flatMap((corp) => corp.transactions || []).find((item) => item.id === rowId)
    : draftData?.[normalizedTableName]?.find?.((item) => item.id === rowId);

  queueSoftDelete(row);
}

export function queueInsert(setDirtyMap, tableName, rowId, changes) {
  const normalizedTableName = normalizeTableName(tableName);
  const entityKey = `${normalizedTableName}_${rowId}_INSERT`;

  setDirtyMap((prev) => ({
      ...prev,
      [entityKey]: {
      table_name: normalizedTableName,
      row_id: rowId,
      action_type: 'INSERT',
      changes,
    },
  }));
}

export function removeDirtyEntry(setDirtyMap, actionType, tableName, rowId) {
  const normalizedTableName = normalizeTableName(tableName);
  const entityKey = `${normalizedTableName}_${rowId}_${actionType}`;

  setDirtyMap((prev) => {
    const next = { ...prev };
    delete next[entityKey];
    delete next[`${normalizedTableName}_${rowId}_UPDATE`];
    return next;
  });
}
