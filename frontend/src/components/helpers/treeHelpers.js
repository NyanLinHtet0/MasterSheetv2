// src/components/helpers/treeHelpers.js

import currency from 'currency.js';
import { getLocalizedName, LANGUAGE_MODES } from './nameLocalization';

function isLiveRow(row) {
  return Number(row?.soft_delete) !== 1;
}

function normalizeRows(rows = [], { includeSoftDeleted = false } = {}) {
  if (includeSoftDeleted) return rows;
  return rows.filter(isLiveRow);
}

function toIdSet(values = []) {
  return new Set(values.filter((value) => value != null));
}

function buildChildrenMap(
  rows = [],
  parentKey = 'parent_id',
  { includeSoftDeleted = false } = {}
) {
  const liveRows = normalizeRows(rows, { includeSoftDeleted });
  const childrenByParent = new Map();

  for (const row of liveRows) {
    const parentId = row[parentKey] ?? null;

    if (!childrenByParent.has(parentId)) {
      childrenByParent.set(parentId, []);
    }

    childrenByParent.get(parentId).push(row);
  }

  return childrenByParent;
}

function buildRowMap(rows = [], { includeSoftDeleted = false } = {}) {
  const liveRows = normalizeRows(rows, { includeSoftDeleted });
  const rowMap = new Map();

  for (const row of liveRows) {
    rowMap.set(row.id, row);
  }

  return rowMap;
}

function findNodeByName(
  rows = [],
  targetName = '',
  { includeSoftDeleted = false } = {}
) {
  const normalizedTarget = String(targetName || '').trim().toLowerCase();

  if (!normalizedTarget) return null;

  return (
    normalizeRows(rows, { includeSoftDeleted }).find((row) => {
      return (
        String(row.name || '').trim().toLowerCase() === normalizedTarget
      );
    }) || null
  );
}

function getDescendantIds(
  rows = [],
  rootId,
  {
    parentKey = 'parent_id',
    includeRoot = true,
    includeSoftDeleted = false,
  } = {}
) {
  if (rootId == null) return new Set();

  const childrenByParent = buildChildrenMap(rows, parentKey, {
    includeSoftDeleted,
  });
  const visited = new Set();
  const stack = [rootId];

  while (stack.length > 0) {
    const currentId = stack.pop();

    if (visited.has(currentId)) continue;
    visited.add(currentId);

    const children = childrenByParent.get(currentId) || [];

    for (const child of children) {
      stack.push(child.id);
    }
  }

  if (!includeRoot) {
    visited.delete(rootId);
  }

  return visited;
}

function getAncestorIds(
  rows = [],
  startId,
  {
    parentKey = 'parent_id',
    includeSelf = true,
    includeSoftDeleted = false,
  } = {}
) {
  if (startId == null) return new Set();

  const rowMap = buildRowMap(rows, { includeSoftDeleted });
  const visited = new Set();

  let currentId = includeSelf
    ? startId
    : rowMap.get(startId)?.[parentKey] ?? null;

  while (currentId != null && !visited.has(currentId)) {
    visited.add(currentId);
    currentId = rowMap.get(currentId)?.[parentKey] ?? null;
  }

  return visited;
}

function getGlobalRootScopeByName(globalTree = [], globalName = '', options = {}) {
  const globalRoot = findNodeByName(globalTree, globalName, options);

  if (!globalRoot) {
    return {
      root: null,
      idSet: new Set(),
    };
  }

  return {
    root: globalRoot,
    idSet: getDescendantIds(globalTree, globalRoot.id, {
      parentKey: 'parent_id',
      includeRoot: true,
      includeSoftDeleted: options.includeSoftDeleted,
    }),
  };
}

function getGlobalRootScopeById(globalTree = [], globalId, options = {}) {
  if (globalId == null) {
    return {
      root: null,
      idSet: new Set(),
    };
  }

  const rowMap = buildRowMap(globalTree, options);
  const globalRoot = rowMap.get(globalId) || null;

  return {
    root: globalRoot,
    idSet: getDescendantIds(globalTree, globalId, {
      parentKey: 'parent_id',
      includeRoot: true,
      includeSoftDeleted: options.includeSoftDeleted,
    }),
  };
}

