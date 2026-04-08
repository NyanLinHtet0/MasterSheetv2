import styles from './transactiontable.module.css';
import currency from 'currency.js';

function formatCurrencyValue(value, { fallback = '' } = {}) {
  if (value === '-') return '-';
  if (value == null || value === '') return fallback;

  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return fallback;

  const hasDecimal = !Number.isInteger(numericValue);
  return currency(numericValue, {
    symbol: '',
    precision: hasDecimal ? 2 : 0,
  }).format();
}

export default function TransactionRow({
  tx, type, isForeign, isTableEditMode, isEditing,
  editFormData, onInputChange, onSave, onCancel, onEditClick, onDelete,
  typeOptions = [], globalOptions = [], selectedGlobalOptionValue = '', localOptions = [],
}) {
  const amountColor = (type === 'income' || (type === 'all' && Number(tx.amount) >= 0))
    ? 'var(--success-color)'
    : (type === 'expense' || (type === 'all' && Number(tx.amount) < 0))
      ? '#ef4444'
      : 'inherit';

  if (isEditing) {
    return (
      <tr>
        <td>
          <input
            translate="no"
            className={`${styles.editInput} ${styles.editInputDate}`}
            type="date"
            value={editFormData.date}
            onChange={(e) => onInputChange(e, 'date')}
          />
        </td>

        <td>
          <input
            className={`${styles.editInput} ${styles.editInputText}`}
            type="text"
            value={editFormData.description}
            onChange={(e) => onInputChange(e, 'description')}
          />
        </td>

        {isForeign ? (
          <>
            <td style={{ textAlign: 'right' }}>
              <input
                className={`${styles.editInput} ${styles.editInputNumber} ${styles.editInputSm}`}
                type="number"
                value={editFormData.amount}
                onChange={(e) => onInputChange(e, 'amount')}
              />
            </td>

            <td style={{ textAlign: 'right' }}>
              <input
                className={`${styles.editInput} ${styles.editInputNumber} ${styles.editInputXs}`}
                type="number"
                value={editFormData.rate}
                onChange={(e) => onInputChange(e, 'rate')}
              />
            </td>
            {isTableEditMode && isForeign && (
              <td style={{ textAlign: 'right' }}>
                {formatCurrencyValue(tx.adjustment)}
              </td>
            )}

            <td style={{ textAlign: 'right' }}>
              <input
                className={`${styles.editInput} ${styles.editInputNumber} ${styles.editInputMd} ${styles.editInputBold}`}
                type="number"
                value={editFormData.total_mmk}
                onChange={(e) => onInputChange(e, 'total_mmk')}
              />
            </td>
          </>
        ) : (
          <td style={{ textAlign: 'right' }}>
            <input
              className={`${styles.editInput} ${styles.editInputNumber} ${styles.editInputMd}`}
              type="number"
              value={editFormData.amount}
              onChange={(e) => onInputChange(e, 'amount')}
            />
          </td>
        )}

        <td>
          <select
            className={styles.editInput}
            value={editFormData.type_id}
            onChange={(e) => onInputChange(e, 'type_id')}
          >
            <option value="">-</option>
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </td>

        <td>
          <select
            className={styles.editInput}
            value={selectedGlobalOptionValue}
            onChange={(e) => onInputChange(e, 'global_tree_id')}
          >
            <option value="">-</option>
            {globalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </td>

        <td>
          <select
            className={styles.editInput}
            value={editFormData.local_tree_id}
            onChange={(e) => onInputChange(e, 'local_tree_id')}
          >
            <option value="">-</option>
            {localOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </td>

        <td className={styles.actionCell}>
          <div className={styles.actionCellButtons}>
            <button className={`${styles.actionBtn} ${styles.saveBtn}`} onClick={onSave}>Save</button>
            <button className={`${styles.actionBtn} ${styles.cancelBtn}`} onClick={onCancel}>Cancel</button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{tx.tx_date}</td>
      <td>{tx.description}</td>

      {isForeign ? (
        <>
          <td style={{ textAlign: 'right' }}>
            <span style={{ color: amountColor, fontWeight: 'bold' }}>
              {formatCurrencyValue(tx.amount)}
            </span>
          </td>
          <td style={{ textAlign: 'right' }}>
            {formatCurrencyValue(tx.rate)}
          </td>
            {isTableEditMode && isForeign && (
              <td style={{ textAlign: 'right' }}>
                {formatCurrencyValue(tx.adjustment)}
              </td>
            )}
          <td style={{ textAlign: 'right' }}>
            <span style={{ color: amountColor, fontWeight: 'bold' }}>
              {formatCurrencyValue(tx.total_mmk)}
            </span>
          </td>
        </>
      ) : (
        <td style={{ textAlign: 'right' }}>
          <span style={{ color: amountColor, fontWeight: 'bold' }}>
            {formatCurrencyValue(tx.amount)}
          </span>
        </td>
      )}

      <td>{tx.global_tag_root_name || '-'}</td>
      <td>{tx.global_tag_name || '-'}</td>
      <td>{tx.local_tag_name || '-'}</td>
      {isTableEditMode &&
        <td className={styles.actionCell}>
          {isTableEditMode ? (
            <div className={styles.actionCellButtons}>
              <button className={`${styles.actionBtn} ${styles.saveBtn}`} onClick={onEditClick}>Edit</button>
              <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={onDelete}>Delete</button>
            </div>
          ) : (
            <span>&nbsp;</span>
          )}
        </td>}

    </tr>
  );
}
