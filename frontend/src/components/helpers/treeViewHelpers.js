import {
  buildChildrenMap,
  buildTreeScope,
  filterTransactionsByScope,
  getDescendantIds,
  normalizeRows,
} from './treeHelpers';
import { getLocalizedName, LANGUAGE_MODES } from './nameLocalization';

export const VIEW_MODES = {
  LIVE: 'live',
  TRASH: 'trash',
};

export function buildNodePathLabel(node, nodeMap) {
  if (!node) return '';

  const parts = [];
  let current = node;

  while (current) {
    parts.push(current.label);
    current = current.parentKey != null ? nodeMap.get(current.parentKey) : null;
  }

  return parts.join(' ');
}

export function filterTransactionsByViewMode(transactions = [], viewMode) {
  if (viewMode === VIEW_MODES.TRASH) {
    return transactions.filter((tx) => Number(tx.soft_delete) === 1);
  }

  return transactions.filter((tx) => Number(tx.soft_delete) !== 1);
}

export function buildAssembledTree(
  globalTree = [],
  localTree = [],
  { languageMode = LANGUAGE_MODES.ENG } = {}
) {
  const liveGlobalRows = normalizeRows(globalTree);
  const liveLocalRows = normalizeRows(localTree);

  const globalChildrenByParent = buildChildrenMap(liveGlobalRows, 'parent_id');
  const localChildrenByParent = buildChildrenMap(liveLocalRows, 'parent_id');

  const nodes = [];
  const nodeMap = new Map();
  const childrenByKey = new Map();

  function pushNode(node) {
    nodes.push(node);
    nodeMap.set(node.key, node);

    if (!childrenByKey.has(node.parentKey)) {
      childrenByKey.set(node.parentKey, []);
    }

    childrenByKey.get(node.parentKey).push(node);
  }

  function walkLocal(localRow, parentKey, depth, rootGlobalId) {
    const node = {
      key: `l-${localRow.id}`,
      parentKey,
      label: getLocalizedName(localRow, languageMode) || `ID ${localRow.id}`,
      depth,
      source: 'local',
      globalId: localRow.global_parent_id ?? rootGlobalId ?? null,
      localId: localRow.id,
    };

    pushNode(node);

    const children = localChildrenByParent.get(localRow.id) || [];
    children.forEach((child) => {
      walkLocal(child, node.key, depth + 1, node.globalId);
    });
  }

  function walkGlobal(globalRow, parentKey = null, depth = 1, rootGlobalId = null) {
    const nextRootGlobalId = rootGlobalId ?? globalRow.id;

    const node = {
      key: `g-${globalRow.id}`,
      parentKey,
      label: getLocalizedName(globalRow, languageMode) || `ID ${globalRow.id}`,
      depth,
      source: 'global',
      globalId: globalRow.id,
      localId: null,
      rootGlobalId: nextRootGlobalId,
    };

    pushNode(node);

    const globalChildren = globalChildrenByParent.get(globalRow.id) || [];
    globalChildren.forEach((child) => {
      walkGlobal(child, node.key, depth + 1, nextRootGlobalId);
    });

    const linkedLocalRoots = liveLocalRows.filter(
      (row) => row.parent_id == null && row.global_parent_id === globalRow.id
    );

    linkedLocalRoots.forEach((localRow) => {
      walkLocal(localRow, node.key, depth + 1, nextRootGlobalId);
    });
  }

  const globalRoots = globalChildrenByParent.get(null) || [];
  globalRoots.forEach((globalRoot) => walkGlobal(globalRoot, null, 1, globalRoot.id));

  return {
    nodes,
    nodeMap,
    childrenByKey,
  };
}

export function buildLayerOptions(childrenByKey = new Map(), parentKey = null) {
  return (childrenByKey.get(parentKey) || []).map((node) => ({
    key: node.key,
    label: node.label,
    depth: 0,
  }));
}

export function getNodeScope(node, globalTree = [], localTree = []) {
  if (!node) {
    return null;
  }

  if (node.source === 'global') {
    return buildTreeScope({
      globalTree,
      localTree,
      globalId: node.globalId,
      includeLinkedLocalRowsFromGlobal: true,
    });
  }

  const localIdSet = getDescendantIds(localTree, node.localId, {
    parentKey: 'parent_id',
    includeRoot: true,
  });

  return {
    globalRoot: null,
    localRoot: null,
    globalIdSet: new Set(),
    localIdSet,
  };
}

export function filterTransactionsByTreeSelection({
  transactions = [],
  selectedNode = null,
  globalTree = [],
  localTree = [],
  includeSoftDeleted = false,
}) {
  if (!selectedNode) {
    return includeSoftDeleted
      ? transactions.filter((tx) => Number(tx.soft_delete) === 1)
      : transactions.filter((tx) => Number(tx.soft_delete) !== 1);
  }

  const scope = getNodeScope(selectedNode, globalTree, localTree);

  return filterTransactionsByScope(transactions, scope, {
    includeSoftDeleted,
    requireLocalMatch: selectedNode.source === 'local',
  });
}

export function buildIdRowMap(rows = [], { includeSoftDeleted = false } = {}) {
  return buildRowMap(rows, { includeSoftDeleted });
}

export function getTreeRowNameById(rows = [], id, options = {}) {
  if (id == null) return '';
  const rowMap = buildRowMap(rows, options);
  return rowMap.get(id)?.name || '';
}
