import { useState, useEffect } from 'react';
import { queueUpdate, queueInsert, removeDirtyEntry } from './syncOperations';
import { pushSyncPayload } from './syncNetwork';
import { hydrateAppDataTransactions } from '../components/transaction_table/transactionTableHelpers';

function extractServerIdMappings(serverResponse = {}, dirtyMap = {}) {
  const mappings = [];
  const seen = new Set();
  const insertTableByTempId = new Map();

  Object.values(dirtyMap || {}).forEach((action) => {
    if (
      action?.action_type === 'INSERT' &&
      Number(action?.row_id) < 0 &&
      action?.table_name
    ) {
      insertTableByTempId.set(Number(action.row_id), action.table_name);
    }
  });

  const visit = (node, inheritedTableName = null) => {
    if (!node || typeof node !== 'object') {
      return;
    }

    if (Array.isArray(node)) {
      node.forEach((item) => visit(item, inheritedTableName));
      return;
    }

    const explicitTableName =
      node.table_name ||
      node.tableName ||
      node.entity_name ||
      node.entityName ||
      null;

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

    const resolvedTableName =
      explicitTableName ??
      (Number(tempId) < 0 ? insertTableByTempId.get(Number(tempId)) : null) ??
      inheritedTableName;

    if (node.id_maps && typeof node.id_maps === 'object' && !Array.isArray(node.id_maps)) {
      Object.entries(node.id_maps).forEach(([rawTempId, rawRealId]) => {
        const parsedTempId = Number(rawTempId);
        const parsedRealId = Number(rawRealId);
        const mappedTableName = insertTableByTempId.get(parsedTempId) || inheritedTableName;

        if (!mappedTableName || parsedTempId >= 0 || parsedRealId <= 0) {
          return;
        }

        const key = `${mappedTableName}_${parsedTempId}_${parsedRealId}`;
        if (!seen.has(key)) {
          seen.add(key);
          mappings.push({
            tableName: mappedTableName,
            tempId: parsedTempId,
            realId: parsedRealId,
          });
        }
      });
    }

    if (resolvedTableName && Number(tempId) < 0 && Number(realId) > 0) {
      const key = `${resolvedTableName}_${tempId}_${realId}`;
      if (!seen.has(key)) {
        seen.add(key);
        mappings.push({
          tableName: resolvedTableName,
          tempId: Number(tempId),
          realId: Number(realId),
        });
      }
    }

    Object.values(node).forEach((value) => visit(value, resolvedTableName));
  };

  visit(serverResponse);

  const explicitMappings = Array.isArray(serverResponse?.id_mappings)
    ? serverResponse.id_mappings
    : [];

  explicitMappings.forEach((mapping) => {
    const tableName = mapping?.table_name || mapping?.tableName;
    const tempId = Number(mapping?.temp_id ?? mapping?.tempId);
    const realId = Number(mapping?.real_id ?? mapping?.realId);

    if (!tableName || tempId >= 0 || realId <= 0) {
      return;
    }

    const key = `${tableName}_${tempId}_${realId}`;
    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    mappings.push({
      tableName,
      tempId,
      realId,
    });
  });

  return mappings;
}

function applyServerIdMappings(appData, mappings) {
  if (!appData || mappings.length === 0) {
    return appData;
  }

  const corpIdMap = new Map();
  const transactionIdMap = new Map();
  const localTreeIdMap = new Map();
  const inventoryTreeIdMap = new Map();
  const employeeIdMap = new Map();
  const assetIdMap = new Map();

  mappings.forEach(({ tableName, tempId, realId }) => {
    if (tableName === 'corp_data') {
      corpIdMap.set(tempId, realId);
    }

    if (tableName === 'transactions') {
      transactionIdMap.set(tempId, realId);
    }

    if (tableName === 'local_tree') {
      localTreeIdMap.set(tempId, realId);
    }

    if (tableName === 'inventory_tree') {
      inventoryTreeIdMap.set(tempId, realId);
    }

    if (tableName === 'employee') {
      employeeIdMap.set(tempId, realId);
    }

    if (tableName === 'assets') {
      assetIdMap.set(tempId, realId);
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
          local_tree_id: localTreeIdMap.get(tx.local_tree_id) ?? tx.local_tree_id,
          inven_id: inventoryTreeIdMap.get(tx.inven_id) ?? tx.inven_id,
          employee_id: employeeIdMap.get(tx.employee_id) ?? tx.employee_id,
          asset_id: assetIdMap.get(tx.asset_id) ?? tx.asset_id,
        })),
        local_tree: (corp.local_tree || []).map((node) => ({
          ...node,
          id: localTreeIdMap.get(node.id) ?? node.id,
          corp_id: corpIdMap.get(node.corp_id) ?? nextCorpId,
          parent_id: localTreeIdMap.get(node.parent_id) ?? node.parent_id,
        })),
        inventory_tree: (corp.inventory_tree || []).map((node) => ({
          ...node,
          id: inventoryTreeIdMap.get(node.id) ?? node.id,
          corp_id: corpIdMap.get(node.corp_id) ?? nextCorpId,
          parent_id: inventoryTreeIdMap.get(node.parent_id) ?? node.parent_id,
        })),
        employees: (corp.employees || []).map((employee) => ({
          ...employee,
          id: employeeIdMap.get(employee.id) ?? employee.id,
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

    if (localTreeIdMap.size > 0) {
      nextData.max_ids = {
        ...nextData.max_ids,
        local_tree: Math.max(
          nextData.max_ids.local_tree || 0,
          ...Array.from(localTreeIdMap.values())
        ),
      };
    }

    if (inventoryTreeIdMap.size > 0) {
      nextData.max_ids = {
        ...nextData.max_ids,
        inventory_tree: Math.max(
          nextData.max_ids.inventory_tree || 0,
          ...Array.from(inventoryTreeIdMap.values())
        ),
      };
    }

    if (employeeIdMap.size > 0) {
      nextData.max_ids = {
        ...nextData.max_ids,
        employee: Math.max(
          nextData.max_ids.employee || 0,
          ...Array.from(employeeIdMap.values())
        ),
      };
    }

    if (assetIdMap.size > 0) {
      nextData.max_ids = {
        ...nextData.max_ids,
        assets: Math.max(
          nextData.max_ids.assets || 0,
          ...Array.from(assetIdMap.values())
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
      inventory_tree: [],
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
      const idMappings = extractServerIdMappings(
        result.server_response || result.simulated_backend || {},
        dirtyMap
      );

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
