import currency from 'currency.js';
import TransactionTable from '../components/transaction_table/TransactionTable';
import styles from './corp_details.module.css';
import { LANGUAGE_MODES } from '../components/helpers/nameLocalization';

function CorpDetailsTransactionsView({
  titleParts,
  selectedLayer1Key,
  selectedLayer2Key,
  selectedLayer3Key,
  handleSelectLayer1,
  handleSelectLayer2,
  handleSelectLayer3,
  layer1Options,
  layer2Options,
  layer3Options,
  displayTransactions,
  foreignLabel,
  isForeign,
  isInverse,
  onUpdateTransaction,
  onDeleteTransaction,
  typeOptions,
  getGlobalOptionsByType,
  getLocalOptionsByGlobal,
  resolveTypeId,
  inventoryLeafOptions,
  languageMode = LANGUAGE_MODES.ENG,
}) {
  const sumData = (rows) => rows.reduce((subTotal, tx) => subTotal.add(tx.total_mmk ?? 0), currency(0));
  const sumQty = (rows) => rows.reduce((subTotal, tx) => subTotal.add(tx.inven_qty ?? 0), currency(0));

  return (
    <div className={styles.tablecontainer}>
      <div className={styles.transactionFilters}>
        <div className={styles.filterGroup}>
          <label htmlFor="tx-filter-type">Type</label>
          <select
            id="tx-filter-type"
            value={selectedLayer1Key || ''}
            onChange={(event) => handleSelectLayer1(event.target.value || null)}
          >
            <option value="">All Types</option>
            {layer1Options.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="tx-filter-global-tag">Global Tag</label>
          <select
            id="tx-filter-global-tag"
            value={selectedLayer2Key || ''}
            onChange={(event) => handleSelectLayer2(event.target.value || null)}
            disabled={!selectedLayer1Key}
          >
            <option value="">All Global Tags</option>
            {layer2Options.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="tx-filter-local-tag">Local Tag</label>
          <select
            id="tx-filter-local-tag"
            value={selectedLayer3Key || ''}
            onChange={(event) => handleSelectLayer3(event.target.value || null)}
            disabled={!selectedLayer2Key}
          >
            <option value="">All Local Tags</option>
            {layer3Options.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.tablecontent}>
        <TransactionTable
          title={`${titleParts.slice().reverse().join(' ')} Transactions: ${currency(sumData(displayTransactions).value, { precision: 0, symbol: '' }).format()} MMK (${sumQty(displayTransactions).value} items)`}
          data={displayTransactions}
          type="all"
          currencyName={foreignLabel}
          isForeign={isForeign}
          isInverse={isInverse}
          onUpdate={onUpdateTransaction}
          onDelete={onDeleteTransaction}
          typeOptions={typeOptions}
          getGlobalOptionsByType={getGlobalOptionsByType}
          getLocalOptionsByGlobal={getLocalOptionsByGlobal}
          resolveTypeId={resolveTypeId}
          inventoryOptions={inventoryLeafOptions}
          languageMode={languageMode}
        />
      </div>
    </div>
  );
}

export default CorpDetailsTransactionsView;
