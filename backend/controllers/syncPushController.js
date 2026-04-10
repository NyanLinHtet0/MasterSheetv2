// backend/controllers/syncPushController.js
const { createIdMapper } = require('../utils/idMapper');
const db = require('../db');

const allowedColumns = {
  corp_data: new Set([
    'name',
    'is_foreign',
    'current_balance',
    'current_foreign',
    'last_verified_date',
    'last_verified_balance',
    'last_verified_total_foreign',
    'start_day',
    'inverse',
    'display_order',
    'corp_category_id',
    'soft_delete'
  ]),
  transactions: new Set([
    'corp_id',
    'tx_date',
    'description',
    'amount',
    'rate',
    'adjustment',
    'global_tree_id',
    'local_tree_id',
    'employee_id',
    'asset_id',
    'inven_id',
    'inven_flow',
    'inven_qty',
    'link_type',
    'link_tx_id',
    'payment_mode',
    'soft_delete',
    'tx_status'
  ]),
  employee: new Set([
    'corp_id',
    'name',
    'soft_delete'
  ]),
  assets: new Set([
    'name',
    'type',
    'soft_delete'
  ]),
  global_tree: new Set([
    'name',
    'burmese_name',
    'parent_id',
    'soft_delete'
  ]),
  local_tree: new Set([
    'corp_id',
    'global_parent_id',
    'parent_id',
    'name',
    'burmese_name',
    'leaf',
    'soft_delete'
  ]),
  link_table: new Set([
    'type_name',
    'burmese_name'
  ]),
  payment_table: new Set([
    'type_name',
    'burmese_name'
  ]),
  inventory_tree: new Set([
    'corp_id',
    'parent_id',
    'name',
    'burmese_name',
    'quantity',
    'leaf'
  ]),
  financial_summary: new Set([
    'corp_id',
    'total_sales',
    'total_operational_expenses',
    'remaining_credit',
    'total_investment',
    'start_date',
    'end_date'
  ])
};

function sanitizeFields(tableName, obj = {}) {
  const allowed = allowedColumns[tableName];
  const cleaned = {};

  if (!allowed) return cleaned;
  for (const [key, value] of Object.entries(obj)) {
    if (allowed.has(key) && value !== undefined) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

function normalizeTableName(tableName) {
  const normalized = String(tableName || '').trim();

  const aliases = {
    localTree: 'local_tree',
    inventoryTree: 'inventory_tree',
    globalTree: 'global_tree',
    corpData: 'corp_data',
    financialSummary: 'financial_summary',
    linkTable: 'link_table',
    paymentTable: 'payment_table',
  };

  return aliases[normalized] || normalized;
}

function resolveForeignKeys(tableName, rowData, mapper) {
  const next = { ...rowData };

  if (next.corp_id != null) next.corp_id = mapper.resolveId(next.corp_id);
  if (next.parent_id != null) next.parent_id = mapper.resolveId(next.parent_id);
  if (next.global_parent_id != null) next.global_parent_id = mapper.resolveId(next.global_parent_id);
  if (next.local_tree_id != null) next.local_tree_id = mapper.resolveId(next.local_tree_id);
  if (next.inven_id != null) next.inven_id = mapper.resolveId(next.inven_id);
  if (next.link_type != null) next.link_type = mapper.resolveId(next.link_type);
  if (next.link_tx_id != null) next.link_tx_id = mapper.resolveId(next.link_tx_id);
  if (next.payment_mode != null) next.payment_mode = mapper.resolveId(next.payment_mode);
  if (next.employee_id != null) next.employee_id = mapper.resolveId(next.employee_id);
  if (next.asset_id != null) next.asset_id = mapper.resolveId(next.asset_id);

  return next;
}

exports.pushChanges = async (req, res) => {
  const { client_audit_id, actions } = req.body;
  const connection = await db.getConnection();
  const insertedIdMappings = [];

  try {
    await connection.beginTransaction();

    // 1. Check Audit Alignment
    const [[{ server_audit_id }]] = await connection.query(
      'SELECT COALESCE(MAX(id), 0) AS server_audit_id FROM audit_log'
    );

    if (client_audit_id < server_audit_id) {
      await connection.rollback();
      return res.status(409).json({ out_of_date: true });
    }

    const mapper = createIdMapper();

    const allowedTables = new Set([
      'corp_data',
      'transactions',
      'employee',
      'assets',
      'global_tree',
      'local_tree',
      'link_table',
      'payment_table',
      'inventory_tree',
      'financial_summary'
    ]);

    for (const action of actions) {
      const normalizedTableName = normalizeTableName(action.table_name);

      if (!allowedTables.has(normalizedTableName)) {
        throw new Error(`Invalid table name: ${action.table_name}`);
      }

      const resolvedRowId = mapper.resolveId(action.row_id);
      let auditRowId = resolvedRowId;
      let oldData = null;
      let newData = null;

      if (action.action_type === 'INSERT') {
        let insertData = sanitizeFields(normalizedTableName, action.changes || {});
        insertData = resolveForeignKeys(normalizedTableName, insertData, mapper);

        const [result] = await connection.query(
          `INSERT INTO ${normalizedTableName} SET ?`,
          [insertData]
        );

        auditRowId = result.insertId;
        mapper.mapId(action.row_id, auditRowId);
        insertedIdMappings.push({
          table_name: normalizedTableName,
          temp_id: Number(action.row_id),
          real_id: Number(auditRowId),
        });
        newData = insertData;
      }

      else if (action.action_type === 'UPDATE') {
        const [existingRows] = await connection.query(
          `SELECT * FROM ${normalizedTableName} WHERE id = ? LIMIT 1`,
          [resolvedRowId]
        );

        oldData = existingRows[0] || null;

        let updateFields = sanitizeFields(
          normalizedTableName,
          action.changed_data?.new || {}
        );
        updateFields = resolveForeignKeys(normalizedTableName, updateFields, mapper);

        if (Object.keys(updateFields).length > 0) {
          await connection.query(
            `UPDATE ${normalizedTableName} SET ? WHERE id = ?`,
            [updateFields, resolvedRowId]
          );
          newData = updateFields;
        }
      }

      else if (action.action_type === 'DELETE') {
        const [existingRows] = await connection.query(
          `SELECT * FROM ${normalizedTableName} WHERE id = ? LIMIT 1`,
          [resolvedRowId]
        );

        oldData = existingRows[0] || null;

        await connection.query(
          `UPDATE ${normalizedTableName} SET soft_delete = 1 WHERE id = ?`,
          [resolvedRowId]
        );

        newData = { soft_delete: 1 };
      }

      await connection.query(
        `INSERT INTO audit_log
          (table_name, row_id, action_type, old_data, new_data)
        VALUES (?, ?, ?, ?, ?)`,
        [
          normalizedTableName,
          auditRowId,
          String(action.action_type).toUpperCase(),
          oldData ? JSON.stringify(oldData) : null,
          newData ? JSON.stringify(newData) : null
        ]
      );
    }

    await connection.commit();

    const [[{ current_audit_id }]] = await connection.query(
      'SELECT COALESCE(MAX(id), 0) AS current_audit_id FROM audit_log'
    );

    res.json({
      success: true,
      current_audit_id,
      simulated_backend: { id_maps: mapper.getMap() },
      id_mappings: insertedIdMappings,
    });

  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};
