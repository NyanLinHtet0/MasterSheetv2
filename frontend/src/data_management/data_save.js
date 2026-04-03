import { useState, useCallback, useEffect } from 'react';

export function useSyncManager(initialData) {
    const [originalData, setOriginalData] = useState(initialData);
    const [draftData, setDraftData] = useState(initialData);
    const [dirtyMap, setDirtyMap] = useState({});

    // Sync up when the DB finishes downloading
    useEffect(() => {
        if (initialData) {
            setOriginalData(initialData);
            setDraftData(initialData);
            setDirtyMap({});
        }
    }, [initialData]);

    // Handle Adding a new Corp from AddCorpForm
    const handleInsertCorp = useCallback((newCorpData) => {
        const tempId = -Date.now(); // Create a temporary negative ID for the client
        const entityKey = `corp_data_${tempId}`;
        
        // Match the shape of your backend corp_data table
        const newRecord = { 
            id: tempId, 
            name: newCorpData.name,
            is_foreign: newCorpData.isForeign ? 1 : 0,
            current_balance: newCorpData.balance || 0,
            current_foreign: newCorpData.foreignBalance || null,
            inverse: newCorpData.isInverse ? 1 : 0,
            isTemp: true 
        };

        // 1. Update the UI draft so the user sees it immediately
        setDraftData(prev => ({
            ...prev,
            corp_data: [...(prev?.corp_data || []), newRecord]
        }));

        // 2. Add it to the dirty queue
        setDirtyMap(prev => ({
            ...prev,
            [entityKey]: {
                table_name: 'corp_data',
                row_id: tempId,
                action_type: 'INSERT',
                changes: newRecord
            }
        }));
    }, []);

    // Revert everything
    const handleCancel = useCallback(() => {
        setDraftData(originalData);
        setDirtyMap({});
    }, [originalData]);

    // Send to backend
    const handleSave = useCallback(() => {
        const payload = Object.values(dirtyMap);
        console.log("Payload queued for backend:", payload);
        alert("Check the console to see the 'dirty' payload!");

        // On success: setOriginalData(draftData); setDirtyMap({});
    }, [dirtyMap, draftData]);

    const isDirty = Object.keys(dirtyMap).length > 0;

    return { draftData, isDirty, handleInsertCorp, handleCancel, handleSave };
}