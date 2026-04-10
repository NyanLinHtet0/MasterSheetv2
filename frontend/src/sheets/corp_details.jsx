import { useMemo, useState } from 'react';
import currency from 'currency.js';
import styles from './corp_details.module.css';
import TransactionTable from '../components/transaction_table/TransactionTable';
import ItemManagementOverlay from '../components/item_management/ItemManagementOverlay';
import {
  attachTransactionTagNames,
  buildChildrenMap,
  buildRowMap,
  getAncestorIds,
  normalizeRows,
} from '../components/helpers/treeHelpers';
import {
  normalizeBool,
  toDisplayTransaction,
} from '../components/transaction_table/transactionTableHelpers';
import {
  buildAssembledTree,
  buildLayerOptions,
  filterTransactionsByTreeSelection,
} from '../components/helpers/treeViewHelpers';
import { getLocalizedName, LANGUAGE_MODES } from '../components/helpers/nameLocalization';

function CorpDetails({
  selectedCorp,
  globalTree = [],
  linkTable = [],
  paymentTable = [],
  onUpdateTransaction,
  onDeleteTransaction,
  onInsertLocalTreeNode,
  onInsertInventoryTreeNode,
  languageMode = LANGUAGE_MODES.ENG,
  onToggleLanguageMode,
}) {
  const [selectedLayer1Key, setSelectedLayer1Key] = useState(null);
  const [selectedLayer2Key, setSelectedLayer2Key] = useState(null);
  const [selectedLayer3Key, setSelectedLayer3Key] = useState(null);
  const [showItemManagement, setShowItemManagement] = useState(false);

  const safeCorp = selectedCorp || {};
  const localTree = safeCorp.local_tree || [];
  const transactions = safeCorp.transactions || [];
  const inventoryTree = safeCorp.inventory_tree || [];
  const isInverse = normalizeBool(safeCorp.inverse);
  const isForeign = normalizeBool(safeCorp.is_foreign);

  const currentBalance = currency(safeCorp.current_balance || 0, {
    symbol: '',
    precision: 0,
  })
    .multiply(isInverse ? -1 : 1)
    .format();

  const currentForeign = currency(safeCorp.current_foreign || 0, {
    symbol: '',
    precision: 2,
  })
    .multiply(isInverse ? -1 : 1)
    .format();

  const foreignLabel =
    safeCorp.name?.split('ဝယ်စာရင်း')[0]?.trim() || 'Foreign';

  const rate = (() => {
    if (!isForeign) return '-';

    const foreignBalance = currency(safeCorp.current_foreign || 0).value;
    if (!foreignBalance) return '-';

    const derivedRate = currency(safeCorp.current_balance || 0)
      .divide(foreignBalance)
      .value;

    return Math.abs(derivedRate).toLocaleString(undefined, { maximumFractionDigits: 2 });
  })();

  const assembledTree = useMemo(() => {
    return buildAssembledTree(globalTree, localTree, { languageMode });
  }, [globalTree, localTree, languageMode]);

  const liveGlobalTree = useMemo(() => normalizeRows(globalTree), [globalTree]);
  const liveLocalTree = useMemo(() => normalizeRows(localTree), [localTree]);
  const globalRowMap = useMemo(() => buildRowMap(liveGlobalTree), [liveGlobalTree]);
  const localRowMap = useMemo(() => buildRowMap(liveLocalTree), [liveLocalTree]);
  const localChildrenByParent = useMemo(
    () => buildChildrenMap(liveLocalTree, 'parent_id'),
    [liveLocalTree]
  );
  const globalChildrenByParent = useMemo(
    () => buildChildrenMap(liveGlobalTree, 'parent_id'),
    [liveGlobalTree]
  );

  const selectedLayer1Node = assembledTree.nodeMap.get(selectedLayer1Key) || null;
  const selectedLayer2Node = assembledTree.nodeMap.get(selectedLayer2Key) || null;
  const selectedLayer3Node = assembledTree.nodeMap.get(selectedLayer3Key) || null;

  const categoryRootNodes = useMemo(
    () => buildLayerOptions(assembledTree.childrenByKey, null).map((row) => assembledTree.nodeMap.get(row.key)).filter(Boolean),
    [assembledTree]
  );

  const layer1Options = categoryRootNodes.map((node) => ({
    key: node.key,
    label: node.label,
  }));

  const layer2Options = useMemo(() => {
    if (!selectedLayer1Key) return [];
    return buildLayerOptions(assembledTree.childrenByKey, selectedLayer1Key)
      .map((row) => assembledTree.nodeMap.get(row.key))
      .filter(Boolean)
      .map((node) => ({ key: node.key, label: node.label }));
  }, [assembledTree, selectedLayer1Key]);

  const layer3Options = useMemo(() => {
    if (!selectedLayer2Key) return [];
    return buildLayerOptions(assembledTree.childrenByKey, selectedLayer2Key)
      .map((row) => assembledTree.nodeMap.get(row.key))
      .filter(Boolean)
      .map((node) => ({ key: node.key, label: node.label }));
  }, [assembledTree, selectedLayer2Key]);

  const filteredTransactions = useMemo(() => {
    const deepestSelectedNode =
      selectedLayer3Node || selectedLayer2Node || selectedLayer1Node || null;

    return filterTransactionsByTreeSelection({
      transactions,
      selectedNode: deepestSelectedNode,
      globalTree,
      localTree,
      includeSoftDeleted: false,
    });
  }, [
    transactions,
    globalTree,
    localTree,
    selectedLayer1Node,
    selectedLayer2Node,
    selectedLayer3Node,
  ]);

  const displayTransactions = useMemo(() => {
    const withTags = attachTransactionTagNames(
      filteredTransactions.map((tx) =>
        toDisplayTransaction(tx, { isInverse, isForeign })
      ),
      globalTree,
      localTree,
      { languageMode }
    );

    const inventoryNameById = new Map(
      inventoryTree.map((row) => [row.id, getLocalizedName(row, languageMode) || row.name || `ID ${row.id}`])
    );
    const linkTypeNameById = new Map(
      linkTable.map((row) => [row.id, getLocalizedName(row, languageMode) || row.type_name || `ID ${row.id}`])
    );
    const paymentModeNameById = new Map(
      paymentTable.map((row) => [row.id, getLocalizedName(row, languageMode) || row.type_name || `ID ${row.id}`])
    );
    const corpTxIdSet = new Set(withTags.map((tx) => tx.id));

    return withTags.map((tx) => ({
      ...tx,
      inventory_item_name: tx.inven_id != null ? (inventoryNameById.get(tx.inven_id) || '-') : '-',
      inventory_flow_label:
        Number(tx.inven_flow) === 1
          ? 'In'
          : Number(tx.inven_flow) === -1
            ? 'Out'
            : '-',
      link_type_name: tx.link_type != null ? (linkTypeNameById.get(tx.link_type) || '-') : '-',
      payment_mode_name: tx.payment_mode != null ? (paymentModeNameById.get(tx.payment_mode) || '-') : '-',
      link_tx_display:
        tx.link_tx_id == null
          ? '-'
          : corpTxIdSet.has(tx.link_tx_id)
            ? String(tx.link_tx_id)
            : `Invalid (${tx.link_tx_id})`,
    }));
  }, [
    filteredTransactions,
    isInverse,
    isForeign,
    globalTree,
    localTree,
    languageMode,
    inventoryTree,
    linkTable,
    paymentTable,
  ]);

  const inventoryLeafOptions = useMemo(() => {
    const rows = normalizeRows(inventoryTree);
    const rowMap = buildRowMap(rows);

    const makePath = (node) => {
      const parts = [];
      let current = node;
      let guard = 0;

      while (current && guard < 1000) {
        parts.unshift(getLocalizedName(current, languageMode) || current.name || `ID ${current.id}`);
        current = current.parent_id != null ? rowMap.get(current.parent_id) : null;
        guard += 1;
      }

      return parts.join(' > ');
    };

    return rows
      .filter((row) => Number(row.leaf) === 1)
      .map((row) => ({
        value: String(row.id),
        label: makePath(row),
        leafName: getLocalizedName(row, languageMode) || row.name || '',
      }));
  }, [inventoryTree, languageMode]);

  const typeOptions = useMemo(() => {
    return (globalChildrenByParent.get(null) || []).map((row) => ({
      value: String(row.id),
      label: getLocalizedName(row, languageMode) || `ID ${row.id}`,
    }));
  }, [globalChildrenByParent, languageMode]);

  const getGlobalOptionsByType = (typeId) => {
    if (!typeId) return [];
    const typeNodeKey = `g-${Number(typeId)}`;
    const layer2Nodes = assembledTree.childrenByKey.get(typeNodeKey) || [];

    return layer2Nodes.map((node) => ({
      value:
        node.source === 'local'
          ? `l:${node.localId}:${node.globalId ?? ''}`
          : `g:${node.globalId}`,
      label: node.label,
      globalId: node.globalId ?? null,
      localId: node.localId ?? null,
    }));
  };

  const getLocalOptionsByGlobal = (globalSelection) => {
    if (!globalSelection) return [];

    const rows = [];
    let roots = [];

    if (String(globalSelection).startsWith('g:')) {
      const [, globalId] = String(globalSelection).split(':');
      roots = liveLocalTree.filter(
        (row) => row.parent_id == null && row.global_parent_id === Number(globalId)
      );
    } else if (String(globalSelection).startsWith('l:')) {
      const [, localId] = String(globalSelection).split(':');
      roots = localChildrenByParent.get(Number(localId)) || [];
    }

    const walk = (node, prefix = '') => {
      const nodeLabel = getLocalizedName(node, languageMode) || `ID ${node.id}`;
      const nextLabel = prefix ? `${prefix} > ${nodeLabel}` : nodeLabel;
      rows.push({
        value: String(node.id),
        label: nextLabel,
      });

      (localChildrenByParent.get(node.id) || []).forEach((child) => walk(child, nextLabel));
    };

    roots.forEach((root) => walk(root));

    return rows;
  };

  const resolveTypeId = (globalId) => {
    if (globalId == null) return null;
    const normalizedGlobalId = Number(globalId);
    const localRow = localRowMap.get(normalizedGlobalId);
    const effectiveGlobalId = localRow?.global_parent_id ?? normalizedGlobalId;

    const ancestors = Array.from(
      getAncestorIds(liveGlobalTree, Number(effectiveGlobalId), { includeSelf: true })
    );

    const typeAncestor = ancestors.find(
      (ancestorId) => (globalRowMap.get(ancestorId)?.parent_id ?? null) == null
    );

    return typeAncestor ?? null;
  };

  const handleSelectLayer1 = (nextKey) => {
    const resolvedKey = nextKey === selectedLayer1Key ? null : nextKey;

    setSelectedLayer1Key(resolvedKey);
    setSelectedLayer2Key(null);
    setSelectedLayer3Key(null);
  };

  const handleSelectLayer2 = (nextKey) => {
    const resolvedKey = nextKey === selectedLayer2Key ? null : nextKey;
    const nextNode = assembledTree.nodeMap.get(resolvedKey) || null;

    setSelectedLayer2Key(resolvedKey);
    setSelectedLayer3Key(null);

    if (!nextNode) {
      return;
    }

    if (selectedLayer1Key == null) {
      setSelectedLayer1Key(nextNode.parentKey || null);
    }
  };

  const handleSelectLayer3 = (nextKey) => {
    const resolvedKey = nextKey === selectedLayer3Key ? null : nextKey;
    const nextNode = assembledTree.nodeMap.get(resolvedKey) || null;

    setSelectedLayer3Key(resolvedKey);

    if (!nextNode) {
      return;
    }

    if (selectedLayer2Key == null) {
      setSelectedLayer2Key(nextNode.parentKey || null);
    }

    if (selectedLayer1Key == null) {
      const parentNode = assembledTree.nodeMap.get(nextNode.parentKey) || null;
      setSelectedLayer1Key(parentNode?.parentKey || null);
    }
  };

  const handleAddCategoryNode = ({ name, burmeseName = null, parentKey }) => {
    if (!selectedCorp || !parentKey || !onInsertLocalTreeNode) {
      return;
    }

    const parentNode = assembledTree.nodeMap.get(parentKey) || null;
    if (!parentNode) return;

    if (parentNode.source === 'global') {
      onInsertLocalTreeNode({
        corpId: selectedCorp.id,
        name,
        burmeseName,
        parentId: null,
        globalParentId: parentNode.globalId ?? null,
      });
      return;
    }

    onInsertLocalTreeNode({
      corpId: selectedCorp.id,
      name,
      burmeseName,
      parentId: parentNode.localId,
      globalParentId: parentNode.globalId ?? null,
    });
  };


  const titleParts = [];

  if (selectedLayer1Node) {
    titleParts.push(selectedLayer1Node.label);
  }

  if (selectedLayer2Node) {
    titleParts.push(selectedLayer2Node.label);
  }

  if (selectedLayer3Node) {
    titleParts.push(selectedLayer3Node.label);
  }

  if (!selectedCorp) {
    return (
      <div className={styles.corpDetails}>
        <h2>Corp Details</h2>
        <p>No corporation selected.</p>
      </div>
    );
  }

  const sum_data = (displayTransactions) => {
    return displayTransactions.reduce((subTotal, tx) => subTotal.add(tx.total_mmk ?? 0), currency(0));
  };
  const sum_qty = (displayTransactions) => {
    return displayTransactions.reduce((subTotal, tx) => subTotal.add(tx.inven_qty ?? 0), currency(0));
  };

  return (
    <div className={styles.corpDetails}>
      <div className={styles.headerbar}>
        <h2>
          {safeCorp.name}
          {isInverse ? ' (Inverse)' : ''}
        </h2>
        <button
          type="button"
          className={styles.settingsButton}
          onClick={() => setShowItemManagement(true)}
          title="Item management"
        >
          ⚙
        </button>
      </div>

      <div className={styles.balanceRow}>
        <div className={styles.balanceInfo}>
          <span className={styles.balanceText}>Balance: {currentBalance} MMK</span>

          {isForeign && (
            <>
              <span className={styles.divider}>|</span>
              <span className={styles.balanceText}>
                {foreignLabel} Balance: {currentForeign}
              </span>
              <span className={styles.divider}>|</span>
              <span className={styles.rateText}>Rate: {rate}</span>
            </>
          )}
        </div>

      </div>

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
            title={`${titleParts.reverse().join(' ') + ' Transactions: '+currency(sum_data(displayTransactions).value,{precision:0,symbol: '',}).format()} MMK (${sum_qty(displayTransactions).value} items)`}
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
          />
        </div>
      </div>

      {showItemManagement && (
        <ItemManagementOverlay
          corp={safeCorp}
          onClose={() => setShowItemManagement(false)}
          onAddItem={onInsertInventoryTreeNode}
          categoryRootNodes={categoryRootNodes}
          categoryChildrenByKey={assembledTree.childrenByKey}
          categoryNodeMap={assembledTree.nodeMap}
          onAddCategoryNode={handleAddCategoryNode}
          languageMode={languageMode}
          onToggleLanguageMode={onToggleLanguageMode}
        />
      )}
    </div>
  );
}

export default CorpDetails;
