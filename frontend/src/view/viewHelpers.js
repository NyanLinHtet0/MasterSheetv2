export function normalizeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

export function normalizeBool(value) {
  return value === true || value === 1 || value === '1';
}

export function summarizeCorps(corps = []) {
  return corps.map((corp) => {
    const transactions = Array.isArray(corp.transactions) ? corp.transactions : [];
    const activeTransactions = transactions.filter((tx) => !normalizeBool(tx?.soft_delete));

    const totalIn = activeTransactions.reduce(
      (sum, tx) => sum + Math.max(0, normalizeNumber(tx?.in_amount)),
      0
    );

    const totalOut = activeTransactions.reduce(
      (sum, tx) => sum + Math.max(0, normalizeNumber(tx?.out_amount)),
      0
    );

    const realizedProfit = totalIn - totalOut;

    return {
      id: corp.id,
      name: corp.name || `Corporation ${corp.id}`,
      currentBalance: normalizeNumber(corp.current_balance),
      currentForeign: normalizeNumber(corp.current_foreign),
      isForeign: normalizeBool(corp.is_foreign),
      transactionCount: activeTransactions.length,
      realizedProfit,
    };
  });
}

export function buildViewMetrics(corpSummaries = []) {
  const corporationCount = corpSummaries.length;

  const combinedBalance = corpSummaries.reduce(
    (sum, corp) => sum + normalizeNumber(corp.currentBalance),
    0
  );

  const combinedProfit = corpSummaries.reduce(
    (sum, corp) => sum + normalizeNumber(corp.realizedProfit),
    0
  );

  const totalTransactions = corpSummaries.reduce(
    (sum, corp) => sum + normalizeNumber(corp.transactionCount),
    0
  );

  return {
    corporationCount,
    combinedBalance,
    combinedProfit,
    totalTransactions,
  };
}

export function filterCorpSummaries(corpSummaries = [], query = '') {
  const normalized = String(query || '').trim().toLowerCase();
  if (!normalized) return corpSummaries;

  return corpSummaries.filter((corp) =>
    String(corp.name || '').toLowerCase().includes(normalized)
  );
}
