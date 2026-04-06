import React, { useState, useEffect } from 'react';
import styles from './Sheets.module.css';
import CorpList from '../sheets/corp_list';
import CorpDetails from '../sheets/corp_details';
import {
  buildInsertedTransaction,
  buildUpdatedTransaction,
  buildSoftDeletedTransaction,
  sanitizeTransactionForDirty,
  applyTransactionDeltaToCorp,
  areTransactionsEqual,
} from '../components/transaction_table/transactionTableHelpers';

function Sheets({
  corps = [],
  onAddCorp,
  onQueueUpdate,
  onQueueInsert,
  onRemoveDirtyRow,
  setDraftData,
}) {
  const [showAddCorpForm, setShowAddCorpForm] = useState(false);
  const [selectedCorpId, setSelectedCorpId] = useState(null);

  useEffect(() => {
    if (!corps.length) {
      setSelectedCorpId(null);
      return;
    }

    const stillExists = corps.some((corp) => corp.id === selectedCorpId);

    if (!stillExists) {
      setSelectedCorpId(corps[0].id);
    }
  }, [corps, selectedCorpId]);

  const selectedCorp = corps.find((corp) => corp.id === selectedCorpId) || null;

  const handleInsertTransaction = (txData) => {
    if (!selectedCorp) return;

    const tempId = -Math.abs(Date.now());

    const { draftTx, insertPayload } = buildInsertedTransaction(
      { ...txData, id: tempId },
      {
        corpId: selectedCorp.id,
        isForeign: selectedCorp.is_foreign,
        isInverse: selectedCorp.inverse,
        globalTreeId: txData.global_tree_id ?? 1,
      }
    );

    setDraftData((prev) => ({
      ...prev,
      corp_data: prev.corp_data.map((corp) => {
        if (corp.id !== selectedCorp.id) return corp;

        return applyTransactionDeltaToCorp(
          {
            ...corp,
            transactions: [...(corp.transactions || []), draftTx],
          },
          null,
          draftTx
        );
      }),
    }));

    onQueueInsert?.('transactions', tempId, insertPayload);
  };

  const handleUpdateTransaction = (txId, editFormData) => {
    if (!selectedCorp) return;

    const oldTx = (selectedCorp.transactions || []).find((tx) => tx.id === txId);
    if (!oldTx) return;

    const { draftTx, dirtyTx } = buildUpdatedTransaction(oldTx, editFormData, {
      isForeign: selectedCorp.is_foreign,
      isInverse: selectedCorp.inverse,
    });

    if (areTransactionsEqual(oldTx, draftTx)) {
      return;
    }

    setDraftData((prev) => ({
      ...prev,
      corp_data: prev.corp_data.map((corp) => {
        if (corp.id !== selectedCorp.id) return corp;

        return applyTransactionDeltaToCorp(
          {
            ...corp,
            transactions: (corp.transactions || []).map((tx) =>
              tx.id === txId ? draftTx : tx
            ),
          },
          oldTx,
          draftTx
        );
      }),
    }));

    onQueueUpdate?.(
      'transactions',
      oldTx.id,
      sanitizeTransactionForDirty(oldTx),
      dirtyTx
    );
  };

  const handleDeleteTransaction = (txId) => {
    if (!selectedCorp) return;

    const oldTx = (selectedCorp.transactions || []).find((tx) => tx.id === txId);
    if (!oldTx) return;

    if (oldTx.id < 0) {
      setDraftData((prev) => ({
        ...prev,
        corp_data: prev.corp_data.map((corp) => {
          if (corp.id !== selectedCorp.id) return corp;

          return applyTransactionDeltaToCorp(
            {
              ...corp,
              transactions: (corp.transactions || []).filter((tx) => tx.id !== txId),
            },
            oldTx,
            null
          );
        }),
      }));

      onRemoveDirtyRow?.('INSERT', 'transactions', oldTx.id);
      return;
    }

    const { draftTx, dirtyTx } = buildSoftDeletedTransaction(oldTx);

    setDraftData((prev) => ({
      ...prev,
      corp_data: prev.corp_data.map((corp) => {
        if (corp.id !== selectedCorp.id) return corp;

        return applyTransactionDeltaToCorp(
          {
            ...corp,
            transactions: (corp.transactions || []).map((tx) =>
              tx.id === txId ? draftTx : tx
            ),
          },
          oldTx,
          draftTx
        );
      }),
    }));

    onQueueUpdate?.(
      'transactions',
      oldTx.id,
      sanitizeTransactionForDirty(oldTx),
      dirtyTx
    );
  };

  return (
    <div className={styles.container}>
      <CorpList
        showAddCorpForm={showAddCorpForm}
        setShowAddCorpForm={setShowAddCorpForm}
        corps={corps}
        onAddCorp={onAddCorp}
        selectedCorp={selectedCorp}
        onSelectCorp={setSelectedCorpId}
        onAddTransaction={handleInsertTransaction}
      />

      <CorpDetails
        selectedCorp={selectedCorp}
        onUpdateTransaction={handleUpdateTransaction}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  );
}

export default Sheets;
