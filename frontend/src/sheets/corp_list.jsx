import currency from 'currency.js';
import styles from './corp_list.module.css';
import AddCorpForm from './add_corp_form';
import CorpDropdown from '../components/CorpDropdown';
import TransactionForm from '../components/TransactionForm';

function CorpList({
  showAddCorpForm,
  setShowAddCorpForm,
  corps = [],
  onAddCorp,
  selectedCorp,
  onSelectCorp,
  onAddTransaction,
}) {
  const grandTotal = corps.reduce((sum, corp) => {
    return currency(sum).add(corp.current_balance || 0).value;
  }, 0);

  return (
    <div className={styles.corpList}>
      <div className={styles.corpListHeader}>
        <h2>Corporations</h2>
        <button onClick={() => setShowAddCorpForm(true)}>Add</button>
      </div>

      <div className={styles.grandTotal}>
        <span className={styles.grandTotalLabel}>Grand Total:</span>
        <span className={styles.grandTotalValue}>
          {currency(grandTotal, { symbol: '', precision: 0 }).format()}
        </span>
      </div>

      {showAddCorpForm && (
        <AddCorpForm
          onAdd={(data) => {
            onAddCorp(data);
            setShowAddCorpForm(false);
          }}
          onCancel={() => setShowAddCorpForm(false)}
        />
      )}

      <div style={{ marginTop: '15px' }}>
        <CorpDropdown
          corps={corps}
          selectedCorp={selectedCorp}
          onSelect={(corp) => onSelectCorp(corp.id)}
        />
      </div>

      {selectedCorp && (
        <div style={{ marginTop: '15px' }}>
          <TransactionForm
            onSubmit={onAddTransaction}
            corpname={selectedCorp.name}
            isForeign={
              selectedCorp.is_foreign === true ||
              selectedCorp.is_foreign === 1 ||
              selectedCorp.is_foreign === '1'
            }
          />
        </div>
      )}
    </div>
  );
}

export default CorpList;