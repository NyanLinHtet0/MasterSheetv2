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
  typeOptions = [],
  getGlobalOptionsByType = () => [],
  getLocalOptionsByGlobal = () => [],
  resolveTypeId = () => null,
}) {
  const isEmpty = data.length === 0;

  const {
    isTableEditMode,
    editingRowId,
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
    resolveTypeId,
  });

  const globalOptions = getGlobalOptionsByType(editFormData.type_id);
  const localOptions = getLocalOptionsByGlobal(editFormData.global_tree_id);

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
            <colgroup>
              <col style={{ width: '140px' }} />
              <col style={{ width: '220px' }} />
              {isForeign ? (
                <>
                  <col style={{ width: '100px' }} />
                  <col style={{ width: '85px' }} />
                  <col style={{ width: '120px' }} />
                </>
              ) : (
                <col style={{ width: '120px' }} />
              )}
              <col style={{ width: '180px' }} />
              {isTableEditMode && <col style={{ width: '180px' }} />}
              <col style={{ width: '180px' }} />
              {isTableEditMode &&
              <col style={{ width: '180px' }} />}
            </colgroup>

            <TransactionTableHeader
              isForeign={isForeign}
              currencyName={currencyName}
              isTableEditMode={isTableEditMode}
            />
            <tbody>
              {data.map((tx) => (
                <TransactionRow
                  key={`tx-${tx.id}`}
                  tx={tx}
                  type={type}
                  isForeign={isForeign}
                  isTableEditMode={isTableEditMode}
                  isEditing={editingRowId === tx.id}
                  editFormData={editFormData}
                  onInputChange={handleInputChange}
                  typeOptions={typeOptions}
                  globalOptions={globalOptions}
                  localOptions={localOptions}
                  onSave={() => handleSaveEdit(tx.id)}
                  onCancel={handleCancelEdit}
                  onEditClick={() => handleEditClick(tx)}
                  onDelete={() => onDelete(tx.id)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