function getLocalRowsForGlobalIds(
  localTree = [],
  globalIdSet = new Set(),
  { includeSoftDeleted = false } = {}
) {
  const liveRows = normalizeRows(localTree, { includeSoftDeleted });

  if (!globalIdSet || globalIdSet.size === 0) return [];

  return liveRows.filter((row) => globalIdSet.has(row.global_parent_id));
}

function getLocalScopeByName(localTree = [], localName = '', options = {}) {
  const localRoot = findNodeByName(localTree, localName, options);

  if (!localRoot) {
    return {
      root: null,
      idSet: new Set(),
    };
  }

  return {
    root: localRoot,
    idSet: getDescendantIds(localTree, localRoot.id, {
      parentKey: 'parent_id',
      includeRoot: true,
      includeSoftDeleted: options.includeSoftDeleted,
    }),
  };
}

function getLocalScopeById(localTree = [], localId, options = {}) {
  if (localId == null) {
    return {
      root: null,
      idSet: new Set(),
    };
  }

  const rowMap = buildRowMap(localTree, options);
  const localRoot = rowMap.get(localId) || null;

  return {
    root: localRoot,
    idSet: getDescendantIds(localTree, localId, {
      parentKey: 'parent_id',
      includeRoot: true,
      includeSoftDeleted: options.includeSoftDeleted,
    }),
  };
}

function buildTreeScope({
  globalTree = [],
  localTree = [],
  globalId = null,
  globalName = '',
  localId = null,
  localName = '',
  includeSoftDeleted = false,
  includeLinkedLocalRowsFromGlobal = true,
} = {}) {
  let globalScope = { root: null, idSet: new Set() };

  if (globalId != null) {
    globalScope = getGlobalRootScopeById(globalTree, globalId, {
      includeSoftDeleted,
    });
  } else if (globalName) {
    globalScope = getGlobalRootScopeByName(globalTree, globalName, {
      includeSoftDeleted,
    });
  }

  let localScope = { root: null, idSet: new Set() };

  if (localId != null) {
    localScope = getLocalScopeById(localTree, localId, { includeSoftDeleted });
  } else if (localName) {
    localScope = getLocalScopeByName(localTree, localName, {
      includeSoftDeleted,
    });
  } else if (includeLinkedLocalRowsFromGlobal && globalScope.idSet.size > 0) {
    const localRowsLinkedToGlobal = getLocalRowsForGlobalIds(
      localTree,
      globalScope.idSet,
      { includeSoftDeleted }
    );

    localScope = {
      root: null,
      idSet: toIdSet(localRowsLinkedToGlobal.map((row) => row.id)),
    };
  }

  return {
    globalRoot: globalScope.root,
    localRoot: localScope.root,
    globalIdSet: globalScope.idSet,
    localIdSet: localScope.idSet,
  };
}

function matchesTreeScope(
  tx,
  scope,
  {
    includeSoftDeleted = false,
    requireLocalMatch = false,
  } = {}
) {
  if (!tx) return false;

  const isSoftDeleted = Number(tx.soft_delete) === 1;

  if (!includeSoftDeleted && isSoftDeleted) {
    return false;
  }

  const hasGlobalScope = scope?.globalIdSet && scope.globalIdSet.size > 0;
  const hasLocalScope = scope?.localIdSet && scope.localIdSet.size > 0;

  const matchesGlobal = hasGlobalScope
    ? scope.globalIdSet.has(tx.global_tree_id)
    : true;

  const matchesLocal = hasLocalScope
    ? scope.localIdSet.has(tx.local_tree_id)
    : !requireLocalMatch;

  if (hasGlobalScope && hasLocalScope) {
    return requireLocalMatch
      ? matchesGlobal && matchesLocal
      : matchesGlobal && (tx.local_tree_id == null || matchesLocal);
  }

  if (hasGlobalScope) return matchesGlobal;
  if (hasLocalScope) return matchesLocal;

  return true;
}

function filterTransactionsByScope(
  transactions = [],
  scope,
  options = {}
) {
  return transactions.filter((tx) => matchesTreeScope(tx, scope, options));
}

function getCurrencyValue(value) {
  return currency(value || 0).value;
}

function getCurrencyAmount(value) {
  return currency(value || 0);
}

