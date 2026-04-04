import currency from 'currency.js';
import styles from './corp_details.module.css';
import TransactionTable from '../components/transaction_table/TransactionTable';
import {
  normalizeBool,
  toDisplayTransaction,
} from '../components/transaction_table/transactionTableHelpers';

function CorpDetails({
  selectedCorp,
  onUpdateTransaction,
  onDeleteTransaction,
}) {
  if (!selectedCorp) {
    return (
      <div className={styles.corpDetails}>
        <h2>Corp Details</h2>
        <p>No corporation selected.</p>
      </div>
    );
  }

  const isInverse = normalizeBool(selectedCorp.inverse);
  const isForeign = normalizeBool(selectedCorp.is_foreign);

  const currentBalance = currency(selectedCorp.current_balance || 0, {
    symbol: '',
    precision: 0,
  })
    .multiply(isInverse ? -1 : 1)
    .format();

  const currentForeign = currency(selectedCorp.current_foreign || 0, {
    symbol: '',
    precision: 2,
  })
    .multiply(isInverse ? -1 : 1)
    .format();

  const foreignLabel =
    selectedCorp.name?.split('ဝယ်စာရင်း')[0]?.trim() || 'Foreign';

  const rate =
    isForeign && Number(selectedCorp.current_foreign)
      ? Math.abs(
          Number(selectedCorp.current_balance || 0) /
          Number(selectedCorp.current_foreign || 0)
        ).toLocaleString(undefined, { maximumFractionDigits: 2 })
      : '-';

  const visibleTransactions = (selectedCorp.transactions || [])
    .filter(tx => Number(tx.soft_delete) !== 1)
    .map((tx, index) => toDisplayTransaction(tx, index, { isInverse }));

  const incomeTx = visibleTransactions.filter(tx => Number(tx.amount) >= 0);
  const expenseTx = visibleTransactions.filter(tx => Number(tx.amount) < 0);

  return (
    <div className={styles.corpDetails}>
      <div className={styles.headerbar}>
        <h2>{selectedCorp.name}</h2>
      </div>

      <div className={styles.balanceRow}>
        <div className={styles.balanceInfo}>
        <span className={styles.balanceText}>
          Balance: {currentBalance} MMK
        </span>

        {isForeign && (
          <>
            <span className={styles.divider}>|</span>
            <span className={styles.balanceText}>
              {foreignLabel} Balance: {currentForeign}
            </span>
            <span className={styles.divider}>|</span>
            <span className={styles.rateText}>
              Rate: {rate}
            </span>
          </>
        )}
        </div>

        <button
          onClick={() => alert('Split view coming soon!')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontWeight: '600',
            color: 'var(--text-main)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          Split View
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginTop: '15px',
          flex: 1,
          minHeight: 0,
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <TransactionTable
            title="Transactions"
            data={visibleTransactions}
            type="all"
            currencyName={foreignLabel}
            isForeign={isForeign}
            isInverse={isInverse}
            onUpdate={onUpdateTransaction}
            onDelete={onDeleteTransaction}
          />
        </div>
      </div>
    </div>
  );
}

export default CorpDetails;