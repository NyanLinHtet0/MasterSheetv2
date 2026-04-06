import styles from './transactiontable.module.css';
export default function TransactionTableHeader({ isForeign, currencyName, isTableEditMode }) {
  return (
    <thead>
      <tr>
        <th>Date</th>
        <th>Description</th>
        {isForeign ? (
          <>
            <th style={{ textAlign: 'right' }}>{currencyName}</th>
            <th style={{ textAlign: 'right' }}>Rate</th>
            <th style={{ textAlign: 'right' }}>Total MMK</th>
          </>
        ) : (
          <th style={{ textAlign: 'right' }}>Amount</th>
        )}
        <th className={styles.actionCell}>
          {isTableEditMode ? 'Actions' : '\u00A0'}
        </th>
      </tr>
    </thead>
  );
}