function sumTransactions(
  transactions = [],
  {
    field = 'total_mmk',
    scope = null,
    includeSoftDeleted = false,
    requireLocalMatch = false,
    returnCurrencyObject = false,
  } = {}
) {
  const rows = scope
    ? filterTransactionsByScope(transactions, scope, {
        includeSoftDeleted,
        requireLocalMatch,
      })
    : transactions.filter(
        (tx) => includeSoftDeleted || Number(tx.soft_delete) !== 1
      );

  const total = rows.reduce((sum, tx) => {
    return sum.add(getCurrencyValue(tx?.[field]));
  }, currency(0));

  return returnCurrencyObject ? total : total.value;
}

function calculateProfit({
  transactions = [],
  globalTree = [],
  localTree = [],
  revenueGlobalName = 'Revenue',
  expenseGlobalName = 'Expense',
  includeSoftDeleted = false,
  returnCurrencyObject = false,
} = {}) {
  const revenueScope = buildTreeScope({
    globalTree,
    localTree,
    globalName: revenueGlobalName,
    includeSoftDeleted,
  });

  const expenseScope = buildTreeScope({
    globalTree,
    localTree,
    globalName: expenseGlobalName,
    includeSoftDeleted,
  });

  const revenue = sumTransactions(transactions, {
    scope: revenueScope,
    includeSoftDeleted,
    returnCurrencyObject: true,
  });

  const expenses = sumTransactions(transactions, {
    scope: expenseScope,
    includeSoftDeleted,
    returnCurrencyObject: true,
  });

  const profit = revenue.subtract(expenses);

  if (returnCurrencyObject) {
    return {
      revenue,
      expenses,
      profit,
    };
  }

  return {
    revenue: revenue.value,
    expenses: expenses.value,
    profit: profit.value,
  };
}

export {
  isLiveRow,
  normalizeRows,
  buildChildrenMap,
  buildRowMap,
  findNodeByName,
  getDescendantIds,
  getAncestorIds,
  getGlobalRootScopeByName,
  getGlobalRootScopeById,
  getLocalRowsForGlobalIds,
  getLocalScopeByName,
  getLocalScopeById,
  buildTreeScope,
  matchesTreeScope,
  filterTransactionsByScope,
  getCurrencyValue,
  getCurrencyAmount,
  sumTransactions,
  calculateProfit,
};


export function attachTransactionTagNames(
  transactions = [],
  globalTree = [],
  localTree = [],
  { includeSoftDeleted = false, languageMode = LANGUAGE_MODES.ENG } = {}
) {
  const globalMap = buildRowMap(globalTree, { includeSoftDeleted });
  const localMap = buildRowMap(localTree, { includeSoftDeleted });

  const getGlobalPathToRoot = (globalId) => {
    if (globalId == null) return [];

    const path = [];
    let current = globalMap.get(globalId) || null;
    let guard = 0;

    while (current && guard < 1000) {
      path.unshift(current);
      current = current.parent_id != null ? (globalMap.get(current.parent_id) || null) : null;
      guard += 1;
    }

    return path;
  };

  const getLocalPathToRoot = (localId) => {
    if (localId == null) return [];

    const path = [];
    let current = localMap.get(localId) || null;
    let guard = 0;

    while (current && guard < 1000) {
      path.unshift(current);
      current = current.parent_id != null ? (localMap.get(current.parent_id) || null) : null;
      guard += 1;
    }

    return path;
  };

  const getAssembledPath = (tx) => {
    if (tx?.local_tree_id != null) {
      const localPath = getLocalPathToRoot(tx.local_tree_id);
      const localRoot = localPath[0] || null;
      const globalPath = localRoot
        ? getGlobalPathToRoot(localRoot.global_parent_id)
        : getGlobalPathToRoot(tx.global_tree_id);

      return [
        ...globalPath.map((row) => ({ source: 'global', row })),
        ...localPath.map((row) => ({ source: 'local', row })),
      ];
    }

    return getGlobalPathToRoot(tx?.global_tree_id).map((row) => ({ source: 'global', row }));
  };

  return transactions.map((tx) => {
    const assembledPath = getAssembledPath(tx);

    return {
      ...tx,
      global_tag_root_name: getLocalizedName(assembledPath[0]?.row, languageMode) || '',
      global_tag_name: getLocalizedName(assembledPath[1]?.row, languageMode) || '',
      local_tag_name: getLocalizedName(assembledPath[2]?.row, languageMode) || '',
    };
  });
}
