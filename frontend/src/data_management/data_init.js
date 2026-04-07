import { useState, useEffect } from 'react';
import { syncFromAuditLog } from './data_refresh';
import { hydrateAppDataTransactions } from '../components/transaction_table/transactionTableHelpers';

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

      const response = await fetch('http://localhost:3000/api/sync/initialize');

      if (!response.ok) {
        throw new Error('Failed to fetch initial database state');
      }

      const initialPayload = hydrateAppDataTransactions(await response.json());

      localStorage.setItem('app_sync_state', JSON.stringify(initialPayload));
      setAppData(initialPayload);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return { appData, isLoading, error, setAppData };
}
