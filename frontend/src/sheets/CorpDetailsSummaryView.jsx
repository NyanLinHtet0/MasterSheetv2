import styles from './CorpDetailsSummaryView.module.css';

function CorpDetailsSummaryView({
  corpData,
  globalTree = [],
  localTree = [],
  inventoryTree = [],
  transactions = [],
  linkTable = [],
  paymentTable = [],
}) {
  const corpName = corpData?.name || 'Unknown corp';

  return (
    <div className={styles.summaryContainer}>
      <h3>Summary</h3>
      <p>
        Summary content for <strong>{corpName}</strong> can be added here.
      </p>
      <p className={styles.placeholderNote}>
        Corp payload ready: {globalTree.length} global tree nodes, {localTree.length} local tree nodes,{' '}
        {inventoryTree.length} inventory nodes, {transactions.length} transactions, {linkTable.length} link
        types, {paymentTable.length} payment modes.
      </p>
    </div>
  );
}

export default CorpDetailsSummaryView;
