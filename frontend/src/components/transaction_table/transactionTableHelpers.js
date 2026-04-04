import currency from 'currency.js';

export function normalizeBool(value) {
  return value === true || value === 1 || value === '1';
}

export function flipByInverse(value, isInverse) {
  return normalizeBool(isInverse)
    ? currency(value || 0).multiply(-1).value
    : currency(value || 0).value;
}

export function formatTxDateForInput(txDate) {
  if (!txDate) return '';
  const clean = String(txDate).split('T')[0];
  const [year, month, day] = clean.split('-');
  if (!year || !month || !day) return '';
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export function formatTxDateForSave(inputDate) {
  if (!inputDate) return null;
  const [year, month, day] = inputDate.split('-');
  return `${year}-${Number(month)}-${Number(day)}`;
}

export function sanitizeTransactionForDirty(tx) {
  if (!tx) return null;

  return {
    id: tx.id,
    corp_id: tx.corp_id,
    tx_date: tx.tx_date,
    description: tx.description,
    amount: currency(tx.amount || 0).value,
    rate: currency(tx.rate || 0).value,
    adjustment: currency(tx.adjustment || 0).value,
    global_tree_id: tx.global_tree_id ?? null,
    local_tree_id: tx.local_tree_id ?? null,
    employee_id: tx.employee_id ?? null,
    asset_id: tx.asset_id ?? null,
    soft_delete: tx.soft_delete ?? 0,
    tx_status: tx.tx_status ?? 1,
  };
}

export function toDisplayTransaction(tx, originalIndex, { isInverse }) {
  return {
    ...tx,
    originalIndex,
    tx_date: tx.tx_date,
    amount: flipByInverse(tx.amount || 0, isInverse),
    total_mmk: flipByInverse(tx.total_mmk || 0, isInverse),
  };
}

export function buildEditFormData(tx, { isInverse, isForeign }) {
  return {
    date: formatTxDateForInput(tx.tx_date),
    description: tx.description || '',
    amount: flipByInverse(tx.amount || 0, isInverse),
    rate: isForeign ? currency(tx.rate || 0).value : '',
    total_mmk: isForeign
      ? flipByInverse(tx.total_mmk || 0, isInverse)
      : '',
  };
}

export function buildUpdatedTransaction(oldTx, editFormData, { isForeign, isInverse }) {
  const rawAmount = flipByInverse(editFormData.amount || 0, isInverse);
  const rawRate = isForeign ? currency(editFormData.rate || 0).value : 0;

  const expectedRawTotal = isForeign
    ? currency(rawAmount).multiply(rawRate).value
    : currency(rawAmount).value;

  const rawManualTotal = isForeign
    ? flipByInverse(editFormData.total_mmk || expectedRawTotal, isInverse)
    : expectedRawTotal;

  const rawAdjustment = isForeign
    ? currency(rawManualTotal).subtract(expectedRawTotal).value
    : currency(oldTx.adjustment || 0).value;

  const rawTotalMmk = isForeign
    ? currency(expectedRawTotal).add(rawAdjustment).value
    : currency(rawAmount).add(rawAdjustment).value;

  const draftTx = {
    ...oldTx,
    tx_date: formatTxDateForSave(editFormData.date),
    description: editFormData.description,
    amount: rawAmount,
    rate: rawRate,
    adjustment: rawAdjustment,
    total_mmk: rawTotalMmk,
  };

  const dirtyTx = sanitizeTransactionForDirty(draftTx);

  return {
    draftTx,
    dirtyTx,
  };
}

export function buildSoftDeletedTransaction(oldTx) {
  const draftTx = {
    ...oldTx,
    soft_delete: 1,
  };

  const dirtyTx = sanitizeTransactionForDirty(draftTx);

  return {
    draftTx,
    dirtyTx,
  };
}

export function applyTransactionDeltaToCorp(corp, oldTx, newTx) {
  const oldTotal = currency(oldTx?.total_mmk || 0).value;
  const newTotal = currency(newTx?.total_mmk || 0).value;

  const nextCorp = {
    ...corp,
    current_balance: currency(corp.current_balance || 0)
      .add(newTotal)
      .subtract(oldTotal)
      .value,
  };

  if (normalizeBool(corp.is_foreign)) {
    const oldForeign = currency(oldTx?.amount || 0).value;
    const newForeign = currency(newTx?.amount || 0).value;

    nextCorp.current_foreign = currency(corp.current_foreign || 0)
      .add(newForeign)
      .subtract(oldForeign)
      .value;
  }

  return nextCorp;
}

export function buildInsertedTransaction(
  formTx,
  {
    corpId,
    isForeign,
    isInverse,
    globalTreeId = 1, // change this if your fallback tree id is different
    localTreeId = null,
    employeeId = null,
    assetId = null,
  }
) {
  const rawAmount = flipByInverse(formTx.amount || 0, isInverse);
  const rawRate = isForeign ? currency(formTx.rate || 0).value : 0;

  const expectedRawTotal = isForeign
    ? currency(rawAmount).multiply(rawRate).value
    : currency(rawAmount).value;

  const rawManualTotal = flipByInverse(
    formTx.total_mmk || expectedRawTotal,
    isInverse
  );

  const rawAdjustment = isForeign
    ? currency(rawManualTotal).subtract(expectedRawTotal).value
    : 0;

  const rawTotalMmk = isForeign
    ? currency(expectedRawTotal).add(rawAdjustment).value
    : currency(rawAmount).value;

  const insertPayload = {
    corp_id: corpId,
    tx_date: formTx.tx_date,
    description: formTx.description,
    amount: rawAmount,
    rate: rawRate,
    adjustment: rawAdjustment,
    global_tree_id: globalTreeId,
    local_tree_id: localTreeId,
    employee_id: employeeId,
    asset_id: assetId,
    soft_delete: 0,
    tx_status: 1,
  };

  const draftTx = {
    id: formTx.id,
    ...insertPayload,
    total_mmk: rawTotalMmk,
  };

  const dirtyTx = sanitizeTransactionForDirty(draftTx);

  return {
    draftTx,
    dirtyTx,
    insertPayload,
  };
}
export function areTransactionsEqual(txA, txB) {
  const a = sanitizeTransactionForDirty(txA);
  const b = sanitizeTransactionForDirty(txB);

  const keys = new Set([
    ...Object.keys(a || {}),
    ...Object.keys(b || {}),
  ]);

  for (const key of keys) {
    if (a?.[key] !== b?.[key]) {
      return false;
    }
  }

  return true;
}