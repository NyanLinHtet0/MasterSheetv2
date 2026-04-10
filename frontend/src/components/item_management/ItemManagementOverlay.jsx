import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ItemManagementOverlay.module.css';
import { buildChildrenMap, buildRowMap, normalizeRows } from '../helpers/treeHelpers';
import { getLocalizedName, LANGUAGE_MODES } from '../helpers/nameLocalization';
import TreePanel from './overlay/components/TreePanel';
import CategoryTreePanel from './overlay/components/CategoryTreePanel';
import { getAncestorPath } from './overlay/utils/pathUtils';
import useTreeExpansion from './overlay/hooks/useTreeExpansion';

export default function ItemManagementOverlay({
  corp,
  onClose,
  onAddItem,
  categoryRootNodes = [],
  categoryChildrenByKey = new Map(),
  categoryNodeMap = new Map(),
  selectedCategoryKey = null,
  onSelectCategoryNode,
  onAddCategoryNode,
  languageMode = LANGUAGE_MODES.ENG,
  onToggleLanguageMode,
}) {
  const [parentId, setParentId] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemBurmeseName, setNewItemBurmeseName] = useState('');
  const [newItemParentId, setNewItemParentId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryBurmeseName, setNewCategoryBurmeseName] = useState('');
  const [newCategoryParentKey, setNewCategoryParentKey] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [categoryContextMenu, setCategoryContextMenu] = useState(null);
  const [internalSelectedCategoryKey, setInternalSelectedCategoryKey] = useState(null);

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

  const expandedIds = useMemo(() => {
    const set = new Set();
    activePath.forEach((node) => set.add(node.id));
    return set;
  }, [activePath]);

  const { effectiveExpandedIds, toggleTreeNode } = useTreeExpansion(expandedIds);

  const effectiveSelectedCategoryKey = selectedCategoryKey ?? internalSelectedCategoryKey;
  const selectedCategoryNode = useMemo(
    () => (effectiveSelectedCategoryKey ? categoryNodeMap.get(effectiveSelectedCategoryKey) || null : null),
    [effectiveSelectedCategoryKey, categoryNodeMap]
  );

  const categoryExpandedIds = useMemo(() => {
    const set = new Set();
    let current = selectedCategoryNode;
    let guard = 0;

    while (current && guard < 1000) {
      set.add(current.key);
      current = current.parentKey != null ? categoryNodeMap.get(current.parentKey) : null;
      guard += 1;
    }

    return set;
  }, [selectedCategoryNode, categoryNodeMap]);

  const { effectiveExpandedIds: effectiveCategoryExpandedIds, toggleTreeNode: toggleCategoryTreeNode } =
    useTreeExpansion(categoryExpandedIds);

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
  };

  const handleAddCategory = (event) => {
    event.preventDefault();
    const nextName = String(newCategoryName || '').trim();
    const nextBurmeseName = String(newCategoryBurmeseName || '').trim() || null;
    if (!nextName || !newCategoryParentKey || !onAddCategoryNode) return;

    onAddCategoryNode({ name: nextName, burmeseName: nextBurmeseName, parentKey: newCategoryParentKey });

    setNewCategoryName('');
    setNewCategoryBurmeseName('');
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

  const handleTreeContextMenu = (event, node) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      node,
    });
  };

  const contextMenuRef = useRef(null);
  const categoryContextMenuRef = useRef(null);

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
  const addCategoryParentNode = newCategoryParentKey ? categoryNodeMap.get(newCategoryParentKey) || null : null;

  const onSelectCategory = (node) => {
    if (onSelectCategoryNode) {
      onSelectCategoryNode(node.key);
    } else {
      setInternalSelectedCategoryKey(node.key);
    }
    setCategoryContextMenu(null);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.headerRow}>
          <h3>Settings</h3>
          <div className={styles.headerActions}>
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
                <div className={styles.layerTitle}>Folder Tree</div>
                <TreePanel
                  rootNodes={rootNodes}
                  childrenByParent={childrenByParent}
                  effectiveExpandedIds={effectiveExpandedIds}
                  toggleTreeNode={toggleTreeNode}
                  handleSelectTreeNode={handleSelectTreeNode}
                  parentId={parentId}
                  languageMode={languageMode}
                  formatQty={formatQty}
                  handleTreeContextMenu={handleTreeContextMenu}
                />
                <div className={styles.treeHint}>
                  Left-click a selected folder to collapse/expand. Right-click a folder to set add target.
                </div>
              </div>

              <aside className={styles.layerColumn}>
                <div className={styles.addFormTitle}>Add Item</div>
                <div className={styles.inlineAddItemHeader}>
                  Add item under: {addItemParentNode ? getLocalizedName(addItemParentNode, languageMode) : 'Root layer'}
                </div>
                <form className={styles.inlineAddItemForm} onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="English name"
                    value={newItemName}
                    onChange={(event) => setNewItemName(event.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Burmese name (optional)"
                    value={newItemBurmeseName}
                    onChange={(event) => setNewItemBurmeseName(event.target.value)}
                  />
                  <div className={styles.inlineAddItemActions}>
                    <button
                      type="button"
                      onClick={() => {
                        setNewItemName('');
                        setNewItemBurmeseName('');
                      }}
                    >
                      Clear
                    </button>
                    <button type="submit" disabled={!String(newItemName || '').trim()}>Add</button>
                  </div>
                </form>
              </aside>
            </div>
          </section>

          <section className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <h4>Category Management</h4>
            </div>

            <div className={styles.layerBoard}>
              <div className={styles.layerColumn}>
                <div className={styles.layerTitle}>Folder Tree</div>
                <CategoryTreePanel
                  rootNodes={categoryRootNodes}
                  childrenByParent={categoryChildrenByKey}
                  effectiveExpandedIds={effectiveCategoryExpandedIds}
                  toggleTreeNode={toggleCategoryTreeNode}
                  onSelectNode={onSelectCategory}
                  selectedKey={effectiveSelectedCategoryKey}
                  onContextMenu={(event, node) => {
                    event.preventDefault();
                    setCategoryContextMenu({
                      x: event.clientX,
                      y: event.clientY,
                      node,
                    });
                  }}
                />
              </div>

              <aside className={styles.layerColumn}>
                <div className={styles.addFormTitle}>Add Category</div>
                <div className={styles.inlineAddItemHeader}>
                  Add category under: {addCategoryParentNode ? addCategoryParentNode.label : 'Select from right-click menu'}
                </div>
                <form className={styles.inlineAddItemForm} onSubmit={handleAddCategory}>
                  <input
                    type="text"
                    placeholder="Category name"
                    value={newCategoryName}
                    onChange={(event) => setNewCategoryName(event.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Burmese name (optional)"
                    value={newCategoryBurmeseName}
                    onChange={(event) => setNewCategoryBurmeseName(event.target.value)}
                  />
                  <div className={styles.inlineAddItemActions}>
                    <button
                      type="button"
                      onClick={() => {
                        setNewCategoryName('');
                        setNewCategoryBurmeseName('');
                      }}
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      disabled={!String(newCategoryName || '').trim() || !newCategoryParentKey}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </aside>
            </div>
          </section>
        </div>
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
              setContextMenu(null);
              setNewItemName('');
              setNewItemBurmeseName('');
            }}
          >
            Add in root
          </button>
        </div>
      )}
      {categoryContextMenu && (
        <div
          ref={categoryContextMenuRef}
          className={styles.contextMenu}
          style={{ top: `${categoryContextMenu.y}px`, left: `${categoryContextMenu.x}px` }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => {
              setNewCategoryParentKey(categoryContextMenu.node.key);
              setCategoryContextMenu(null);
              setNewCategoryName('');
              setNewCategoryBurmeseName('');
            }}
          >
            Add inside "{categoryContextMenu.node.label}"
          </button>
        </div>
      )}

    </div>
  );
}
