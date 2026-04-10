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

function formatEditNumber(value) {
  if (value == null || value === '') return '';

  const stringValue = String(value).replace(/,/g, '').trim();
  if (
    stringValue === '' ||
    stringValue === '-' ||
    stringValue === '.' ||
    stringValue === '-.'
  ) {
    return stringValue;
  }

  const isNegative = stringValue.startsWith('-');
  const unsignedValue = isNegative ? stringValue.slice(1) : stringValue;
  const [integerPartRaw = '', decimalPart = ''] = unsignedValue.split('.');

  if (!/^\d*$/.test(integerPartRaw) || !/^\d*$/.test(decimalPart)) {
    return value;
  }

  const integerPart = integerPartRaw === '' ? '0' : integerPartRaw;
  const formattedInteger = currency(Number(integerPart), {
    symbol: '',
    precision: 0,
  }).format();

  const signedInteger = isNegative ? `-${formattedInteger}` : formattedInteger;

  if (!unsignedValue.includes('.')) return signedInteger;
  return `${signedInteger}.${decimalPart}`;
}

function normalizeEditNumber(value) {
  return value.replace(/,/g, '');
}

function getDisplayTagLabel(tx) {
  const parts = [
    tx.global_tag_root_name,
    tx.global_tag_name,
    tx.local_tag_name,
  ].filter(Boolean);

  return parts.length > 0 ? parts.reverse().join(' ') : '-';
}

function getEditingLabels({
  tx,
  editFormData,
  typeOptions,
  globalOptions,
  localOptions,
}) {
  const typeLabel = typeOptions.find(
    (option) => String(option.value) === String(editFormData.type_id)
  )?.label;

  const globalLabel = globalOptions.find(
    (option) =>
      option.localId == null &&
      String(option.globalId) === String(editFormData.global_tree_id)
  )?.label;

  const localLabel = localOptions.find(
    (option) => String(option.value) === String(editFormData.local_tree_id)
  )?.label;

  return {
    typeLabel: typeLabel || tx.global_tag_root_name || '-',
    globalLabel: globalLabel || tx.global_tag_name || '-',
    localLabel: localLabel || tx.local_tag_name || '-',
  };
}

