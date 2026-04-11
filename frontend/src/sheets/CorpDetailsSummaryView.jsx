import { useMemo } from 'react';
import currency from 'currency.js';
import SummaryViewSheet from './SummaryView/profitview';
import styles from './CorpDetailsSummaryView.module.css'

import {
  buildChildrenMap,
  buildRowMap,
  getCurrencyValue,
  normalizeRows,
} from '../components/helpers/treeHelpers';
import {
  getLocalizedName,
  getLocalizedUiText,
  LANGUAGE_MODES,
} from '../components/helpers/nameLocalization';

const GLOBAL_IDS = {
  EXPENSE: 2,
  SALES: 5,
  CREDIT_SALES: 6,
  PURCHASES: 8,
};

const money = (value = 0) =>
  currency(value || 0, {
    symbol: '',
    separator: ',',
    decimal: '.',
    precision: 2,
    pattern: '#',
    negativePattern: '-#',
  });

const formatAmount = (value) =>
  money(value?.value ?? value ?? 0)
    .format()
    .replace(/\.00$/, '');

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
      const amount = money(getCurrencyValue(tx?.total_mmk));
      if (amount.value === 0) continue;

      if (tx.local_tree_id != null) {
        const key = `l-${Number(tx.local_tree_id)}`;
        const prev = directAmountByKey.get(key) || money(0);
        directAmountByKey.set(key, prev.add(amount.value));
      } else if (tx.global_tree_id != null) {
        const key = `g-${Number(tx.global_tree_id)}`;
        const prev = directAmountByKey.get(key) || money(0);
        directAmountByKey.set(key, prev.add(amount.value));
      }
    }

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
        .filter((row) => row.amount.value !== 0 || (row.children?.length || 0) > 0);

      const childAmount = childRows.reduce(
        (sum, row) => sum.add(row.amount.value),
        money(0)
      );

      const amount = (directAmountByKey.get(key) || money(0)).add(childAmount.value);

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
        .filter((row) => row.amount.value !== 0 || (row.children?.length || 0) > 0);

      const amount = children.reduce((sum, row) => sum.add(row.amount.value), money(0));

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

    const totalSalesRow = buildTopLevelSummaryRow(getLocalizedUiText('total_sales', languageMode), [
      `g-${GLOBAL_IDS.SALES}`,
      `g-${GLOBAL_IDS.CREDIT_SALES}`,
    ]);

    const totalPurchasesRow = buildTopLevelSummaryRow(getLocalizedUiText('total_purchases', languageMode), [
      `g-${GLOBAL_IDS.PURCHASES}`,
    ]);

    const totalExpensesRow = buildTopLevelSummaryRow(
      getLocalizedUiText('total_expenses', languageMode),
      expenseRootIds.map((id) => `g-${id}`)
    );

    const grandTotalAmount = money(0)
      .add(totalSalesRow.amount.value)
      .add(totalPurchasesRow.amount.value)
      .add(totalExpensesRow.amount.value);

    const grandTotalRow = {
      label: getLocalizedUiText('total', languageMode),
      value: formatAmount(grandTotalAmount),
      amount: grandTotalAmount,
      bold: true,
      isTotal: true,
      defaultOpen: true,
      children: [],
    };

    return [totalSalesRow, totalPurchasesRow, totalExpensesRow, grandTotalRow];
  }, [globalTree, localTree, transactions, languageMode]);

  return(
    <div className={styles.container}>
      <div>
        <SummaryViewSheet
          title={`${corpName} ${getLocalizedUiText('accounting_summary', languageMode)}`}
          summaryData={summaryData}
        />
      </div>
    </div>

  );
}

export default CorpDetailsSummaryView;
