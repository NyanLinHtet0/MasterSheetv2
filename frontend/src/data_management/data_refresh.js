import currency from 'currency.js';

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

  const insertRowsByTable = {};

  for (const auditRow of audit_rows) {
    // Match this string to EXACTLY what your backend stores in audit_log
    if (String(auditRow.action_type).toUpperCase() !== 'INSERT') continue;

    if (!insertRowsByTable[auditRow.table_name]) {
      insertRowsByTable[auditRow.table_name] = [];
    }

    insertRowsByTable[auditRow.table_name].push(auditRow.row_id);
  }

  for (const [tableName, rowIds] of Object.entries(insertRowsByTable)) {
    const uniqueIds = [...new Set(rowIds)];

    const rowResponse = await fetch('http://localhost:3000/api/sync/rows-by-ids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        table_name: tableName,
        row_ids: uniqueIds
      })
    });

    if (!rowResponse.ok) {
      throw new Error(`Failed to fetch inserted rows for ${tableName}`);
    }

    const { rows } = await rowResponse.json();

    updatedData = mergeInsertedRows(updatedData, tableName, rows);
  }

  updatedData.current_audit_id = current_audit_id;
  localStorage.setItem('app_sync_state', JSON.stringify(updatedData));

  return updatedData;
}

function mergeInsertedRows(appData, tableName, rows) {
  const nextData = structuredClone(appData);

  switch (tableName) {
    case 'transactions': {
      for (const tx of rows) {
        const corp = nextData.corp_data.find(c => c.id === tx.corp_id);
        if (!corp) continue;

        const exists = corp.transactions.some(existing => existing.id === tx.id);
        if (exists) continue;

        const isForeign = Number(corp.is_foreign) === 1;
        const amount = currency(tx.amount || 0);
        const rate = currency(tx.rate || 0);
        const adjustment = currency(tx.adjustment || 0);

        const total_mmk = isForeign
        ? amount.multiply(rate.value).add(adjustment.value).value
        : amount.add(adjustment.value).value;

        corp.transactions.push({
          ...tx,
          total_mmk
        });
      }

      if (rows.length > 0) {
        const maxInsertedId = Math.max(...rows.map(r => r.id));
        nextData.max_ids.transactions = Math.max(
          nextData.max_ids.transactions,
          maxInsertedId
        );
      }

      break;
    }

    case 'corp_data': {
      for (const corp of rows) {
        const exists = nextData.corp_data.some(existing => existing.id === corp.id);
        if (exists) continue;

        nextData.corp_data.push({
          ...corp,
          local_tree: [],
          employees: [],
          transactions: []
        });
      }

      if (rows.length > 0) {
        const maxInsertedId = Math.max(...rows.map(r => r.id));
        nextData.max_ids.corp_data = Math.max(
          nextData.max_ids.corp_data,
          maxInsertedId
        );
      }

      break;
    }

    case 'employee': {
      for (const emp of rows) {
        if (emp.corp_id == null) {
          const exists = nextData.unassigned_employees.some(e => e.id === emp.id);
          if (!exists) nextData.unassigned_employees.push(emp);
        } else {
          const corp = nextData.corp_data.find(c => c.id === emp.corp_id);
          if (!corp) continue;

          const exists = corp.employees.some(e => e.id === emp.id);
          if (!exists) corp.employees.push(emp);
        }
      }

      if (rows.length > 0) {
        const maxInsertedId = Math.max(...rows.map(r => r.id));
        nextData.max_ids.employees = Math.max(
          nextData.max_ids.employees,
          maxInsertedId
        );
      }

      break;
    }

    case 'assets': {
      for (const asset of rows) {
        const exists = nextData.assets.some(existing => existing.id === asset.id);
        if (!exists) nextData.assets.push(asset);
      }

      if (rows.length > 0) {
        const maxInsertedId = Math.max(...rows.map(r => r.id));
        nextData.max_ids.assets = Math.max(
          nextData.max_ids.assets,
          maxInsertedId
        );
      }

      break;
    }

    case 'global_tree': {
      for (const node of rows) {
        const exists = nextData.global_tree.some(existing => existing.id === node.id);
        if (!exists) nextData.global_tree.push(node);
      }

      if (rows.length > 0) {
        const maxInsertedId = Math.max(...rows.map(r => r.id));
        nextData.max_ids.global_tree = Math.max(
          nextData.max_ids.global_tree,
          maxInsertedId
        );
      }

      break;
    }

    case 'local_tree': {
      for (const node of rows) {
        const corp = nextData.corp_data.find(c => c.id === node.corp_id);
        if (!corp) continue;

        const exists = corp.local_tree.some(existing => existing.id === node.id);
        if (!exists) corp.local_tree.push(node);
      }

      if (rows.length > 0) {
        const maxInsertedId = Math.max(...rows.map(r => r.id));
        nextData.max_ids.local_tree = Math.max(
          nextData.max_ids.local_tree,
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