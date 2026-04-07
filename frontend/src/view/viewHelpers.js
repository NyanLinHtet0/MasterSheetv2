import currency from 'currency.js';

export function normalizeNumber(value) {
  return currency(value || 0).value;
}

export function normalizeBool(value) {
  return value === true || value === 1 || value === '1';
}

export function summarizeCorps(corps = []) {
  return corps.map((corp) => {
    const transactions = Array.isArray(corp.transactions) ? corp.transactions : [];
    const activeTransactions = transactions.filter((tx) => !normalizeBool(tx?.soft_delete));

    const totalIn = activeTransactions.reduce((sum, tx) => {
      const amount = Math.max(0, normalizeNumber(tx?.in_amount));
      return sum.add(amount);
    }, currency(0));

    const totalOut = activeTransactions.reduce((sum, tx) => {
      const amount = Math.max(0, normalizeNumber(tx?.out_amount));
      return sum.add(amount);
    }, currency(0));

    const realizedProfit = totalIn.subtract(totalOut).value;

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

  const combinedBalance = corpSummaries
    .reduce((sum, corp) => sum.add(normalizeNumber(corp.currentBalance)), currency(0))
    .value;

  const combinedProfit = corpSummaries
    .reduce((sum, corp) => sum.add(normalizeNumber(corp.realizedProfit)), currency(0))
    .value;

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
