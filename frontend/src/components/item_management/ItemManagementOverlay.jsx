import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ItemManagementOverlay.module.css';
import { buildChildrenMap, buildRowMap, normalizeRows } from '../helpers/treeHelpers';
import { getLocalizedName, LANGUAGE_MODES } from '../helpers/nameLocalization';

function getAncestorPath(node, rowMap) {
  const chain = [];
  let current = node;
  let guard = 0;

  while (current && guard < 1000) {
    chain.unshift(current);
    current = current.parent_id != null ? rowMap.get(current.parent_id) : null;
    guard += 1;
  }

  return chain;
}

function TreeNode({
  node,
  depth = 0,
  childrenByParent,
  expandedIds,
  onToggleExpand,
  onSelect,
  selectedId,
  languageMode,
  formatQty,
  onContextMenu,
}) {
  const children = childrenByParent.get(node.id) || [];
  const hasChildren = children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  return (
    <>
      <button
        type="button"
        className={`${styles.treeRow} ${isSelected ? styles.treeRowActive : ''}`}
        style={{ paddingLeft: `${10 + depth * 18}px` }}
        onClick={() => onSelect(node)}
        onContextMenu={(event) => onContextMenu(event, node)}
      >
        <span
          className={`${styles.treeChevron} ${hasChildren ? styles.treeChevronVisible : ''}`}
          onClick={(event) => {
            event.stopPropagation();
            if (hasChildren) onToggleExpand(node.id);
          }}
        >
          {hasChildren ? (isExpanded ? '▾' : '▸') : '•'}
        </span>
        <span className={styles.treeLabel}>{getLocalizedName(node, languageMode)}</span>
        <span className={styles.treeMeta}>{formatQty(node.quantity)}</span>
      </button>

      {hasChildren && isExpanded && children.map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          childrenByParent={childrenByParent}
          expandedIds={expandedIds}
          onToggleExpand={onToggleExpand}
          onSelect={onSelect}
          selectedId={selectedId}
          languageMode={languageMode}
          formatQty={formatQty}
          onContextMenu={onContextMenu}
        />
      ))}
    </>
  );
}

