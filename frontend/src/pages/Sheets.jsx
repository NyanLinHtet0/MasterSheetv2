import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import {
  LANGUAGE_MODES,
  splitBilingualName,
} from '../components/helpers/nameLocalization';

function Sheets({
  corps = [],
  globalTree = [],
  assets = [],
  linkTable = [],
  paymentTable = [],
  onAddCorp,
  onQueueUpdate,
  onQueueInsert,
  onRemoveDirtyRow,
  setDraftData,
}) {
  const DEFAULT_LIST_WIDTH = 320;
  const COLLAPSED_LIST_WIDTH = 28;
  const SNAP_CLOSE_THRESHOLD = 120;
  const SNAP_OPEN_THRESHOLD = 160;
  const MIN_EXPANDED_LIST_WIDTH = 220;
  const MAX_LIST_WIDTH = 600;

  const [showAddCorpForm, setShowAddCorpForm] = useState(false);
  const [selectedCorpId, setSelectedCorpId] = useState(null);
  const [languageMode, setLanguageMode] = useState(LANGUAGE_MODES.ENG);
  const [listWidth, setListWidth] = useState(DEFAULT_LIST_WIDTH);
  const [isDraggingDivider, setIsDraggingDivider] = useState(false);
  const containerRef = useRef(null);

  const visibleCorps = corps.filter(
    (corp) =>
      !(
        corp.soft_delete === true ||
        corp.soft_delete === 1 ||
        corp.soft_delete === '1'
      )
  );

  useEffect(() => {
    if (!visibleCorps.length) {
      setSelectedCorpId(null);
      return;
    }

    const stillExists = visibleCorps.some((corp) => corp.id === selectedCorpId);

    if (!stillExists) {
      setSelectedCorpId(visibleCorps[0].id);
    }
  }, [visibleCorps, selectedCorpId]);

  const selectedCorp = visibleCorps.find((corp) => corp.id === selectedCorpId) || null;

  const clampListWidth = useCallback((rawWidth) => {
    if (rawWidth <= SNAP_CLOSE_THRESHOLD) {
      return COLLAPSED_LIST_WIDTH;
    }

    return Math.min(Math.max(rawWidth, MIN_EXPANDED_LIST_WIDTH), MAX_LIST_WIDTH);
  }, []);

  const expandFromCollapsedWidth = useCallback((rawWidth) => {
    if (rawWidth <= SNAP_OPEN_THRESHOLD) {
      return COLLAPSED_LIST_WIDTH;
    }

    return Math.min(Math.max(rawWidth, MIN_EXPANDED_LIST_WIDTH), MAX_LIST_WIDTH);
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      if (!containerRef.current) return;

      const bounds = containerRef.current.getBoundingClientRect();
      const nextWidth = event.clientX - bounds.left;

      setListWidth((previousWidth) =>
        previousWidth === COLLAPSED_LIST_WIDTH
          ? expandFromCollapsedWidth(nextWidth)
          : clampListWidth(nextWidth)
      );
    },
    [clampListWidth, expandFromCollapsedWidth]
  );

  const handlePointerUp = useCallback(() => {
    setIsDraggingDivider(false);
  }, []);

  useEffect(() => {
    if (!isDraggingDivider) return undefined;

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp, isDraggingDivider]);

  const isListCollapsed = listWidth <= COLLAPSED_LIST_WIDTH;

  const getCorpDirtyPayload = (corp) => ({
    name: corp.name ?? '',
    current_balance: corp.current_balance ?? 0,
    current_foreign: corp.current_foreign ?? 0,
    is_foreign: corp.is_foreign ?? 0,
    inverse: corp.inverse ?? 0,
    last_verified_date: corp.last_verified_date ?? null,
    last_verified_balance: corp.last_verified_balance ?? null,
    last_verified_total_foreign: corp.last_verified_total_foreign ?? null,
    start_day: corp.start_day ?? 1,
    display_order: corp.display_order ?? 0,
    corp_category_id: corp.corp_category_id ?? null,
    soft_delete: corp.soft_delete ?? 0,
  });

  const handleRenameCorp = ({ corpId, name }) => {
    const nextName = String(name || '').trim();
    if (!corpId || !nextName) return;

    const targetCorp = corps.find((corp) => corp.id === corpId);
    if (!targetCorp || targetCorp.name === nextName) return;

    setDraftData((prev) => ({
      ...prev,
      corp_data: (prev.corp_data || []).map((corp) =>
        corp.id === corpId ? { ...corp, name: nextName } : corp
      ),
    }));

    if (targetCorp.id < 0) {
      onQueueInsert?.('corp_data', targetCorp.id, {
        ...getCorpDirtyPayload(targetCorp),
        name: nextName,
      });
      return;
    }

    onQueueUpdate?.(
      'corp_data',
      targetCorp.id,
      getCorpDirtyPayload(targetCorp),
      {
        ...getCorpDirtyPayload(targetCorp),
        name: nextName,
      }
    );
  };

  const handleDeleteCorp = ({ corpId }) => {
    if (!corpId) return;

    const targetCorp = corps.find((corp) => corp.id === corpId);
    if (!targetCorp) return;

    if (targetCorp.id < 0) {
      setDraftData((prev) => ({
        ...prev,
        corp_data: (prev.corp_data || []).filter((corp) => corp.id !== corpId),
      }));
      onRemoveDirtyRow?.('INSERT', 'corp_data', targetCorp.id);
      return;
    }

    setDraftData((prev) => ({
      ...prev,
      corp_data: (prev.corp_data || []).map((corp) =>
        corp.id === corpId ? { ...corp, soft_delete: 1 } : corp
      ),
    }));

    onQueueUpdate?.(
      'corp_data',
      targetCorp.id,
      getCorpDirtyPayload(targetCorp),
      {
        ...getCorpDirtyPayload(targetCorp),
        soft_delete: 1,
      }
    );
  };

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
        localTreeId: txData.local_tree_id ?? null,
        invenId: txData.inven_id ?? null,
        invenFlow: txData.inven_flow ?? null,
        invenQty: txData.inven_qty ?? null,
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

  const handleInsertLocalTreeNode = ({
    corpId,
    name,
    burmeseName = null,
    parentId = null,
    globalParentId = null,
  }) => {
    if (!corpId || !name) return;
    const { englishName, burmeseName: parsedBurmeseName } = splitBilingualName(name);
    const nextEnglishName = englishName || name;
    const nextBurmeseName = String(burmeseName || '').trim() || parsedBurmeseName || null;

    const tempId = -Math.abs(Date.now() + Math.floor(Math.random() * 1000));
    const nextNode = {
      id: tempId,
      corp_id: corpId,
      parent_id: parentId,
      global_parent_id: globalParentId,
      name: nextEnglishName,
      burmese_name: nextBurmeseName,
      soft_delete: 0,
    };

    setDraftData((prev) => ({
      ...prev,
      corp_data: (prev.corp_data || []).map((corp) => {
        if (corp.id !== corpId) return corp;
        return {
          ...corp,
          local_tree: [...(corp.local_tree || []), nextNode],
        };
      }),
    }));

    onQueueInsert?.('local_tree', tempId, {
      corp_id: corpId,
      parent_id: parentId,
      global_parent_id: globalParentId,
      name: nextEnglishName,
      burmese_name: nextBurmeseName,
      soft_delete: 0,
    });
  };

  const handleRenameLocalTreeNode = ({ corpId, localTreeId, name }) => {
    if (!corpId || !localTreeId || !name) return;
    const { englishName, burmeseName } = splitBilingualName(name);
    const nextEnglishName = englishName || name;

    const corp = corps.find((row) => row.id === corpId);
    const oldNode = (corp?.local_tree || []).find((row) => row.id === localTreeId);

    const oldBurmeseName = String(oldNode?.burmese_name || '').trim();

    if (!oldNode || (oldNode.name === nextEnglishName && oldBurmeseName === burmeseName)) {
      return;
    }

    setDraftData((prev) => ({
      ...prev,
      corp_data: (prev.corp_data || []).map((row) => {
        if (row.id !== corpId) return row;

        return {
          ...row,
          local_tree: (row.local_tree || []).map((node) =>
            node.id === localTreeId
              ? { ...node, name: nextEnglishName, burmese_name: burmeseName || null }
              : node
          ),
        };
      }),
    }));

    if (oldNode.id < 0) {
      onQueueUpdate?.(
        'local_tree',
        oldNode.id,
        {
          corp_id: oldNode.corp_id,
          parent_id: oldNode.parent_id,
          global_parent_id: oldNode.global_parent_id,
          name: oldNode.name,
          burmese_name: oldNode.burmese_name ?? null,
          soft_delete: oldNode.soft_delete ?? 0,
        },
        {
          corp_id: oldNode.corp_id,
          parent_id: oldNode.parent_id,
          global_parent_id: oldNode.global_parent_id,
          name: nextEnglishName,
          burmese_name: burmeseName || null,
          soft_delete: oldNode.soft_delete ?? 0,
        }
      );
      return;
    }

    onQueueUpdate?.(
      'local_tree',
      oldNode.id,
      {
        corp_id: oldNode.corp_id,
        parent_id: oldNode.parent_id,
        global_parent_id: oldNode.global_parent_id,
        name: oldNode.name,
        burmese_name: oldNode.burmese_name ?? null,
        soft_delete: oldNode.soft_delete ?? 0,
      },
      {
        corp_id: oldNode.corp_id,
        parent_id: oldNode.parent_id,
        global_parent_id: oldNode.global_parent_id,
        name: nextEnglishName,
        burmese_name: burmeseName || null,
        soft_delete: oldNode.soft_delete ?? 0,
      }
    );
  };

  const handleInsertInventoryTreeNode = ({ corpId, name, burmeseName = null, parentId = null }) => {
    if (!corpId || !name) return;

    const tempId = -Math.abs(Date.now() + Math.floor(Math.random() * 1000));
    const nextNode = {
      id: tempId,
      corp_id: corpId,
      parent_id: parentId,
      name: String(name).trim(),
      burmese_name: burmeseName,
      quantity: 0,
      leaf: 1,
      soft_delete: 0,
    };

    const corp = corps.find((row) => row.id === corpId);
    const parentNode = (corp?.inventory_tree || []).find((row) => row.id === parentId);

    setDraftData((prev) => ({
      ...prev,
      corp_data: (prev.corp_data || []).map((row) => {
        if (row.id !== corpId) return row;

        return {
          ...row,
          inventory_tree: (row.inventory_tree || []).map((item) =>
            item.id === parentId ? { ...item, leaf: 0 } : item
          ).concat(nextNode),
        };
      }),
    }));

    onQueueInsert?.('inventory_tree', tempId, {
      corp_id: corpId,
      parent_id: parentId,
      name: nextNode.name,
      burmese_name: burmeseName,
      quantity: 0,
      leaf: 1,
    });

    if (parentNode && Number(parentNode.leaf) !== 0) {
      onQueueUpdate?.(
        'inventory_tree',
        parentNode.id,
        {
          corp_id: parentNode.corp_id,
          parent_id: parentNode.parent_id,
          name: parentNode.name,
          burmese_name: parentNode.burmese_name ?? null,
          quantity: parentNode.quantity ?? 0,
          leaf: parentNode.leaf ?? 1,
        },
        {
          corp_id: parentNode.corp_id,
          parent_id: parentNode.parent_id,
          name: parentNode.name,
          burmese_name: parentNode.burmese_name ?? null,
          quantity: parentNode.quantity ?? 0,
          leaf: 0,
        }
      );
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={styles.corpListPane}
        style={{ width: `${listWidth}px` }}
        aria-hidden={isListCollapsed}
      >
        {!isListCollapsed && (
          <CorpList
            showAddCorpForm={showAddCorpForm}
            setShowAddCorpForm={setShowAddCorpForm}
            corps={visibleCorps}
            onAddCorp={onAddCorp}
            selectedCorp={selectedCorp}
            onSelectCorp={setSelectedCorpId}
            onRenameCorp={handleRenameCorp}
            onDeleteCorp={handleDeleteCorp}
            onAddTransaction={handleInsertTransaction}
            globalTree={globalTree}
            languageMode={languageMode}
          />
        )}
      </div>

      <button
        type="button"
        className={`${styles.splitter} ${isDraggingDivider ? styles.splitterActive : ''}`}
        onPointerDown={() => setIsDraggingDivider(true)}
        aria-label={isListCollapsed ? 'Expand corporation list' : 'Resize corporation list'}
      >
        <span className={styles.splitterHandle} />
      </button>

      <CorpDetails
        selectedCorp={selectedCorp}
        globalTree={globalTree}
        assets={assets}
        linkTable={linkTable}
        paymentTable={paymentTable}
        onUpdateTransaction={handleUpdateTransaction}
        onDeleteTransaction={handleDeleteTransaction}
        onInsertLocalTreeNode={handleInsertLocalTreeNode}
        onRenameLocalTreeNode={handleRenameLocalTreeNode}
        onInsertInventoryTreeNode={handleInsertInventoryTreeNode}
        languageMode={languageMode}
        onToggleLanguageMode={() =>
          setLanguageMode((prev) =>
            prev === LANGUAGE_MODES.ENG ? LANGUAGE_MODES.BUR : LANGUAGE_MODES.ENG
          )
        }
      />
    </div>
  );
}

export default Sheets;
