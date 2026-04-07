import currency from 'currency.js';
import styles from './view.module.css';

function formatAmount(value, precision = 0) {
  return currency(value || 0, { symbol: '', precision }).format();
}

function ViewTable({ rows = [] }) {
  if (!rows.length) {
    return <p className={styles.emptyState}>No corporations found for this filter.</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Corporation</th>
            <th>Current Balance</th>
            <th>Realized Profit</th>
            <th>Transactions</th>
            <th>Foreign Balance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{formatAmount(row.currentBalance)}</td>
              <td>{formatAmount(row.realizedProfit)}</td>
              <td>{row.transactionCount}</td>
              <td>{row.isForeign ? formatAmount(row.currentForeign, 2) : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTable;
