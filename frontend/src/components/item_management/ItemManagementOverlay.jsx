import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ItemManagementOverlay.module.css';
import { buildChildrenMap, buildRowMap, normalizeRows } from '../helpers/treeHelpers';
import { getLocalizedName, LANGUAGE_MODES } from '../helpers/nameLocalization';

const VIEW_MODES = {
  LIVE: 'live',
  TRASH: 'trash',
};

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

function renderCategoryColumn({
  title,
  options = [],
  selectedValue,
  onSelect,
  editable = false,
  draftName,
  setDraftName,
  onAdd,
  emptyLabel,
  compact = false,
}) {
  return (
    <div className={styles.categoryColumn}>
      <div className={styles.sectionTitle}>{title}</div>

      {editable && (
        <div className={styles.editInlineRow}>
          <input
            type="text"
            value={draftName}
            className={styles.editInput}
            placeholder={`Add ${title} (ENG | BUR)...`}
            onChange={(event) => setDraftName(event.target.value)}
          />

          <button type="button" className={styles.addButton} onClick={onAdd}>
            Add
          </button>
        </div>
      )}

      <div className={styles.optionsList}>
        {options.length === 0 ? (
          <div className={styles.emptyList}>{emptyLabel}</div>
        ) : compact ? (
          <div className={styles.compactOptionsGrid}>
            {options.map((option) => {
              const isSelected = selectedValue === option.key;
              return (
                <button
                  type="button"
                  key={option.key}
                  className={`${styles.compactOptionChip} ${isSelected ? styles.compactOptionChipActive : ''}`}
                  onClick={() => onSelect?.(option.key)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ) : (
          options.map((option) => {
            const isSelected = selectedValue === option.key;

            return (
              <label key={option.key} className={styles.optionRow}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onSelect?.(option.key)}
                />
                <span className={styles.optionLabel}>{option.label}</span>
              </label>
            );
          })
        )}
      </div>
    </div>
  );
}

function renderLayerDropdown({
  title,
  nodes = [],
  selectedNode = null,
  isOpen = false,
  onToggle,
  onSelect,
  emptyLabel,
  disabledLabel = '',
  formatQty,
  languageMode,
}) {
  if (disabledLabel) {
    return (
      <div className={styles.layerColumn}>
        <div className={styles.layerTitle}>{title}</div>
        <div className={styles.emptyList}>{disabledLabel}</div>
      </div>
    );
  }

  return (
    <div className={styles.layerColumn}>
      <div className={styles.layerTitle}>{title}</div>

      {nodes.length === 0 ? (
        <div className={styles.emptyList}>{emptyLabel}</div>
      ) : (
        <div className={styles.layerDropdown}>
          <button
            type="button"
            className={`${styles.layerCard} ${isOpen ? styles.layerCardActive : ''}`}
            onClick={onToggle}
          >
            <div className={styles.layerCardName}>
              {selectedNode ? getLocalizedName(selectedNode, languageMode) : `Select ${title}`}
            </div>
            <div className={styles.layerCardMeta}>
              {selectedNode ? formatQty(selectedNode.quantity) : formatQty(0)} {isOpen ? '▲' : '▼'}
            </div>
          </button>

          {isOpen && (
            <div className={styles.layerDropdownMenu}>
              {nodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;

                return (
                  <button
                    type="button"
                    key={node.id}
                    className={`${styles.layerCard} ${isSelected ? styles.layerCardActive : styles.layerCardPassive}`}
                    onClick={() => onSelect(node)}
                  >
                    <div className={styles.layerCardName}>{getLocalizedName(node, languageMode)}</div>
                    <div className={styles.layerCardMeta}>{formatQty(node.quantity)}</div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
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
  const [previewLayer2Id, setPreviewLayer2Id] = useState('');
  const [previewLayer3Id, setPreviewLayer3Id] = useState('');
  const [openLayerKey, setOpenLayerKey] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
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
  const activeLayer1 = activePath[0] || null;
  const layer2Nodes = activeLayer1 ? childrenByParent.get(activeLayer1.id) || [] : [];
  const activeLayer2 = activePath[1] || null;
  const layer2ViewNode = useMemo(() => {
    if (layer2Nodes.length === 0) return null;
    const selected = layer2Nodes.find((node) => String(node.id) === previewLayer2Id);
    return selected || activeLayer2 || null;
  }, [activeLayer2, layer2Nodes, previewLayer2Id]);
  const layer3Nodes = layer2ViewNode ? childrenByParent.get(layer2ViewNode.id) || [] : [];
  const layer3ViewNode = useMemo(() => {
    if (layer3Nodes.length === 0) return null;
    return layer3Nodes.find((node) => String(node.id) === previewLayer3Id) || activePath[2] || null;
  }, [activePath, layer3Nodes, previewLayer3Id]);
  const showLayer2Board = activeLayer1 != null;
  const showLayer3Board = layer2ViewNode != null;
  const showLayer2Category = selectedLayer1Key != null;
  const showLayer3Category = selectedLayer2Key != null;
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

  const toggleLayerDropdown = (key) => {
    setOpenLayerKey((current) => (current === key ? null : key));
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

  const handleSelectLayer1Node = (node) => {
    setParentId(String(node.id));
    setPreviewLayer2Id('');
    setPreviewLayer3Id('');
    setOpenLayerKey(null);
  };

  const handleSelectLayer2Node = (node) => {
    setParentId(String(node.id));
    setPreviewLayer2Id(String(node.id));
    setPreviewLayer3Id('');
    setOpenLayerKey(null);
  };

  const handleSelectLayer3Node = (node) => {
    setParentId(String(node.id));
    setPreviewLayer3Id(String(node.id));
    setOpenLayerKey(null);
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
    setPreviewLayer2Id('');
    setPreviewLayer3Id('');
    setContextMenu(null);
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
            {renderCategoryColumn({
              title: 'Layer 1',
              options: layer1Options,
              selectedValue: selectedLayer1Key,
              onSelect: onSelectLayer1,
              emptyLabel: 'No layer 1 items.',
            })}

            {showLayer2Category && renderCategoryColumn({
              title: 'Layer 2',
              options: layer2Options,
              selectedValue: selectedLayer2Key,
              onSelect: onSelectLayer2,
              editable: isEditTableMode,
              draftName: newLayer2Name,
              setDraftName: setNewLayer2Name,
              onAdd: handleAddLayer2,
              emptyLabel: 'No layer 2 items.',
            })}

            {showLayer3Category && renderCategoryColumn({
              title: 'Layer 3',
              options: layer3Options,
              selectedValue: selectedLayer3Key,
              onSelect: onSelectLayer3,
              editable: isEditTableMode,
              draftName: newLayer3Name,
              setDraftName: setNewLayer3Name,
              onAdd: handleAddLayer3,
              emptyLabel: 'No layer 3 items.',
              compact: true,
            })}
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
