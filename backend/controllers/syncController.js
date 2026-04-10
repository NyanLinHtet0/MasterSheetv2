const {
  getCurrentAuditId,
  getCurrentTableMaxIds,
  getBaseData,
  getTransactionsForInitialization,
  groupByCorpId,
  splitEmployees,
  assembleCorps,
  getAuditChangesAfterId,
  getRowsByIds
} = require('../services/syncService');

exports.initializeSync = async (req, res) => {
  try {
    const current_audit_id = await getCurrentAuditId();
    const max_ids = await getCurrentTableMaxIds();

    const {
      globalTree,
      assets,
      employees,
      corps,
      localTree,
      inventoryTree,
      financialSummary,
      linkTable,
      paymentTable
    } = await getBaseData();

    const allTransactions = await getTransactionsForInitialization(corps);

    const localTreeByCorp = groupByCorpId(localTree);
    const inventoryTreeByCorp = groupByCorpId(inventoryTree);
    const financialSummaryByCorp = groupByCorpId(financialSummary);
    const transactionsByCorp = groupByCorpId(allTransactions);
    const { employeesByCorp, unassignedEmployees } = splitEmployees(employees);

    const assembledCorps = assembleCorps({
      corps,
      localTreeByCorp,
      employeesByCorp,
      transactionsByCorp,
      inventoryTreeByCorp,
      financialSummaryByCorp
    });

    res.json({
      current_audit_id,
      max_ids,
      global_tree: globalTree,
      assets,
      link_table: linkTable,
      payment_table: paymentTable,
      unassigned_employees: unassignedEmployees,
      corp_data: assembledCorps
    });
  } catch (error) {
    console.error('Initialization Error:', error);
    res.status(500).json({ error: 'Failed to initialize database state' });
  }
};

exports.getAuditChanges = async (req, res) => {
  try {
    const afterId = Number(req.query.after_id) || 0;

    const result = await getAuditChangesAfterId(afterId);

    res.json(result);
  } catch (error) {
    console.error('Audit Changes Error:', error);
    res.status(500).json({ error: 'Failed to fetch audit changes' });
  }
};

exports.getRowsByIds = async (req, res) => {
  try {
    const { table_name, row_ids } = req.body;

    const rows = await getRowsByIds(table_name, row_ids);

    res.json({ rows });
  } catch (error) {
    console.error('Rows By Ids Error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch rows' });
  }
};
