const db = require('../db');
const currency = require('currency.js'); // <-- Changed this line

async function getCurrentAuditId() {
  const [[{ current_audit_id }]] = await db.query(
    'SELECT COALESCE(MAX(id), 0) AS current_audit_id FROM audit_log'
  );
  return current_audit_id;
}

async function getBaseData() {
  const [globalTree] = await db.query('SELECT * FROM global_tree');
  const [assets] = await db.query('SELECT * FROM assets');
  const [employees] = await db.query('SELECT * FROM employee');
  const [corps] = await db.query('SELECT * FROM corp_data');
  const [localTree] = await db.query('SELECT * FROM local_tree');

  return {
    globalTree,
    assets,
    employees,
    corps,
    localTree
  };
}

function getTransactionFetchInfo(corps) {
  const verifiedDates = corps
    .map(corp => corp.last_verified_date)
    .filter(date => date != null);

  const hasAnyNullVerifiedDate = corps.some(
    corp => corp.last_verified_date == null
  );

  if (hasAnyNullVerifiedDate) {
    return {
      fetchAll: true,
      minVerifiedDate: null
    };
  }

  if (verifiedDates.length === 0) {
    return {
      fetchAll: true,
      minVerifiedDate: null
    };
  }

  const minVerifiedDate = verifiedDates.reduce((min, date) =>
    date < min ? date : min
  );

  return {
    fetchAll: false,
    minVerifiedDate
  };
}

async function getTransactionsForInitialization(corps) {
  const { fetchAll, minVerifiedDate } = getTransactionFetchInfo(corps);

  let transactions = [];

  if (fetchAll) {
    [transactions] = await db.query('SELECT * FROM transactions');
  } else {
    [transactions] = await db.query(
      'SELECT * FROM transactions WHERE tx_date > ?',
      [minVerifiedDate]
    );
  }

  return transactions;
}

function groupByCorpId(rows) {
  const grouped = {};

  for (const row of rows) {
    if (row.corp_id == null) continue;

    if (!grouped[row.corp_id]) {
      grouped[row.corp_id] = [];
    }

    grouped[row.corp_id].push(row);
  }

  return grouped;
}

function splitEmployees(employees) {
  const employeesByCorp = {};
  const unassignedEmployees = [];

  for (const emp of employees) {
    if (emp.corp_id == null) {
      unassignedEmployees.push(emp);
    } else {
      if (!employeesByCorp[emp.corp_id]) {
        employeesByCorp[emp.corp_id] = [];
      }
      employeesByCorp[emp.corp_id].push(emp);
    }
  }

  return {
    employeesByCorp,
    unassignedEmployees
  };
}

function filterTransactionsForCorp(transactions, corp) {
  if (!corp.last_verified_date) return transactions;
  return transactions.filter(tx => tx.tx_date > corp.last_verified_date);
}

function addComputedTransactionFields(transactions, corp) {
  const isForeign = Number(corp.is_foreign) === 1;

  return transactions.map(tx => {
    const amount = currency(tx.amount || 0);
    const rate = currency(tx.rate || 0);
    const adjustment = currency(tx.adjustment || 0);

    const total_mmk = isForeign
      ? amount.multiply(rate.value).add(adjustment.value).value
      : amount.add(adjustment.value).value;

    return {
      ...tx,
      total_mmk
    };
  });
}

function assembleCorps({
  corps,
  localTreeByCorp,
  employeesByCorp,
  transactionsByCorp
}) {
  return corps.map(corp => {
    const corpTransactions = transactionsByCorp[corp.id] || [];
    const filteredTransactions = filterTransactionsForCorp(corpTransactions, corp);
    const formattedTransactions = addComputedTransactionFields(
      filteredTransactions,
      corp
    );

    return {
      ...corp,
      local_tree: localTreeByCorp[corp.id] || [],
      employees: employeesByCorp[corp.id] || [],
      transactions: formattedTransactions
    };
  });
}

async function getCurrentTableMaxIds() {
  const [[{ corp_data }]] = await db.query(
    'SELECT COALESCE(MAX(id), 0) AS corp_data FROM corp_data'
  );

  const [[{ transactions }]] = await db.query(
    'SELECT COALESCE(MAX(id), 0) AS transactions FROM transactions'
  );

  const [[{ employees }]] = await db.query(
    'SELECT COALESCE(MAX(id), 0) AS employees FROM employee'
  );

  const [[{ assets }]] = await db.query(
    'SELECT COALESCE(MAX(id), 0) AS assets FROM assets'
  );

  const [[{ global_tree }]] = await db.query(
    'SELECT COALESCE(MAX(id), 0) AS global_tree FROM global_tree'
  );

  const [[{ local_tree }]] = await db.query(
    'SELECT COALESCE(MAX(id), 0) AS local_tree FROM local_tree'
  );

  return {
    corp_data,
    transactions,
    employees,
    assets,
    global_tree,
    local_tree
  };
}
async function getAuditChangesAfterId(afterId) {
  const [[{ current_audit_id }]] = await db.query(
    'SELECT COALESCE(MAX(id), 0) AS current_audit_id FROM audit_log'
  );

  if (afterId >= current_audit_id) {
    return {
      current_audit_id,
      audit_rows: []
    };
  }

  const [audit_rows] = await db.query(
    `SELECT * FROM audit_log
     WHERE id > ?
     ORDER BY id ASC`,
    [afterId]
  );

  return {
    current_audit_id,
    audit_rows
  };
}

async function getRowsByIds(tableName, rowIds) {
  const allowedTables = new Set([
    'transactions',
    'corp_data',
    'employee',
    'assets',
    'global_tree',
    'local_tree'
  ]);

  if (!allowedTables.has(tableName)) {
    throw new Error('Invalid table name');
  }

  if (!Array.isArray(rowIds) || rowIds.length === 0) {
    return [];
  }

  const placeholders = rowIds.map(() => '?').join(',');

  const [rows] = await db.query(
    `SELECT * FROM ${tableName} WHERE id IN (${placeholders})`,
    rowIds
  );

  return rows;
}

module.exports = {
  getCurrentAuditId,
  getCurrentTableMaxIds,
  getBaseData,
  getTransactionsForInitialization,
  groupByCorpId,
  splitEmployees,
  assembleCorps,
  getAuditChangesAfterId,
  getRowsByIds
};