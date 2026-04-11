import currency from 'currency.js';

export function normalizeBool(value) {
  return value === true || value === 1 || value === '1';
}

export function toMoney(value) {
  return currency(value || 0).value;
}

export function cleanNumericInput(value = '') {
  return String(value).replace(/,/g, '').trim();
}

export function isValidPartialNumber(value) {
  return /^-?\d*\.?\d*$/.test(cleanNumericInput(value));
}

export function isUsableNumberInput(value) {
  const cleaned = cleanNumericInput(value);
  return cleaned !== '' && cleaned !== '-' && cleaned !== '.' && cleaned !== '-.';
}

export function parseEditableNumber(value, fallback = 0) {
  if (!isUsableNumberInput(value)) {
    return toMoney(fallback);
  }

  return toMoney(cleanNumericInput(value));
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

  const [year, month, day] = String(inputDate).split('-');

  if (!year || !month || !day) return null;

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function getDisplayedBaseTotal({ amount, rate, isForeign }) {
  if (!isForeign) {
    return parseEditableNumber(amount, 0);
  }

  if (!isUsableNumberInput(amount) || !isUsableNumberInput(rate)) {
    return null;
  }

  return currency(parseEditableNumber(amount, 0))
    .multiply(parseEditableNumber(rate, 0))
    .value;
}

export function calculateTransactionValues(
  { amount = 0, rate = 0, manualTotal, adjustment },
  { isForeign }
) {
  const normalizedAmount = toMoney(amount);
  const normalizedRate = isForeign ? toMoney(rate) : 0;

  const baseTotalMmk = isForeign
    ? currency(normalizedAmount).multiply(normalizedRate).value
    : normalizedAmount;

  let normalizedAdjustment = 0;
  let normalizedTotalMmk = baseTotalMmk;

  const hasManualTotal = manualTotal !== undefined && manualTotal !== null && manualTotal !== '';
  const hasAdjustment = adjustment !== undefined && adjustment !== null && adjustment !== '';

  if (hasManualTotal) {
    normalizedTotalMmk = toMoney(manualTotal);
    normalizedAdjustment = currency(normalizedTotalMmk)
      .subtract(baseTotalMmk)
      .value;
  } else if (hasAdjustment) {
    normalizedAdjustment = toMoney(adjustment);
    normalizedTotalMmk = currency(baseTotalMmk)
      .add(normalizedAdjustment)
      .value;
  }

  return {
    amount: normalizedAmount,
    rate: normalizedRate,
    base_total_mmk: baseTotalMmk,
    adjustment: normalizedAdjustment,
    total_mmk: normalizedTotalMmk,
  };
}

export function sanitizeTransactionForDirty(tx) {
  if (!tx) return null;

  return {
    id: tx.id,
    corp_id: tx.corp_id,
    tx_date: tx.tx_date,
    description: tx.description,
    amount: toMoney(tx.amount),
    rate: toMoney(tx.rate),
    adjustment: toMoney(tx.adjustment),
    global_tree_id: tx.global_tree_id ?? null,
    local_tree_id: tx.local_tree_id ?? null,
    inven_id: tx.inven_id ?? null,
    inven_flow: tx.inven_flow ?? null,
    inven_qty: tx.inven_qty ?? null,
    employee_id: tx.employee_id ?? null,
    asset_id: tx.asset_id ?? null,
    soft_delete: tx.soft_delete ?? 0,
    tx_status: tx.tx_status ?? 1,
  };
}

export function hydrateStoredTransaction(tx, { isForeign }) {
  if (!tx) return null;

  const { amount, rate, adjustment, total_mmk } = calculateTransactionValues(
    {
      amount: tx.amount,
      rate: tx.rate,
      adjustment: tx.adjustment,
      manualTotal:
        tx.total_mmk != null && tx.adjustment == null
          ? tx.total_mmk
          : undefined,
    },
    { isForeign }
  );

  return {
    ...tx,
    amount,
    rate,
    adjustment,
    total_mmk,
  };
}

export function toDisplayTransaction(tx, { isInverse, isForeign }) {
  const hydratedTx = hydrateStoredTransaction(tx, { isForeign });

  return {
    ...hydratedTx,
    tx_date: hydratedTx.tx_date,
    amount: flipByInverse(hydratedTx.amount || 0, isInverse),
    adjustment: flipByInverse(hydratedTx.adjustment || 0, isInverse),
    total_mmk: flipByInverse(hydratedTx.total_mmk || 0, isInverse),
  };
}

export function buildEditFormData(tx, { isForeign, resolveTypeId }) {
  const hydratedTx = hydrateStoredTransaction(tx, { isForeign });

  const isTypeOnlySelection =
    hydratedTx.local_tree_id == null &&
    (
      !tx?.global_tag_name ||
      !tx?.global_tag_root_name ||
      String(tx.global_tag_name) === String(tx.global_tag_root_name)
    );

  const typeId = tx?.global_tag_root_id != null
    ? tx.global_tag_root_id
    : isTypeOnlySelection
      ? hydratedTx.global_tree_id
      : (resolveTypeId?.(hydratedTx.global_tree_id) ?? null);

  return {
    date: formatTxDateForInput(hydratedTx.tx_date),
    description: hydratedTx.description || '',
    amount: String(toMoney(hydratedTx.amount)),
    rate: isForeign ? String(toMoney(hydratedTx.rate)) : '',
    total_mmk: isForeign ? String(toMoney(hydratedTx.total_mmk)) : '',
    type_id: typeId != null ? String(typeId) : '',
    global_tree_id:
      hydratedTx.global_tree_id != null ? String(hydratedTx.global_tree_id) : '',
    local_tree_id:
      hydratedTx.local_tree_id != null ? String(hydratedTx.local_tree_id) : '',
    inven_id: hydratedTx.inven_id != null ? String(hydratedTx.inven_id) : '',
    inven_flow: hydratedTx.inven_flow != null ? String(hydratedTx.inven_flow) : '',
    inven_qty: hydratedTx.inven_qty != null ? String(hydratedTx.inven_qty) : '',
  };
}

export function buildUpdatedTransaction(oldTx, editFormData, { isForeign, isInverse }) {
  const rawAmount = flipByInverse(parseEditableNumber(editFormData.amount, 0), isInverse);
  const rawRate = isForeign ? parseEditableNumber(editFormData.rate, 0) : toMoney(oldTx.rate);

  const rawManualTotal = isForeign && isUsableNumberInput(editFormData.total_mmk)
    ? flipByInverse(parseEditableNumber(editFormData.total_mmk, 0), isInverse)
    : undefined;

  const didAmountChange = !isForeign && toMoney(rawAmount) !== toMoney(oldTx.amount);

  const calculated = calculateTransactionValues(
    {
      amount: rawAmount,
      rate: rawRate,
      manualTotal: rawManualTotal,
      adjustment: isForeign
        ? undefined
        : didAmountChange
          ? 0
          : oldTx.adjustment,
    },
    { isForeign }
  );

  const draftTx = {
    ...oldTx,
    tx_date: formatTxDateForSave(editFormData.date),
    description: editFormData.description,
    amount: calculated.amount,
    rate: calculated.rate,
    adjustment: calculated.adjustment,
    total_mmk: calculated.total_mmk,
    global_tree_id:
      editFormData.global_tree_id === '' ? null : Number(editFormData.global_tree_id),
    local_tree_id:
      editFormData.local_tree_id === '' ? null : Number(editFormData.local_tree_id),
    inven_id:
      editFormData.inven_id === '' ? null : Number(editFormData.inven_id),
    inven_flow:
      editFormData.inven_flow === '' ? null : Number(editFormData.inven_flow),
    inven_qty:
      editFormData.inven_qty === '' || !isUsableNumberInput(editFormData.inven_qty)
        ? null
        : toMoney(editFormData.inven_qty),
  };

  return {
    draftTx,
    dirtyTx: sanitizeTransactionForDirty(draftTx),
  };
}

export function buildSoftDeletedTransaction(oldTx) {
  const draftTx = {
    ...oldTx,
    soft_delete: 1,
  };

  return {
    draftTx,
    dirtyTx: sanitizeTransactionForDirty(draftTx),
  };
}

function getTransactionContribution(tx, corp) {
  if (!tx || Number(tx.soft_delete) === 1) {
    return {
      totalMmk: 0,
      foreignAmount: 0,
    };
  }

  const hydratedTx = hydrateStoredTransaction(tx, {
    isForeign: normalizeBool(corp?.is_foreign),
  });

  return {
    totalMmk: toMoney(hydratedTx?.total_mmk),
    foreignAmount: toMoney(hydratedTx?.amount),
  };
}

export function applyTransactionDeltaToCorp(corp, oldTx, newTx) {
  const oldContribution = getTransactionContribution(oldTx, corp);
  const newContribution = getTransactionContribution(newTx, corp);

  const nextCorp = {
    ...corp,
    current_balance: currency(corp.current_balance || 0)
      .add(newContribution.totalMmk)
      .subtract(oldContribution.totalMmk)
      .value,
  };

  if (normalizeBool(corp.is_foreign)) {
    nextCorp.current_foreign = currency(corp.current_foreign || 0)
      .add(newContribution.foreignAmount)
      .subtract(oldContribution.foreignAmount)
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
    globalTreeId = 1,
    localTreeId = null,
    invenId = null,
    invenFlow = null,
    invenQty = null,
    employeeId = null,
    assetId = null,
  }
) {
  const rawAmount = flipByInverse(toMoney(formTx.amount), isInverse);
  const rawRate = isForeign ? toMoney(formTx.rate) : 0;

  const rawManualTotal = isForeign && formTx.total_mmk != null && formTx.total_mmk !== ''
    ? flipByInverse(toMoney(formTx.total_mmk), isInverse)
    : undefined;

  const calculated = calculateTransactionValues(
    {
      amount: rawAmount,
      rate: rawRate,
      manualTotal: rawManualTotal,
    },
    { isForeign }
  );

  const insertPayload = {
    corp_id: corpId,
    tx_date: formTx.tx_date,
    description: formTx.description,
    amount: calculated.amount,
    rate: calculated.rate,
    adjustment: calculated.adjustment,
    global_tree_id: globalTreeId,
    local_tree_id: localTreeId,
    inven_id: invenId,
    inven_flow: invenFlow,
    inven_qty: invenQty,
    employee_id: employeeId,
    asset_id: assetId,
    soft_delete: 0,
    tx_status: 1,
  };

  const draftTx = {
    id: formTx.id,
    ...insertPayload,
    total_mmk: calculated.total_mmk,
  };

  return {
    draftTx,
    dirtyTx: sanitizeTransactionForDirty(draftTx),
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

export function hydrateAppDataTransactions(appData) {
  if (!appData?.corp_data) {
    return appData;
  }

  return {
    ...appData,
    corp_data: appData.corp_data.map((corp) => ({
      ...corp,
      transactions: (corp.transactions || []).map((tx) =>
        hydrateStoredTransaction(tx, {
          isForeign: normalizeBool(corp.is_foreign),
        })
      ),
    })),
  };
}
