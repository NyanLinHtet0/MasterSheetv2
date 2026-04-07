import { useMemo, useState } from 'react';
import currency from 'currency.js';
import styles from './corp_details.module.css';
import TransactionTable from '../components/transaction_table/TransactionTable';
import ChangeViewControl from '../components/change_view/ChangeViewControl';
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
  VIEW_MODES,
  buildAssembledTree,
  buildLayerOptions,
  buildNodePathLabel,
  filterTransactionsByTreeSelection,
  filterTransactionsByViewMode,
} from '../components/helpers/treeViewHelpers';

function CorpDetails({
  selectedCorp,
  globalTree = [],
  onUpdateTransaction,
  onDeleteTransaction,
  onInsertLocalTreeNode,
  onRenameLocalTreeNode,
}) {
  const [viewMode, setViewMode] = useState(VIEW_MODES.LIVE);
  const [isEditTableMode, setIsEditTableMode] = useState(false);
  const [selectedLayer1Key, setSelectedLayer1Key] = useState(null);
  const [selectedLayer2Key, setSelectedLayer2Key] = useState(null);
  const [selectedLayer3Key, setSelectedLayer3Key] = useState(null);

  const safeCorp = selectedCorp || {};
  const localTree = safeCorp.local_tree || [];
  const transactions = safeCorp.transactions || [];
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

  const rate =
    isForeign && Number(safeCorp.current_foreign)
      ? Math.abs(
          Number(safeCorp.current_balance || 0) /
            Number(safeCorp.current_foreign || 0)
        ).toLocaleString(undefined, { maximumFractionDigits: 2 })
      : '-';

  const assembledTree = useMemo(() => {
    return buildAssembledTree(globalTree, localTree);
  }, [globalTree, localTree]);

  const liveGlobalTree = useMemo(() => normalizeRows(globalTree), [globalTree]);
  const liveLocalTree = useMemo(() => normalizeRows(localTree), [localTree]);
  const globalRowMap = useMemo(() => buildRowMap(liveGlobalTree), [liveGlobalTree]);
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

  const layer1Options = useMemo(() => {
    return buildLayerOptions(assembledTree.childrenByKey, null).map((option) => {
      const node = assembledTree.nodeMap.get(option.key);
      return {
        ...option,
        label: buildNodePathLabel(node, assembledTree.nodeMap),
      };
    });
  }, [assembledTree]);

  const layer2Options = useMemo(() => {
    let baseOptions = [];

    if (selectedLayer1Key != null) {
      baseOptions = buildLayerOptions(assembledTree.childrenByKey, selectedLayer1Key);
    } else {
      baseOptions = assembledTree.nodes
        .filter((node) => node.depth === 2)
        .map((node) => ({
          key: node.key,
          label: node.label,
          depth: 0,
        }));
    }

    return baseOptions.map((option) => {
      const node = assembledTree.nodeMap.get(option.key);
      return {
        ...option,
        label: buildNodePathLabel(node, assembledTree.nodeMap),
      };
    });
  }, [assembledTree, selectedLayer1Key]);

  const layer3Options = useMemo(() => {
    let baseOptions = [];

    if (selectedLayer2Key != null) {
      baseOptions = buildLayerOptions(assembledTree.childrenByKey, selectedLayer2Key);
    } else if (selectedLayer1Key != null) {
      const childLayer2Nodes = assembledTree.childrenByKey.get(selectedLayer1Key) || [];
      baseOptions = childLayer2Nodes.flatMap((node) =>
        buildLayerOptions(assembledTree.childrenByKey, node.key)
      );
    } else {
      baseOptions = assembledTree.nodes
        .filter((node) => node.depth === 3)
        .map((node) => ({
          key: node.key,
          label: node.label,
          depth: 0,
        }));
    }

    return baseOptions.map((option) => {
      const node = assembledTree.nodeMap.get(option.key);
      return {
        ...option,
        label: buildNodePathLabel(node, assembledTree.nodeMap),
      };
    });
  }, [assembledTree, selectedLayer1Key, selectedLayer2Key]);

  const filteredTransactions = useMemo(() => {
    const baseRows = filterTransactionsByViewMode(transactions, viewMode);

    const deepestSelectedNode =
      selectedLayer3Node || selectedLayer2Node || selectedLayer1Node || null;

    return filterTransactionsByTreeSelection({
      transactions: baseRows,
      selectedNode: deepestSelectedNode,
      globalTree,
      localTree,
      includeSoftDeleted: viewMode === VIEW_MODES.TRASH,
    });
  }, [
    transactions,
    viewMode,
    globalTree,
    localTree,
    selectedLayer1Node,
    selectedLayer2Node,
    selectedLayer3Node,
  ]);

  const visibleTransactions = useMemo(() => {
    return filteredTransactions.map((tx) =>
      toDisplayTransaction(tx, { isInverse, isForeign })
    );
  }, [filteredTransactions, isInverse, isForeign]);

  const displayTransactions = useMemo(() => {
    return attachTransactionTagNames(
      filteredTransactions.map((tx) =>
        toDisplayTransaction(tx, { isInverse, isForeign })
      ),
      globalTree,
      localTree
    );
  }, [filteredTransactions, isInverse, isForeign, globalTree, localTree]);

  const typeOptions = useMemo(() => {
    return (globalChildrenByParent.get(null) || []).map((row) => ({
      value: String(row.id),
      label: row.name || `ID ${row.id}`,
    }));
  }, [globalChildrenByParent]);

  const getGlobalOptionsByType = (typeId) => {
    if (!typeId) return [];

    return (globalChildrenByParent.get(Number(typeId)) || []).map((row) => ({
      value: String(row.id),
      label: row.name || `ID ${row.id}`,
    }));
  };

  const getLocalOptionsByGlobal = (globalId) => {
    if (!globalId) return [];

    const rows = [];
    const roots = liveLocalTree.filter(
      (row) => row.parent_id == null && row.global_parent_id === Number(globalId)
    );

    const walk = (node, prefix = '') => {
      const nextLabel = prefix ? `${prefix} > ${node.name || `ID ${node.id}`}` : (node.name || `ID ${node.id}`);
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
    const ancestors = Array.from(
      getAncestorIds(liveGlobalTree, Number(globalId), { includeSelf: true })
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

  const handleAddLayer3 = (name) => {
    if (!selectedCorp || !selectedLayer2Node || !onInsertLocalTreeNode) {
      return;
    }

    if (selectedLayer2Node.source === 'global') {
      onInsertLocalTreeNode({
        corpId: selectedCorp.id,
        name,
        parentId: null,
        globalParentId: selectedLayer2Node.globalId,
      });
      return;
    }

    onInsertLocalTreeNode({
      corpId: selectedCorp.id,
      name,
      parentId: selectedLayer2Node.localId,
      globalParentId: selectedLayer2Node.globalId ?? null,
    });
  };

  const handleRenameLayer3 = (layer3Key, nextName) => {
    if (!selectedCorp || !onRenameLocalTreeNode) {
      return;
    }

    const node = assembledTree.nodeMap.get(layer3Key);

    if (!node || node.source !== 'local') {
      return;
    }

    onRenameLocalTreeNode({
      corpId: selectedCorp.id,
      localTreeId: node.localId,
      name: nextName,
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

  const layer3OptionsWithEditState = layer3Options.map((option) => {
    const node = assembledTree.nodeMap.get(option.key);

    return {
      ...option,
      editable: node?.source === 'local',
    };
  });

  if (!selectedCorp) {
    return (
      <div className={styles.corpDetails}>
        <h2>Corp Details</h2>
        <p>No corporation selected.</p>
      </div>
    );
  }

  return (
    <div className={styles.corpDetails}>
      <div className={styles.headerbar}>
        <h2>{safeCorp.name}</h2>
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

        <ChangeViewControl
          viewMode={viewMode}
          setViewMode={setViewMode}
          layer1Options={layer1Options}
          selectedLayer1Key={selectedLayer1Key}
          onSelectLayer1={handleSelectLayer1}
          layer2Options={layer2Options}
          selectedLayer2Key={selectedLayer2Key}
          onSelectLayer2={handleSelectLayer2}
          layer3Options={layer3OptionsWithEditState}
          selectedLayer3Key={selectedLayer3Key}
          onSelectLayer3={handleSelectLayer3}
          isEditTableMode={isEditTableMode}
          onToggleEditTableMode={() => setIsEditTableMode((prev) => !prev)}
          onAddLayer3={handleAddLayer3}
          onRenameLayer3={handleRenameLayer3}
        />
      </div>

      <div className={styles.tablecontainer}>
        <div className={styles.tablecontent}>
          <TransactionTable
            title={`Transactions - ${titleParts.reverse().join('  ')}`}
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
          />
        </div>
      </div>
    </div>
  );
}

export default CorpDetails;
