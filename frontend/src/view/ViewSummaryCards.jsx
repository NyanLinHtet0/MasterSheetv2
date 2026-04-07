import currency from 'currency.js';
import styles from './view.module.css';

function formatAmount(value, precision = 0) {
  return currency(value || 0, { symbol: '', precision }).format();
}

function ViewSummaryCards({ metrics }) {
  return (
    <div className={styles.cardsGrid}>
      <article className={styles.card}>
        <p className={styles.cardLabel}>Total Corporations</p>
        <h3 className={styles.cardValue}>{metrics.corporationCount}</h3>
      </article>

      <article className={styles.card}>
        <p className={styles.cardLabel}>Combined Balance</p>
        <h3 className={styles.cardValue}>{formatAmount(metrics.combinedBalance)}</h3>
      </article>

      <article className={styles.card}>
        <p className={styles.cardLabel}>Realized Profit (Template)</p>
        <h3 className={styles.cardValue}>{formatAmount(metrics.combinedProfit)}</h3>
      </article>

      <article className={styles.card}>
        <p className={styles.cardLabel}>Active Transactions</p>
        <h3 className={styles.cardValue}>{metrics.totalTransactions}</h3>
      </article>
    </div>
  );
}

export default ViewSummaryCards;
