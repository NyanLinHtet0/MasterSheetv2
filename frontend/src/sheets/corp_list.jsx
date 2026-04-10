import { useMemo } from 'react';
import currency from 'currency.js';
import styles from './corp_list.module.css';
import AddCorpForm from './add_corp_form';
import CorpDropdown from '../components/CorpDropdown';
import TransactionForm from '../components/add_transaction_form/TransactionForm';
import { buildRowMap, normalizeRows } from '../components/helpers/treeHelpers';
import { getLocalizedName } from '../components/helpers/nameLocalization';

function CorpList({
  showAddCorpForm,
  setShowAddCorpForm,
  corps = [],
  onAddCorp,
  selectedCorp,
  onSelectCorp,
  onRenameCorp,
  onDeleteCorp,
  onAddTransaction,
  globalTree = [],
  languageMode,
}) {
  const grandTotal = corps.reduce((sum, corp) => {
    return currency(sum).add(corp.current_balance || 0).value;
  }, 0);

  const inventoryOptions = useMemo(() => {
    const rows = normalizeRows(selectedCorp?.inventory_tree || []);
    const rowMap = buildRowMap(rows);

    const makePath = (node) => {
      const parts = [];
      let current = node;
      let guard = 0;

      while (current && guard < 1000) {
        parts.unshift(
          getLocalizedName(current, languageMode) || current.name || `ID ${current.id}`
        );
        current = current.parent_id != null ? rowMap.get(current.parent_id) : null;
        guard += 1;
      }

      return parts.join(' > ');
    };

    return rows
      .filter((row) => Number(row.leaf) === 1)
      .map((row) => ({
        value: String(row.id),
        label: makePath(row),
        leafName: getLocalizedName(row, languageMode) || row.name || '',
      }));
  }, [selectedCorp, languageMode]);

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
          onRename={onRenameCorp}
          onDelete={onDeleteCorp}
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
            globalTree={globalTree}
            localTree={selectedCorp.local_tree || []}
            languageMode={languageMode}
            inventoryOptions={inventoryOptions}
          />
        </div>
      )}
    </div>
  );
}

export default CorpList;