export default function ItemManagementOverlay({
  corp,
  onClose,
  onAddItem,
  layer1Options = [],
  selectedLayer1Key = null,
  onSelectLayer1,
  layer2Options = [],
  selectedLayer2Key = null,
  onSelectLayer2,
  onAddLayer2,
  layer3Options = [],
  selectedLayer3Key = null,
  onSelectLayer3,
  onAddLayer3,
  languageMode = LANGUAGE_MODES.ENG,
  onToggleLanguageMode,
}) {
  const [parentId, setParentId] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemBurmeseName, setNewItemBurmeseName] = useState('');
  const [newItemParentId, setNewItemParentId] = useState(null);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [tableScopeMode, setTableScopeMode] = useState('live');
  const [contextMenu, setContextMenu] = useState(null);
  const [categoryContextMenu, setCategoryContextMenu] = useState(null);
  const [categoryDraftName, setCategoryDraftName] = useState('');
  const [categoryDraftLayer, setCategoryDraftLayer] = useState(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [manualCollapsedIds, setManualCollapsedIds] = useState(new Set());

  const inventoryRows = useMemo(() => normalizeRows(corp?.inventory_tree || []), [corp]);
  const rowMap = useMemo(() => buildRowMap(inventoryRows), [inventoryRows]);
  const childrenByParent = useMemo(() => buildChildrenMap(inventoryRows, 'parent_id'), [inventoryRows]);

  const activeParentNode = useMemo(() => {
    if (parentId === '') return null;
    return rowMap.get(Number(parentId)) || null;
  }, [parentId, rowMap]);

  const activePath = useMemo(
    () => (activeParentNode ? getAncestorPath(activeParentNode, rowMap) : []),
    [activeParentNode, rowMap],
  );

  const layer1Nodes = childrenByParent.get(null) || [];
  const expandedIds = useMemo(() => {
    const set = new Set();
    activePath.forEach((node) => set.add(node.id));
    return set;
  }, [activePath]);
  const [manualExpandedIds, setManualExpandedIds] = useState(new Set());
  const effectiveExpandedIds = useMemo(() => {
    const set = new Set(expandedIds);
    manualExpandedIds.forEach((id) => set.add(id));
    manualCollapsedIds.forEach((id) => set.delete(id));
    return set;
  }, [expandedIds, manualCollapsedIds, manualExpandedIds]);

  const formatQty = (value) => Number(value ?? 0).toFixed(2);

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextName = String(newItemName || '').trim();
    if (!nextName) return;

    onAddItem?.({
      corpId: corp.id,
      parentId: newItemParentId,
      name: nextName,
      burmeseName: String(newItemBurmeseName || '').trim() || null,
    });

    setNewItemName('');
    setNewItemBurmeseName('');
    setNewItemParentId(null);
    setIsAddItemModalOpen(false);
  };

  const toggleTreeNode = (nodeId) => {
    const isExpanded = effectiveExpandedIds.has(nodeId);
    if (isExpanded) {
      setManualCollapsedIds((current) => {
        const next = new Set(current);
        next.add(nodeId);
        return next;
      });
      setManualExpandedIds((current) => {
        const next = new Set(current);
        next.delete(nodeId);
        return next;
      });
      return;
    }

    setManualCollapsedIds((current) => {
      const next = new Set(current);
      next.delete(nodeId);
      return next;
    });
    setManualExpandedIds((current) => {
      const next = new Set(current);
      next.add(nodeId);
      return next;
    });
  };

  const handleTreeContextMenu = (event, node) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      node,
    });
  };

  const handleSelectTreeNode = (node) => {
    if (parentId !== '' && Number(parentId) === node.id) {
      if ((childrenByParent.get(node.id) || []).length > 0) {
        toggleTreeNode(node.id);
      }
      setContextMenu(null);
      return;
    }

    setParentId(String(node.id));
    setContextMenu(null);
  };

  const contextMenuRef = useRef(null);
  const categoryContextMenuRef = useRef(null);

  const categoryTreeNodes = useMemo(() => {
    return layer1Options.map((layer1) => {
      const layer2Children = selectedLayer1Key === layer1.key
        ? layer2Options.map((layer2) => ({
          id: `l2-${layer2.key}`,
          key: layer2.key,
          label: layer2.label,
          layer: 2,
          children: selectedLayer2Key === layer2.key
            ? layer3Options.map((layer3) => ({
              id: `l3-${layer3.key}`,
              key: layer3.key,
              label: layer3.label,
              layer: 3,
              children: [],
            }))
            : [],
        }))
        : [];

      return {
        id: `l1-${layer1.key}`,
        key: layer1.key,
        label: layer1.label,
        layer: 1,
        children: layer2Children,
      };
    });
  }, [layer1Options, layer2Options, layer3Options, selectedLayer1Key, selectedLayer2Key]);

  const handleSelectCategoryNode = (node) => {
    if (node.layer === 1) {
      onSelectLayer1?.(node.key);
      onSelectLayer2?.(null);
      onSelectLayer3?.(null);
      return;
    }
    if (node.layer === 2) {
      onSelectLayer2?.(node.key);
      onSelectLayer3?.(null);
      return;
    }
    onSelectLayer3?.(node.key);
  };

  const openCategoryAddModal = (layer) => {
    setCategoryDraftLayer(layer);
    setCategoryDraftName('');
    setIsAddCategoryModalOpen(true);
  };

  const handleSubmitCategory = (event) => {
    event.preventDefault();
    const nextName = String(categoryDraftName || '').trim();
    if (!nextName) return;

    if (categoryDraftLayer === 2) {
      onAddLayer2?.(nextName);
    } else if (categoryDraftLayer === 3) {
      onAddLayer3?.(nextName);
    }

    setCategoryDraftName('');
    setCategoryDraftLayer(null);
    setIsAddCategoryModalOpen(false);
  };

  useEffect(() => {
    if (!contextMenu) return undefined;

    const handlePointerDownCapture = (event) => {
      if (event.button !== 0) return;
      if (contextMenuRef.current?.contains(event.target)) return;

      setContextMenu(null);
      event.preventDefault();
      event.stopPropagation();
    };

    document.addEventListener('pointerdown', handlePointerDownCapture, true);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDownCapture, true);
    };
  }, [contextMenu]);

  useEffect(() => {
    if (!categoryContextMenu) return undefined;

    const handlePointerDownCapture = (event) => {
      if (event.button !== 0) return;
      if (categoryContextMenuRef.current?.contains(event.target)) return;

      setCategoryContextMenu(null);
      event.preventDefault();
      event.stopPropagation();
    };

    document.addEventListener('pointerdown', handlePointerDownCapture, true);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDownCapture, true);
    };
  }, [categoryContextMenu]);

  const rootNodes = childrenByParent.get(null) || [];
  const addItemParentNode = newItemParentId == null ? null : rowMap.get(newItemParentId) || null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.headerRow}>
          <h3>Settings</h3>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={`${styles.modeToggleButton} ${tableScopeMode === 'live' ? styles.modeToggleButtonActive : ''}`}
              onClick={() => setTableScopeMode('live')}
            >
              Live
            </button>
            <button
              type="button"
              className={`${styles.modeToggleButton} ${tableScopeMode === 'trash' ? styles.modeToggleButtonActive : ''}`}
              onClick={() => setTableScopeMode('trash')}
            >
              Trash
            </button>
            <button
              type="button"
              className={styles.languageToggleButton}
              onClick={() => onToggleLanguageMode?.()}
            >
              {languageMode === LANGUAGE_MODES.ENG ? 'ENG' : 'BUR'}
            </button>
            <button type="button" onClick={onClose} className={styles.closeButton}>✕</button>
          </div>
        </div>

        <div className={styles.managementGrid}>
          <section className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <h4>Item Management</h4>
            </div>

            <div className={styles.layerBoard}>
              <div className={styles.layerColumn}>
                <div className={styles.layerTitle}>Item Folder</div>
                {rootNodes.length === 0 ? (
                  <div className={styles.emptyList}>No items in tree yet.</div>
                ) : (
                  <div className={styles.treePanel}>
                    {rootNodes.map((node) => (
                      <TreeNode
                        key={node.id}
                        node={node}
                        childrenByParent={childrenByParent}
                        expandedIds={effectiveExpandedIds}
                        onToggleExpand={toggleTreeNode}
                        onSelect={handleSelectTreeNode}
                        selectedId={parentId === '' ? null : Number(parentId)}
                        languageMode={languageMode}
                        formatQty={formatQty}
                        onContextMenu={handleTreeContextMenu}
                      />
                    ))}
                  </div>
                )}
                <div className={styles.treeHint}>
                  Left-click a selected folder to collapse/expand. Right-click a folder to add inside it.
                </div>
              </div>
            </div>
          </section>

          <section className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <h4>Category Management</h4>
            </div>

            <div className={styles.layerColumn}>
              <div className={styles.layerTitle}>Category Folder</div>
              {categoryTreeNodes.length === 0 ? (
                <div className={styles.emptyList}>No categories available.</div>
              ) : (
                <div className={styles.treePanel}>
                  {categoryTreeNodes.map((node) => (
                    <button
                      type="button"
                      key={node.id}
                      className={`${styles.treeRow} ${selectedLayer1Key === node.key ? styles.treeRowActive : ''}`}
                      onClick={() => handleSelectCategoryNode(node)}
                      onContextMenu={(event) => {
                        event.preventDefault();
                        setCategoryContextMenu({ x: event.clientX, y: event.clientY, node });
                      }}
                    >
                      <span className={`${styles.treeChevron} ${styles.treeChevronVisible}`}>•</span>
                      <span className={styles.treeLabel}>{node.label}</span>
                    </button>
                  ))}
                  {selectedLayer1Key != null && layer2Options.map((node) => (
                    <button
                      type="button"
                      key={`l2-${node.key}`}
                      className={`${styles.treeRow} ${selectedLayer2Key === node.key ? styles.treeRowActive : ''}`}
                      style={{ paddingLeft: '28px' }}
                      onClick={() => handleSelectCategoryNode({ ...node, layer: 2 })}
                      onContextMenu={(event) => {
                        event.preventDefault();
                        setCategoryContextMenu({ x: event.clientX, y: event.clientY, node: { ...node, layer: 2 } });
                      }}
                    >
                      <span className={`${styles.treeChevron} ${styles.treeChevronVisible}`}>•</span>
                      <span className={styles.treeLabel}>{node.label}</span>
                    </button>
                  ))}
                  {selectedLayer2Key != null && layer3Options.map((node) => (
                    <button
                      type="button"
                      key={`l3-${node.key}`}
                      className={`${styles.treeRow} ${selectedLayer3Key === node.key ? styles.treeRowActive : ''}`}
                      style={{ paddingLeft: '46px' }}
                      onClick={() => handleSelectCategoryNode({ ...node, layer: 3 })}
                      onContextMenu={(event) => {
                        event.preventDefault();
                        setCategoryContextMenu({ x: event.clientX, y: event.clientY, node: { ...node, layer: 3 } });
                      }}
                    >
                      <span className={`${styles.treeChevron} ${styles.treeChevronVisible}`}>•</span>
                      <span className={styles.treeLabel}>{node.label}</span>
                    </button>
                  ))}
                </div>
              )}
              <div className={styles.treeHint}>
                Right-click a category to add inside it.
              </div>
            </div>
          </section>
        </div>

        {categoryContextMenu && (
          <div
            ref={categoryContextMenuRef}
            className={styles.contextMenu}
            style={{ top: `${categoryContextMenu.y}px`, left: `${categoryContextMenu.x}px` }}
            onClick={(event) => event.stopPropagation()}
          >
            {categoryContextMenu.node.layer <= 2 && (
              <button
                type="button"
                onClick={() => {
                  if (categoryContextMenu.node.layer === 1) {
                    onSelectLayer1?.(categoryContextMenu.node.key);
                    openCategoryAddModal(2);
                  } else {
                    onSelectLayer2?.(categoryContextMenu.node.key);
                    openCategoryAddModal(3);
                  }
                  setCategoryContextMenu(null);
                }}
              >
                Add inside "{categoryContextMenu.node.label}"
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                openCategoryAddModal(2);
                setCategoryContextMenu(null);
              }}
            >
              Add in root
            </button>
          </div>
        )}
      </div>

      {contextMenu && (
        <div
          ref={contextMenuRef}
          className={styles.contextMenu}
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => {
              setParentId(String(contextMenu.node.id));
              setNewItemParentId(contextMenu.node.id);
              setIsAddItemModalOpen(true);
              setContextMenu(null);
              setNewItemName('');
              setNewItemBurmeseName('');
            }}
          >
            Add inside "{getLocalizedName(contextMenu.node, languageMode)}"
          </button>
          <button
            type="button"
            onClick={() => {
              setParentId('');
              setNewItemParentId(null);
              setIsAddItemModalOpen(true);
              setContextMenu(null);
              setNewItemName('');
              setNewItemBurmeseName('');
            }}
          >
            Add in root
          </button>
        </div>
      )}

      {isAddItemModalOpen && (
        <div className={styles.addItemModalBackdrop} onClick={() => setIsAddItemModalOpen(false)}>
          <div className={styles.addItemModal} onClick={(event) => event.stopPropagation()}>
            <h4>Add Item</h4>
            <div className={styles.addItemTarget}>
              Parent: {addItemParentNode ? getLocalizedName(addItemParentNode, languageMode) : 'Root layer'}
            </div>
            <form className={styles.addItemForm} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Item name"
                value={newItemName}
                onChange={(event) => setNewItemName(event.target.value)}
                autoFocus
              />
              <input
                type="text"
                placeholder="Burmese name (optional)"
                value={newItemBurmeseName}
                onChange={(event) => setNewItemBurmeseName(event.target.value)}
              />
              <div className={styles.addItemActions}>
                <button type="button" onClick={() => setIsAddItemModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit">Add Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddCategoryModalOpen && (
        <div className={styles.addItemModalBackdrop} onClick={() => setIsAddCategoryModalOpen(false)}>
          <div className={styles.addItemModal} onClick={(event) => event.stopPropagation()}>
            <h4>{categoryDraftLayer === 3 ? 'Add Layer 3' : 'Add Layer 2'}</h4>
            <form className={styles.addItemForm} onSubmit={handleSubmitCategory}>
              <input
                type="text"
                placeholder={categoryDraftLayer === 3 ? 'Layer 3 name' : 'Layer 2 name'}
                value={categoryDraftName}
                onChange={(event) => setCategoryDraftName(event.target.value)}
                autoFocus
              />
              <div className={styles.addItemActions}>
                <button type="button" onClick={() => setIsAddCategoryModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
