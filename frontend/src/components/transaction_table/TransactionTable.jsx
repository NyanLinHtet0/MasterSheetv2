import styles from './transactiontable.module.css';
import TransactionTableHeader from './TransactionTableHeader';
import TransactionRow from './TransactionRow';
import { useTransactionTable } from './useTransactionTable';

export default function TransactionTable({
  title,
  data,
  type,
  currencyName,
  isForeign,
  isInverse,
  onDelete,
  onUpdate,
}) {
  const isEmpty = data.length === 0;

  const {
    isTableEditMode,
    editingRowIndex,
    editFormData,
    handleEditClick,
    handleSaveEdit,
    handleCancelEdit,
    handleInputChange,
    handleToggleEditMode,
  } = useTransactionTable({
    isForeign,
    isInverse,
    onSaveRow: onUpdate,
  });

  return (
    <>
      <div className={styles.txHeader} style={{ marginBottom: '10px' }}>
        <h3 className={styles.tableTitle}>{title}</h3>

        {!isEmpty && (
          <button onClick={handleToggleEditMode}>
            {isTableEditMode ? 'Done' : 'Edit Table'}
          </button>
        )}
      </div>

      <div className={styles.tableScroll}>
        {isEmpty ? (
          <p style={{ padding: '15px', color: 'var(--text-muted)' }}>
            No transactions yet.
          </p>
        ) : (
          <table className={styles.txTable}>
            <TransactionTableHeader
              isForeign={isForeign}
              currencyName={currencyName}
              isTableEditMode={isTableEditMode}
            />
            <tbody>
              {data.map((tx) => (
                <TransactionRow
                  key={`tx-${tx.originalIndex}`}
                  tx={tx}
                  type={type}
                  isForeign={isForeign}
                  isTableEditMode={isTableEditMode}
                  isEditing={editingRowIndex === tx.originalIndex}
                  editFormData={editFormData}
                  onInputChange={handleInputChange}
                  onSave={() => handleSaveEdit(tx.originalIndex)}
                  onCancel={handleCancelEdit}
                  onEditClick={() => handleEditClick(tx)}
                  onDelete={() => onDelete(tx.originalIndex)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}