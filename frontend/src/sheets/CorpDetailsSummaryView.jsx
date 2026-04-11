import { useMemo } from 'react';
import SummaryViewSheet from '../sheets/SummaryView/profitview';
import {
  buildChildrenMap,
  buildRowMap,
  getCurrencyValue,
  normalizeRows,
} from '../components/helpers/treeHelpers';
import { getLocalizedName, LANGUAGE_MODES } from '../components/helpers/nameLocalization';

const GLOBAL_IDS = {
  EXPENSE: 2,
  SALES: 5,
  CREDIT_SALES: 6,
  PURCHASES: 8,
};

function CorpDetailsSummaryView({
  corpData,
  globalTree = [],
  localTree = [],
  transactions = [],
  languageMode = LANGUAGE_MODES.ENG,
}) {
  const corpName = corpData?.name || 'Unknown corp';

  const summaryData = useMemo(() => {
    const liveGlobalTree = normalizeRows(globalTree);
    const liveLocalTree = normalizeRows(localTree);
    const liveTransactions = normalizeRows(transactions);

    const globalRowMap = buildRowMap(liveGlobalTree);
    const localRowMap = buildRowMap(liveLocalTree);
    const globalChildrenByParent = buildChildrenMap(liveGlobalTree, 'parent_id');
    const localChildrenByParent = buildChildrenMap(liveLocalTree, 'parent_id');

    const rootLocalByGlobal = new Map();

    for (const row of liveLocalTree) {
      if (row.parent_id != null || row.global_parent_id == null) continue;
      if (!rootLocalByGlobal.has(row.global_parent_id)) {
        rootLocalByGlobal.set(row.global_parent_id, []);
      }
      rootLocalByGlobal.get(row.global_parent_id).push(row.id);
    }

    const directAmountByKey = new Map();

    for (const tx of liveTransactions) {
      const amount = getCurrencyValue(tx?.total_mmk);
      if (!amount) continue;

      if (tx.local_tree_id != null) {
        const key = `l-${Number(tx.local_tree_id)}`;
        directAmountByKey.set(key, (directAmountByKey.get(key) || 0) + amount);
      } else if (tx.global_tree_id != null) {
        const key = `g-${Number(tx.global_tree_id)}`;
        directAmountByKey.set(key, (directAmountByKey.get(key) || 0) + amount);
      }
    }

    const formatAmount = (value) =>
      new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(value || 0);

    const getChildrenKeys = (key) => {
      if (key.startsWith('g-')) {
        const globalId = Number(key.slice(2));
        const globalChildKeys = (globalChildrenByParent.get(globalId) || []).map(
          (row) => `g-${row.id}`
        );
        const localRootKeys = (rootLocalByGlobal.get(globalId) || []).map(
          (id) => `l-${id}`
        );
        return [...globalChildKeys, ...localRootKeys];
      }

      const localId = Number(key.slice(2));
      return (localChildrenByParent.get(localId) || []).map((row) => `l-${row.id}`);
    };

    const getNodeLabel = (key) => {
      if (key.startsWith('g-')) {
        const row = globalRowMap.get(Number(key.slice(2)));
        return getLocalizedName(row, languageMode) || `ID ${key.slice(2)}`;
      }

      const row = localRowMap.get(Number(key.slice(2)));
      return getLocalizedName(row, languageMode) || `ID ${key.slice(2)}`;
    };

    const buildRowForKey = (key) => {
      const childRows = getChildrenKeys(key)
        .map((childKey) => buildRowForKey(childKey))
        .filter(Boolean)
        .filter((row) => row.amount !== 0 || (row.children?.length || 0) > 0);

      const amount = (directAmountByKey.get(key) || 0) + childRows.reduce((sum, row) => sum + row.amount, 0);

      return {
        key,
        label: getNodeLabel(key),
        value: formatAmount(amount),
        amount,
        defaultOpen: true,
        children: childRows,
      };
    };

    const buildTopLevelSummaryRow = (label, rootKeys) => {
      const children = rootKeys
        .filter(Boolean)
        .map((key) => buildRowForKey(key))
        .filter(Boolean)
        .filter((row) => row.amount !== 0 || (row.children?.length || 0) > 0);

      const amount = children.reduce((sum, row) => sum + row.amount, 0);

      return {
        label,
        value: formatAmount(amount),
        amount,
        bold: true,
        defaultOpen: true,
        children,
      };
    };

    const expenseRootIds = (globalChildrenByParent.get(GLOBAL_IDS.EXPENSE) || [])
      .map((row) => row.id)
      .filter((id) => id !== GLOBAL_IDS.PURCHASES);

    const totalSalesRow = buildTopLevelSummaryRow('Total Sales', [
      `g-${GLOBAL_IDS.SALES}`,
      `g-${GLOBAL_IDS.CREDIT_SALES}`,
    ]);
    const totalPurchasesRow = buildTopLevelSummaryRow('Total Purchases', [`g-${GLOBAL_IDS.PURCHASES}`]);
    const totalExpensesRow = buildTopLevelSummaryRow(
      'Total Expenses',
      expenseRootIds.map((id) => `g-${id}`)
    );
    const grandTotalAmount = totalSalesRow.amount + totalPurchasesRow.amount + totalExpensesRow.amount;
    const grandTotalRow = {
      label: 'Total',
      value: formatAmount(grandTotalAmount),
      amount: grandTotalAmount,
      bold: true,
      isTotal: true,
      defaultOpen: true,
      children: [],
    };

    return [totalSalesRow, totalPurchasesRow, totalExpensesRow, grandTotalRow];
  }, [globalTree, localTree, transactions, languageMode]);

  return <SummaryViewSheet title={`${corpName} Summary`} summaryData={summaryData} />;
}

export default CorpDetailsSummaryView;
