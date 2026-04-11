import { useState } from 'react';
import styles from './transactiontable.module.css';
import TransactionTableHeader from './TransactionTableHeader';
import TransactionRow from './TransactionRow';
import { useTransactionTable } from './useTransactionTable';
import { LANGUAGE_MODES } from '../helpers/nameLocalization';

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
  inventoryOptions = [],
  languageMode = LANGUAGE_MODES.ENG,
}) {
  const isEmpty = data.length === 0;
  const [pendingDeleteRowId, setPendingDeleteRowId] = useState(null);
  const [isTagDetailsExpanded, setIsTagDetailsExpanded] = useState(false);

  const {
    isTableEditMode,
    editingRowId,
    editFormData,
    contextMenu,
    contextMenuRef,
    editingRowRef,
    closeContextMenu,
    handleEditClick,
    handleSaveEdit,
    handleInputChange,
    handleToggleEditMode,
    handleOpenContextMenu,
    handleKeyDown,
  } = useTransactionTable({
    isForeign,
    isInverse,
    onSaveRow: onUpdate,
    resolveTypeId,
  });

  const globalOptions = getGlobalOptionsByType(editFormData.type_id);
  const selectedGlobalOptionValue = (() => {
    const matchedLocalOption = globalOptions.find(
      (option) =>
        option.localId != null &&
        String(option.localId) === String(editFormData.local_tree_id) &&
        String(option.globalId) === String(editFormData.global_tree_id)
    );

    if (matchedLocalOption) {
      return matchedLocalOption.value;
    }

    const matchedGlobalOption = globalOptions.find(
      (option) =>
        option.localId == null &&
        String(option.globalId) === String(editFormData.global_tree_id)
    );

    return matchedGlobalOption?.value || '';
  })();

  const localOptions = getLocalOptionsByGlobal(selectedGlobalOptionValue);
  const contextMenuTx = data.find((tx) => tx.id === contextMenu.rowId) || null;
  const showSaveColumn = editingRowId != null;

  const toggleTagDetails = () => {
    setIsTagDetailsExpanded((prev) => !prev);
  };

  const openDeleteConfirm = (rowId) => {
    closeContextMenu();
    setPendingDeleteRowId(rowId);
  };

  const closeDeleteConfirm = () => {
    setPendingDeleteRowId(null);
  };
  


  const confirmDelete = () => {
    if (pendingDeleteRowId == null) return;
    onDelete(pendingDeleteRowId);
    setPendingDeleteRowId(null);
  };

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.txHeader} style={{ marginBottom: '10px' }}>
        <h3 className={styles.tableTitle}>{title}</h3>
        <div className={styles.txHeaderActions}>
          {!isEmpty && (
            <button onClick={handleToggleEditMode}>
              {isTableEditMode ? 'Done' : 'Edit Table'}
            </button>
          )}
        </div>
      </div>

      <div className={styles.tableScroll} onKeyDown={handleKeyDown}>
        {isEmpty ? (
          <p style={{ padding: '15px', color: 'var(--text-muted)' }}>
            No transactions yet.
          </p>
        ) : (
          <table className={styles.txTable}>
            <colgroup>
              <col style={{ width: '100px' }} />
              <col style={{ width: '220px' }} />

              {isForeign ? (
                <>
                  <col style={{ width: '100px' }} />
                  <col style={{ width: '85px' }} />
                  {isTableEditMode && isForeign && <col style={{ width: '80px' }} />}
                  <col style={{ width: '120px' }} />
                </>
              ) : (
                <col style={{ width: '120px' }} />
              )}

              {isTagDetailsExpanded ? (
                <>
                  <col style={{ width: '80px' }} />
                  <col style={{ width: '80px' }} />
                  <col style={{ width: '80px' }} />
                </>
              ) : (
                <col style={{ width: '200' }} />
              )}
              <col style={{ width: '80px' }} />
              <col style={{ width: '80px' }} />
              <col style={{ width: '80px' }} />


              {showSaveColumn && <col style={{ width: '82px' }} />}
            </colgroup>

            <TransactionTableHeader
              isForeign={isForeign}
              currencyName={currencyName}
              isTableEditMode={isTableEditMode}
              isTagDetailsExpanded={isTagDetailsExpanded}
              onToggleTagDetails={toggleTagDetails}
              showSaveColumn={showSaveColumn}
              languageMode={languageMode}
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
                  isTagDetailsExpanded={isTagDetailsExpanded}
                  editFormData={editFormData}
                  onInputChange={handleInputChange}
                  typeOptions={typeOptions}
                  globalOptions={globalOptions}
                  selectedGlobalOptionValue={selectedGlobalOptionValue}
                  localOptions={localOptions}
                  onSave={() => handleSaveEdit(tx.id)}
                  inventoryOptions={inventoryOptions}
                  onEditClick={() => handleEditClick(tx)}
                  onDelete={() => openDeleteConfirm(tx.id)}
                  onContextMenu={(e) => handleOpenContextMenu(e, tx.id)}
                  editingRowRef={editingRowRef}
                  showSaveColumn={showSaveColumn}
                  languageMode={languageMode}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isTableEditMode && contextMenu.isOpen && contextMenuTx && (
        <div
          ref={contextMenuRef}
          className={styles.contextMenu}
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <button
            type="button"
            className={styles.contextMenuButton}
            onClick={() => handleEditClick(contextMenuTx)}
          >
            Edit
          </button>
          <button
            type="button"
            className={`${styles.contextMenuButton} ${styles.contextMenuDelete}`}
            onClick={() => openDeleteConfirm(contextMenuTx.id)}
          >
            Delete
          </button>
        </div>
      )}

      {pendingDeleteRowId != null && (
        <div className={styles.modalOverlay} onClick={closeDeleteConfirm}>
          <div
            className={styles.confirmModal}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className={styles.confirmTitle}>Delete transaction?</h4>
            <p className={styles.confirmText}>
              This will remove the transaction from the table. Please confirm.
            </p>

            <div className={styles.confirmActions}>
              <button
                type="button"
                className={styles.confirmCancelBtn}
                onClick={closeDeleteConfirm}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.confirmDeleteBtn}
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
