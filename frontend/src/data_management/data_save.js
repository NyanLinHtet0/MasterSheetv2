import { useState, useEffect } from 'react';
import { queueUpdate, queueInsert, removeDirtyEntry } from './syncOperations';
import { pushSyncPayload } from './syncNetwork';

export function useSyncManager(initialData, refreshDataFn = async () => {}) {
  const [originalData, setOriginalData] = useState(initialData || null);
  const [draftData, setDraftData] = useState(initialData || null);
  const [dirtyMap, setDirtyMap] = useState({});

  useEffect(() => {
    if (initialData) {
      setOriginalData(initialData);
      setDraftData(initialData);
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

    setDraftData(prev => ({
      ...prev,
      corp_data: [...(prev?.corp_data || []), newCorpRow]
    }));

    setDirtyMap(prev => ({
      ...prev,
      [`corp_data_${tempId}_INSERT`]: {
        table_name: 'corp_data',
        row_id: tempId,
        action_type: 'INSERT',
        changes: insertPayload
      }
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
      const nextData = {
        ...draftData,
        current_audit_id: result.current_audit_id ?? draftData.current_audit_id
      };

      setOriginalData(nextData);
      setDraftData(nextData);
      setDirtyMap({});
      localStorage.setItem('app_sync_state', JSON.stringify(nextData));
    } else if (result.retryNeeded) {
      alert("The database was updated by someone else. Please review and save again.");
    } else {
      alert(result.error || "Save failed.");
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
    handleCancel
  };
}