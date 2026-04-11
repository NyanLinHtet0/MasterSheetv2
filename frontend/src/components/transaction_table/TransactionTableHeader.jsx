import styles from './transactiontable.module.css';
import { getLocalizedUiText, LANGUAGE_MODES } from '../helpers/nameLocalization';

export default function TransactionTableHeader({
  isForeign,
  currencyName,
  isTableEditMode,
  isTagDetailsExpanded,
  onToggleTagDetails,
  showSaveColumn = false,
  languageMode = LANGUAGE_MODES.ENG,
}) {
  return (
    <thead>
      <tr>
        <th>Date</th>
        <th>Description</th>

        {isForeign ? (
          <>
            <th style={{ textAlign: 'right' }}>{currencyName}</th>
            <th style={{ textAlign: 'right' }}>Rate</th>
            {isTableEditMode && isForeign && (
              <th style={{ textAlign: 'right' }}>Adjust</th>
            )}
            <th style={{ textAlign: 'right' }}>Total MMK</th>
          </>
        ) : (
          <th style={{ textAlign: 'right' }}>Total MMK</th>
        )}

        {isTagDetailsExpanded ? (
          <>
            <th>
              <div className={styles.headerCellWithAction}>
                <span>Type</span>
                <button
                  type="button"
                  className={styles.headerToggleButton}
                  onClick={onToggleTagDetails}
                  aria-label="Hide tag columns"
                  title="Hide tag columns"
                >
                  −
                </button>
              </div>
            </th>
            <th>Global Tag</th>
            <th>Local Tag</th>
          </>
        ) : (
          <th>
            <div className={styles.headerCellWithAction}>
              <span>Tag</span>
              <button
                type="button"
                className={styles.headerToggleButton}
                onClick={onToggleTagDetails}
                aria-label="Show tag columns"
                title="Show tag columns"
              >
                +
              </button>
            </div>
          </th>
        )}
        <th>Item</th>
        <th>{getLocalizedUiText('flow', languageMode)}</th>
        <th>Qty</th>

        {showSaveColumn && <th className={styles.saveHeaderCell} aria-label="Save row" />}
      </tr>
    </thead>
  );
}