function renderCompactTagEditor({
  editFormData,
  onInputChange,
  typeOptions,
  globalOptions,
  selectedGlobalOptionValue,
  localOptions,
}) {
  return (
    <div className={styles.compactTagEditor}>
      <select
        className={`${styles.editInput} ${styles.tagInlineSelect}`}
        value={editFormData.type_id}
        onChange={(e) => onInputChange(e, 'type_id')}
      >
        <option value="">Type</option>
        {typeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className={`${styles.editInput} ${styles.tagInlineSelect}`}
        value={selectedGlobalOptionValue}
        onChange={(e) => onInputChange(e, 'global_tree_id')}
      >
        <option value="">Global Tag</option>
        {globalOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className={`${styles.editInput} ${styles.tagInlineSelect}`}
        value={editFormData.local_tree_id}
        onChange={(e) => onInputChange(e, 'local_tree_id')}
      >
        <option value="">Local Tag</option>
        {localOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function TransactionRow({
  tx,
  type,
  isForeign,
  isTableEditMode,
  isEditing,
  isTagDetailsExpanded = false,
  editFormData,
  onInputChange,
  onSave,
  typeOptions = [],
  globalOptions = [],
  selectedGlobalOptionValue = '',
  localOptions = [],
  inventoryOptions = [],
  onContextMenu,
  editingRowRef,
  showSaveColumn = false,
}) {
  const amountColor = (type === 'income' || (type === 'all' && Number(tx.amount) >= 0))
    ? 'var(--success-color)'
    : (type === 'expense' || (type === 'all' && Number(tx.amount) < 0))
      ? '#ef4444'
      : 'inherit';

  const compactTagLabel = (() => {
    if (!isEditing) {
      return getDisplayTagLabel(tx);
    }

    const labels = getEditingLabels({
      tx,
      editFormData,
      typeOptions,
      globalOptions,
      localOptions,
    });

    return [labels.typeLabel, labels.globalLabel, labels.localLabel]
      .filter(Boolean)
      .join(' / ');
  })();

  return (
    <tr
      ref={isEditing ? editingRowRef : null}
      className={`${styles.txRow} ${isEditing ? styles.editingRow : ''} ${isTableEditMode && !isEditing ? styles.contextMenuRow : ''}`}
      onContextMenu={isEditing ? undefined : onContextMenu}
      title={isTableEditMode && !isEditing ? 'Right click for actions' : ''}
    >
      <td>
        {isEditing ? (
          <input
            translate="no"
            className={`${styles.editInput} ${styles.editInputDate}`}
            type="date"
            value={editFormData.date}
            onChange={(e) => onInputChange(e, 'date')}
          />
        ) : (
          tx.tx_date
        )}
      </td>

      <td>
        {isEditing ? (
          <input
            className={`${styles.editInput} ${styles.editInputText}`}
            type="text"
            value={editFormData.description}
            onChange={(e) => onInputChange(e, 'description')}
          />
        ) : (
          tx.description
        )}
      </td>

      {isForeign ? (
        <>
          <td style={{ textAlign: 'right' }}>
            {isEditing ? (
              <input
                className={`${styles.editInput} ${styles.editInputNumber} ${styles.editInputSm}`}
                type="text"
                inputMode="decimal"
                value={formatEditNumber(editFormData.amount)}
                onChange={(e) =>
                  onInputChange(
                    { ...e, target: { ...e.target, value: normalizeEditNumber(e.target.value) } },
                    'amount'
                  )
                }
              />
            ) : (
              <span style={{ color: amountColor, fontWeight: 'bold' }}>
                {formatCurrencyValue(tx.amount)}
              </span>
            )}
          </td>

          <td style={{ textAlign: 'right' }}>
            {isEditing ? (
              <input
                className={`${styles.editInput} ${styles.editInputNumber} ${styles.editInputXs}`}
                type="text"
                inputMode="decimal"
                value={formatEditNumber(editFormData.rate)}
                onChange={(e) =>
                  onInputChange(
                    { ...e, target: { ...e.target, value: normalizeEditNumber(e.target.value) } },
                    'rate'
                  )
                }
              />
            ) : (
              formatCurrencyValue(tx.rate)
            )}
          </td>

          {isTableEditMode && isForeign && (
            <td style={{ textAlign: 'right' }}>
              {formatCurrencyValue(tx.adjustment)}
            </td>
          )}

          <td style={{ textAlign: 'right' }}>
            {isEditing ? (
              <input
                className={`${styles.editInput} ${styles.editInputNumber} ${styles.editInputMd} ${styles.editInputBold}`}
                type="text"
                inputMode="decimal"
                value={formatEditNumber(editFormData.total_mmk)}
                onChange={(e) =>
                  onInputChange(
                    { ...e, target: { ...e.target, value: normalizeEditNumber(e.target.value) } },
                    'total_mmk'
                  )
                }
              />
            ) : (
              <span style={{ color: amountColor, fontWeight: 'bold' }}>
                {formatCurrencyValue(tx.total_mmk)}
              </span>
            )}
          </td>
        </>
      ) : (
        <td style={{ textAlign: 'right' }}>
          {isEditing ? (
            <input
              className={`${styles.editInput} ${styles.editInputNumber} ${styles.editInputMd}`}
              type="text"
              inputMode="decimal"
              value={formatEditNumber(editFormData.amount)}
              onChange={(e) =>
                onInputChange(
                  { ...e, target: { ...e.target, value: normalizeEditNumber(e.target.value) } },
                  'amount'
                )
              }
            />
          ) : (
            <span style={{ color: amountColor, fontWeight: 'bold' }}>
              {formatCurrencyValue(tx.amount)}
            </span>
          )}
        </td>
      )}

      {isTagDetailsExpanded ? (
        <>
          <td>
            {isEditing ? (
              <select
                className={`${styles.editInput} ${styles.tagInlineSelect}`}
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
            ) : (
              <span className={styles.tagCellValue}>
                {tx.global_tag_root_name || '-'}
              </span>
            )}
          </td>

          <td>
            {isEditing ? (
              <select
                className={`${styles.editInput} ${styles.tagInlineSelect}`}
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
            ) : (
              <span className={styles.tagCellValue}>
                {tx.global_tag_name || '-'}
              </span>
            )}
          </td>

          <td>
            {isEditing ? (
              <select
                className={`${styles.editInput} ${styles.tagInlineSelect}`}
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
            ) : (
              <span className={styles.tagCellValue}>
                {tx.local_tag_name || '-'}
              </span>
            )}
          </td>
        </>
      ) : (
        <td>
          {isEditing ? renderCompactTagEditor({
            editFormData,
            onInputChange,
            typeOptions,
            globalOptions,
            selectedGlobalOptionValue,
            localOptions,
          }) : (
            <span className={styles.tagText}>{compactTagLabel}</span>
          )}
        </td>
      )}

      <td>
        {isEditing ? (
          <select
            className={`${styles.editInput} ${styles.tagInlineSelect}`}
            value={editFormData.inven_id}
            onChange={(e) => onInputChange(e, 'inven_id')}
          >
            <option value="">-</option>
            {inventoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <span className={styles.tagCellValue}>{tx.inventory_item_name || '-'}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <select
            className={`${styles.editInput} ${styles.tagInlineSelect}`}
            value={editFormData.inven_flow}
            onChange={(e) => onInputChange(e, 'inven_flow')}
          >
            <option value="">-</option>
            <option value="1">In</option>
            <option value="-1">Out</option>
          </select>
        ) : (
          <span className={styles.tagCellValue}>{tx.inventory_flow_label || '-'}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            className={`${styles.editInput} ${styles.editInputNumber} ${styles.editInputXs}`}
            type="text"
            inputMode="decimal"
            value={formatEditNumber(editFormData.inven_qty)}
            onChange={(e) =>
              onInputChange(
                { ...e, target: { ...e.target, value: normalizeEditNumber(e.target.value) } },
                'inven_qty'
              )
            }
          />
        ) : (
          <span className={styles.tagCellValue}>{tx.inven_qty ?? '-'}</span>
        )}
      </td>

      {showSaveColumn && (
        <td className={styles.saveCell}>
          {isEditing && (
            <button type="button" className={styles.inlineSaveButton} onClick={onSave}>
              Save
            </button>
          )}
        </td>
      )}
    </tr>
  );
}
