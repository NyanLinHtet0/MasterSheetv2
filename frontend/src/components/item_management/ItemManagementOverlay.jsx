import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ItemManagementOverlay.module.css';
import { buildChildrenMap, buildRowMap, normalizeRows } from '../helpers/treeHelpers';
import { getLocalizedName, LANGUAGE_MODES } from '../helpers/nameLocalization';
import TreePanel from './overlay/components/TreePanel';
import CategoryColumn from './overlay/components/CategoryColumn';
import { getAncestorPath } from './overlay/utils/pathUtils';
import useTreeExpansion from './overlay/hooks/useTreeExpansion';

const VIEW_MODES = {
  LIVE: 'live',
  TRASH: 'trash',
};

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
  isEditTableMode = false,
  onToggleEditTableMode,
  onAddLayer3,
  languageMode = LANGUAGE_MODES.ENG,
  onToggleLanguageMode,
}) {
  const [parentId, setParentId] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemBurmeseName, setNewItemBurmeseName] = useState('');
  const [newItemParentId, setNewItemParentId] = useState(null);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [newLayer2Name, setNewLayer2Name] = useState('');
  const [newLayer3Name, setNewLayer3Name] = useState('');
  const [overlayViewMode, setOverlayViewMode] = useState(VIEW_MODES.LIVE);
  const [contextMenu, setContextMenu] = useState(null);

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

  const showLayer2Category = selectedLayer1Key != null;
  const showLayer3Category = selectedLayer2Key != null;
  const expandedIds = useMemo(() => {
    const set = new Set();
    activePath.forEach((node) => set.add(node.id));
    return set;
  }, [activePath]);

  const { effectiveExpandedIds, toggleTreeNode } = useTreeExpansion(expandedIds);

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

  const handleAddLayer2 = () => {
    const nextName = newLayer2Name.trim();
    if (!nextName || !onAddLayer2) return;

    onAddLayer2(nextName);
    setNewLayer2Name('');
  };

  const handleAddLayer3 = () => {
    const nextName = newLayer3Name.trim();
    if (!nextName || !onAddLayer3) return;

    onAddLayer3(nextName);
    setNewLayer3Name('');
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
              className={styles.languageToggleButton}
              onClick={() => onToggleLanguageMode?.()}
            >
              {languageMode === LANGUAGE_MODES.ENG ? 'ENG' : 'BUR'}
            </button>
            <button type="button" onClick={onClose} className={styles.closeButton}>✕</button>
          </div>
        </div>

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
                onStartTree={() => {
                  setParentId('');
                  setNewItemParentId(null);
                  setIsAddItemModalOpen(true);
                  setContextMenu(null);
                  setNewItemName('');
                  setNewItemBurmeseName('');
                }}
              />
              <div className={styles.treeHint}>
                Left-click a selected folder to collapse/expand. Right-click a folder to add inside it.
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <h4>Category Management</h4>
            <div className={styles.headerActions}>
              <button
                type="button"
                className={`${styles.editTableButton} ${isEditTableMode ? styles.editTableButtonActive : ''}`}
                onClick={() => onToggleEditTableMode?.()}
              >
                {isEditTableMode ? 'Done Editing' : 'Edit Table'}
              </button>
              <button
                type="button"
                className={`${styles.modeToggleButton} ${overlayViewMode === VIEW_MODES.LIVE ? styles.modeToggleButtonActive : ''}`}
                onClick={() => setOverlayViewMode(VIEW_MODES.LIVE)}
              >
                Live
              </button>
              <button
                type="button"
                className={`${styles.modeToggleButton} ${overlayViewMode === VIEW_MODES.TRASH ? styles.modeToggleButtonActive : ''}`}
                onClick={() => setOverlayViewMode(VIEW_MODES.TRASH)}
              >
                Trash
              </button>
            </div>
          </div>

          <div className={styles.categoryColumns}>
            <CategoryColumn
              title="Layer 1"
              options={layer1Options}
              selectedValue={selectedLayer1Key}
              onSelect={onSelectLayer1}
              emptyLabel="No layer 1 items."
            />

            {showLayer2Category && (
              <CategoryColumn
                title="Layer 2"
                options={layer2Options}
                selectedValue={selectedLayer2Key}
                onSelect={onSelectLayer2}
                editable={isEditTableMode}
                draftName={newLayer2Name}
                setDraftName={setNewLayer2Name}
                onAdd={handleAddLayer2}
                emptyLabel="No layer 2 items."
              />
            )}

            {showLayer3Category && (
              <CategoryColumn
                title="Layer 3"
                options={layer3Options}
                selectedValue={selectedLayer3Key}
                onSelect={onSelectLayer3}
                editable={isEditTableMode}
                draftName={newLayer3Name}
                setDraftName={setNewLayer3Name}
                onAdd={handleAddLayer3}
                emptyLabel="No layer 3 items."
                compact
              />
            )}
          </div>
        </section>
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
    </div>
  );
}
