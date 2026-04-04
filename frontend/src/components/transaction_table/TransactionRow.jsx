import styles from './transactiontable.module.css';

export default function TransactionRow({
  tx, type, isForeign, isTableEditMode, isEditing, 
  editFormData, onInputChange, onSave, onCancel, onEditClick, onDelete
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
          <input type="date" value={editFormData.date} onChange={(e) => onInputChange(e, 'date')} />
        </td>
        <td>
          <input type="text" value={editFormData.description} onChange={(e) => onInputChange(e, 'description')} />
        </td>
        {isForeign ? (
          <>
            <td style={{ textAlign: 'right' }}>
              <input style={{ textAlign: 'right', width: '80px' }} type="number" value={editFormData.amount} onChange={(e) => onInputChange(e, 'amount')} />
            </td>
            <td style={{ textAlign: 'right' }}>
              <input style={{ textAlign: 'right', width: '60px' }} type="number" value={editFormData.rate} onChange={(e) => onInputChange(e, 'rate')} />
            </td>
            <td style={{ textAlign: 'right' }}>
              <input 
                style={{ textAlign: 'right', width: '100px', fontWeight: 'bold' }} 
                type="number" 
                value={editFormData.total_mmk} 
                onChange={(e) => onInputChange(e, 'total_mmk')} 
              />
            </td>
          </>
        ) : (
          <td style={{ textAlign: 'right' }}>
            <input style={{ textAlign: 'right', width: '100px' }} type="number" value={editFormData.amount} onChange={(e) => onInputChange(e, 'amount')} />
          </td>
        )}
        <td className={styles.actionCell} style={{ textAlign: 'center', width: '150px' }}>
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
              {tx.amount === '-' ? '-' : tx.amount ? Number(tx.amount).toLocaleString() : ''}
            </span>
          </td>
          <td style={{ textAlign: 'right' }}>
            {tx.rate === '-' ? '-' : tx.rate ? Number(tx.rate).toLocaleString(undefined, { maximumFractionDigits: 2 }) : ''}
          </td>
          <td style={{ textAlign: 'right' }}>
            <span style={{ color: amountColor, fontWeight: 'bold' }}>
              {tx.total_mmk ? Math.round(Number(tx.total_mmk)).toLocaleString() : ''}
            </span>
          </td>
        </>
      ) : (
        <td style={{ textAlign: 'right' }}>
          <span style={{ color: amountColor, fontWeight: 'bold' }}>
            {tx.amount === '-' ? '-' : tx.amount ? Number(tx.amount).toLocaleString() : ''}
          </span>
        </td>
      )}
      <td className={styles.actionCell} style={{ textAlign: 'center', width: '150px' }}>
        {isTableEditMode ? (
          <div className={styles.actionCellButtons}>
            <button className={`${styles.actionBtn} ${styles.saveBtn}`} onClick={onEditClick}>Edit</button>
            <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={onDelete}>Delete</button>
          </div>
        ) : (
          <span>&nbsp;</span>
        )}
      </td>
    </tr>
  );
}