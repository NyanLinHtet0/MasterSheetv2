import { useState, useEffect } from 'react';
import { syncFromAuditLog } from './data_refresh';
import { hydrateAppDataTransactions } from '../components/transaction_table/transactionTableHelpers';
import { fetchJson } from './apiClient';

export function useSyncState() {
  const [appData, setAppData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        const storedData = localStorage.getItem('app_sync_state');

        if (storedData) {
          const parsedData = hydrateAppDataTransactions(JSON.parse(storedData));
          const syncedData = await syncFromAuditLog(parsedData);
          setAppData(hydrateAppDataTransactions(syncedData));
        } else {
          await initializeData();
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const initializeData = async () => {
    try {
      setIsLoading(true);

      const initialPayload = hydrateAppDataTransactions(
        await fetchJson('/api/sync/initialize', {}, 'Initial sync fetch')
      );

      localStorage.setItem('app_sync_state', JSON.stringify(initialPayload));
      setAppData(initialPayload);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return { appData, isLoading, error, setAppData };
}
