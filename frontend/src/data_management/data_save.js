import { useState, useEffect } from 'react';
import { queueUpdate, queueInsert, removeDirtyEntry } from './syncOperations';
import { pushSyncPayload } from './syncNetwork';
import { hydrateAppDataTransactions } from '../components/transaction_table/transactionTableHelpers';

function extractServerIdMappings(serverResponse = {}) {
  const mappings = [];
  const seen = new Set();

  const visit = (node, inheritedTableName = null) => {
    if (!node || typeof node !== 'object') {
      return;
    }

    if (Array.isArray(node)) {
      node.forEach((item) => visit(item, inheritedTableName));
      return;
    }

    const tableName =
      node.table_name ||
      node.tableName ||
      node.entity_name ||
      node.entityName ||
      inheritedTableName;

    const tempId =
      node.temp_id ??
      node.tempId ??
      node.client_temp_id ??
      node.clientTempId ??
      node.old_id ??
      node.oldId ??
      node.client_id ??
      node.clientId;

    const realId =
      node.real_id ??
      node.realId ??
      node.new_id ??
      node.newId ??
      node.inserted_id ??
      node.insertedId ??
      node.server_id ??
      node.serverId ??
      node.id;

    if (tableName && Number(tempId) < 0 && Number(realId) > 0) {
      const key = `${tableName}_${tempId}_${realId}`;
      if (!seen.has(key)) {
        seen.add(key);
        mappings.push({
          tableName,
          tempId: Number(tempId),
          realId: Number(realId),
        });
      }
    }

    Object.values(node).forEach((value) => visit(value, tableName));
  };

  visit(serverResponse);
  return mappings;
}

function applyServerIdMappings(appData, mappings) {
  if (!appData || mappings.length === 0) {
    return appData;
  }

  const corpIdMap = new Map();
  const transactionIdMap = new Map();

  mappings.forEach(({ tableName, tempId, realId }) => {
    if (tableName === 'corp_data') {
      corpIdMap.set(tempId, realId);
    }

    if (tableName === 'transactions') {
      transactionIdMap.set(tempId, realId);
    }
  });

  const nextData = {
    ...appData,
    corp_data: (appData.corp_data || []).map((corp) => {
      const nextCorpId = corpIdMap.get(corp.id) ?? corp.id;

      return {
        ...corp,
        id: nextCorpId,
        transactions: (corp.transactions || []).map((tx) => ({
          ...tx,
          id: transactionIdMap.get(tx.id) ?? tx.id,
          corp_id: corpIdMap.get(tx.corp_id) ?? nextCorpId,
        })),
        local_tree: (corp.local_tree || []).map((node) => ({
          ...node,
          corp_id: corpIdMap.get(node.corp_id) ?? nextCorpId,
        })),
        employees: (corp.employees || []).map((employee) => ({
          ...employee,
          corp_id: corpIdMap.get(employee.corp_id) ?? nextCorpId,
        })),
      };
    }),
  };

  if (nextData.max_ids) {
    if (corpIdMap.size > 0) {
      nextData.max_ids = {
        ...nextData.max_ids,
        corp_data: Math.max(
          nextData.max_ids.corp_data || 0,
          ...Array.from(corpIdMap.values())
        ),
      };
    }

    if (transactionIdMap.size > 0) {
      nextData.max_ids = {
        ...nextData.max_ids,
        transactions: Math.max(
          nextData.max_ids.transactions || 0,
          ...Array.from(transactionIdMap.values())
        ),
      };
    }
  }

  return nextData;
}

export function useSyncManager(initialData, refreshDataFn = async () => {}) {
  const [originalData, setOriginalData] = useState(initialData || null);
  const [draftData, setDraftData] = useState(initialData || null);
  const [dirtyMap, setDirtyMap] = useState({});

  useEffect(() => {
    if (initialData) {
      const hydratedData = hydrateAppDataTransactions(initialData);
      setOriginalData(hydratedData);
      setDraftData(hydratedData);
      setDirtyMap({});
    }
  }, [initialData]);

  const handleInsertRow = (tableName, rowId, changes) => {
    queueInsert(setDirtyMap, tableName, rowId, changes);
  };

  const handleRemoveDirtyRow = (actionType, tableName, rowId) => {
    removeDirtyEntry(setDirtyMap, actionType, tableName, rowId);
  };

  const handleCancel = () => {
    setDraftData(originalData);
    setDirtyMap({});
  };

  const handleInsertCorp = (newCorpData) => {
    const tempId = -Math.abs(Date.now());

    const insertPayload = {
      name: newCorpData.name?.trim() || '',
      current_balance: newCorpData.current_balance ?? 0,
      current_foreign: newCorpData.current_foreign ?? 0,
      is_foreign: newCorpData.is_foreign ?? 0,
      inverse: newCorpData.inverse ?? 0,
      last_verified_date: newCorpData.last_verified_date ?? null,
      last_verified_balance: newCorpData.last_verified_balance ?? null,
      last_verified_total_foreign: newCorpData.last_verified_total_foreign ?? null,
      start_day: newCorpData.start_day ?? 1,
      display_order: newCorpData.display_order ?? 0,
      corp_category_id: newCorpData.corp_category_id ?? null,
      soft_delete: newCorpData.soft_delete ?? 0,
    };

    const newCorpRow = {
      id: tempId,
      ...insertPayload,
      local_tree: [],
      employees: [],
      transactions: [],
    };

    setDraftData((prev) => ({
      ...prev,
      corp_data: [...(prev?.corp_data || []), newCorpRow],
    }));

    setDirtyMap((prev) => ({
      ...prev,
      [`corp_data_${tempId}_INSERT`]: {
        table_name: 'corp_data',
        row_id: tempId,
        action_type: 'INSERT',
        changes: insertPayload,
      },
    }));
  };

  const handleUpdate = (tableName, rowId, oldData, newData) => {
    queueUpdate(dirtyMap, setDirtyMap, tableName, rowId, oldData, newData);
  };

  const handleSave = async () => {
    if (!draftData) return;

    const result = await pushSyncPayload(
      dirtyMap,
      draftData.current_audit_id || 0,
      refreshDataFn
    );

    if (result.success) {
      const idMappings = extractServerIdMappings(result.server_response || result.simulated_backend || {});

      const nextData = hydrateAppDataTransactions(
        applyServerIdMappings(
          {
            ...draftData,
            current_audit_id: result.current_audit_id ?? draftData.current_audit_id,
          },
          idMappings
        )
      );

      setOriginalData(nextData);
      setDraftData(nextData);
      setDirtyMap({});
      localStorage.setItem('app_sync_state', JSON.stringify(nextData));
    } else if (result.retryNeeded) {
      alert('The database was updated by someone else. Please review and save again.');
    } else {
      alert(result.error || 'Save failed.');
    }
  };

  return {
    draftData,
    setDraftData,
    isDirty: Object.keys(dirtyMap).length > 0,
    handleUpdate,
    handleInsertRow,
    handleRemoveDirtyRow,
    handleSave,
    handleInsertCorp,
    handleCancel,
  };
}
