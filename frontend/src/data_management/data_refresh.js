import {
  applyTransactionDeltaToCorp,
  hydrateStoredTransaction,
} from '../components/transaction_table/transactionTableHelpers';

export async function syncFromAuditLog(localData) {
  const currentLocalAuditId = localData.current_audit_id || 0;

  const auditResponse = await fetch(
    `http://localhost:3000/api/sync/audit/changes?after_id=${currentLocalAuditId}`
  );

  if (!auditResponse.ok) {
    throw new Error('Failed to fetch audit changes');
  }

  const { current_audit_id, audit_rows } = await auditResponse.json();

  if (!audit_rows || audit_rows.length === 0) {
    return localData;
  }

  let updatedData = structuredClone(localData);

  const transactionRowIds = [];
  const insertRowsByTable = {};

  for (const auditRow of audit_rows) {
    const actionType = String(auditRow.action_type).toUpperCase();

    if (auditRow.table_name === 'transactions' && (actionType === 'INSERT' || actionType === 'UPDATE')) {
      transactionRowIds.push(auditRow.row_id);
      continue;
    }

    if (actionType !== 'INSERT') continue;

    if (!insertRowsByTable[auditRow.table_name]) {
      insertRowsByTable[auditRow.table_name] = [];
    }

    insertRowsByTable[auditRow.table_name].push(auditRow.row_id);
  }

  if (transactionRowIds.length > 0) {
    const rows = await fetchRowsByIds('transactions', [...new Set(transactionRowIds)]);
    updatedData = mergeTransactionRows(updatedData, rows);
  }

  for (const [tableName, rowIds] of Object.entries(insertRowsByTable)) {
    const rows = await fetchRowsByIds(tableName, [...new Set(rowIds)]);
    updatedData = mergeInsertedRows(updatedData, tableName, rows);
  }

  updatedData.current_audit_id = current_audit_id;
  localStorage.setItem('app_sync_state', JSON.stringify(updatedData));

  return updatedData;
}

async function fetchRowsByIds(tableName, rowIds) {
  const rowResponse = await fetch('http://localhost:3000/api/sync/rows-by-ids', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      table_name: tableName,
      row_ids: rowIds,
    }),
  });

  if (!rowResponse.ok) {
    throw new Error(`Failed to fetch rows for ${tableName}`);
  }

  const { rows } = await rowResponse.json();
  return rows || [];
}

function mergeTransactionRows(appData, rows) {
  const nextData = structuredClone(appData);

  for (const row of rows) {
    const corp = nextData.corp_data.find((currentCorp) => currentCorp.id === row.corp_id);
    if (!corp) continue;

    const hydratedRow = hydrateStoredTransaction(row, {
      isForeign: Number(corp.is_foreign) === 1,
    });

    const existingIndex = (corp.transactions || []).findIndex((tx) => tx.id === hydratedRow.id);

    if (existingIndex === -1) {
      corp.transactions = [...(corp.transactions || []), hydratedRow];
      Object.assign(corp, applyTransactionDeltaToCorp(corp, null, hydratedRow));
      continue;
    }

    const oldTx = corp.transactions[existingIndex];
    const nextTransactions = [...corp.transactions];
    nextTransactions[existingIndex] = hydratedRow;

    Object.assign(
      corp,
      applyTransactionDeltaToCorp(
        {
          ...corp,
          transactions: nextTransactions,
        },
        oldTx,
        hydratedRow
      )
    );

    corp.transactions = nextTransactions;
  }

  if (rows.length > 0 && nextData.max_ids) {
    const maxInsertedId = Math.max(...rows.map((row) => row.id));
    nextData.max_ids.transactions = Math.max(
      nextData.max_ids.transactions || 0,
      maxInsertedId
    );
  }

  return nextData;
}

function mergeInsertedRows(appData, tableName, rows) {
  const nextData = structuredClone(appData);

  switch (tableName) {
    case 'corp_data': {
      for (const corp of rows) {
        const exists = nextData.corp_data.some((existing) => existing.id === corp.id);
        if (exists) continue;

        nextData.corp_data.push({
          ...corp,
          local_tree: [],
          inventory_tree: [],
          employees: [],
          transactions: [],
        });
      }

      if (rows.length > 0 && nextData.max_ids) {
        const maxInsertedId = Math.max(...rows.map((row) => row.id));
        nextData.max_ids.corp_data = Math.max(
          nextData.max_ids.corp_data || 0,
          maxInsertedId
        );
      }

      break;
    }

    case 'employee': {
      for (const emp of rows) {
        if (emp.corp_id == null) {
          const exists = (nextData.unassigned_employees || []).some((row) => row.id === emp.id);
          if (!exists) {
            nextData.unassigned_employees = [...(nextData.unassigned_employees || []), emp];
          }
          continue;
        }

        const corp = nextData.corp_data.find((row) => row.id === emp.corp_id);
        if (!corp) continue;

        const exists = (corp.employees || []).some((row) => row.id === emp.id);
        if (!exists) {
          corp.employees = [...(corp.employees || []), emp];
        }
      }

      if (rows.length > 0 && nextData.max_ids) {
        const maxInsertedId = Math.max(...rows.map((row) => row.id));
        nextData.max_ids.employees = Math.max(
          nextData.max_ids.employees || 0,
          maxInsertedId
        );
      }

      break;
    }

    case 'assets': {
      for (const asset of rows) {
        const exists = (nextData.assets || []).some((row) => row.id === asset.id);
        if (!exists) {
          nextData.assets = [...(nextData.assets || []), asset];
        }
      }

      if (rows.length > 0 && nextData.max_ids) {
        const maxInsertedId = Math.max(...rows.map((row) => row.id));
        nextData.max_ids.assets = Math.max(
          nextData.max_ids.assets || 0,
          maxInsertedId
        );
      }

      break;
    }

    case 'global_tree': {
      for (const node of rows) {
        const exists = (nextData.global_tree || []).some((row) => row.id === node.id);
        if (!exists) {
          nextData.global_tree = [...(nextData.global_tree || []), node];
        }
      }

      if (rows.length > 0 && nextData.max_ids) {
        const maxInsertedId = Math.max(...rows.map((row) => row.id));
        nextData.max_ids.global_tree = Math.max(
          nextData.max_ids.global_tree || 0,
          maxInsertedId
        );
      }

      break;
    }

    case 'local_tree': {
      for (const node of rows) {
        const corp = nextData.corp_data.find((row) => row.id === node.corp_id);
        if (!corp) continue;

        const exists = (corp.local_tree || []).some((row) => row.id === node.id);
        if (!exists) {
          corp.local_tree = [...(corp.local_tree || []), node];
        }
      }

      if (rows.length > 0 && nextData.max_ids) {
        const maxInsertedId = Math.max(...rows.map((row) => row.id));
        nextData.max_ids.local_tree = Math.max(
          nextData.max_ids.local_tree || 0,
          maxInsertedId
        );
      }

      break;
    }

    case 'inventory_tree': {
      for (const node of rows) {
        const corp = nextData.corp_data.find((row) => row.id === node.corp_id);
        if (!corp) continue;

        const exists = (corp.inventory_tree || []).some((row) => row.id === node.id);
        if (!exists) {
          corp.inventory_tree = [...(corp.inventory_tree || []), node];
        }
      }

      if (rows.length > 0 && nextData.max_ids) {
        const maxInsertedId = Math.max(...rows.map((row) => row.id));
        nextData.max_ids.inventory_tree = Math.max(
          nextData.max_ids.inventory_tree || 0,
          maxInsertedId
        );
      }

      break;
    }

    default:
      break;
  }

  return nextData;
}
