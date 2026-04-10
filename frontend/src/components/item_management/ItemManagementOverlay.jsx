import { useMemo, useState } from 'react';
import styles from './ItemManagementOverlay.module.css';
import { buildChildrenMap, buildRowMap, normalizeRows } from '../helpers/treeHelpers';
import { LANGUAGE_MODES } from '../helpers/nameLocalization';

const VIEW_MODES = {
  LIVE: 'live',
  TRASH: 'trash',
};

function buildItemPath(node, rowMap) {
  const labels = [];
  let current = node;
  let guard = 0;

  while (current && guard < 1000) {
    labels.unshift(current.name || `ID ${current.id}`);
    current = current.parent_id != null ? rowMap.get(current.parent_id) : null;
    guard += 1;
  }

  return labels.join(' > ');
}

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
  const [name, setName] = useState('');
  const [burmeseName, setBurmeseName] = useState('');
  const [parentId, setParentId] = useState('');
  const [newLayer2Name, setNewLayer2Name] = useState('');
  const [newLayer3Name, setNewLayer3Name] = useState('');
  const [overlayViewMode, setOverlayViewMode] = useState(VIEW_MODES.LIVE);
  const [previewLayer2Id, setPreviewLayer2Id] = useState('');
  const [previewLayer3Id, setPreviewLayer3Id] = useState('');

  const inventoryRows = useMemo(() => normalizeRows(corp?.inventory_tree || []), [corp]);
  const rowMap = useMemo(() => buildRowMap(inventoryRows), [inventoryRows]);
  const childrenByParent = useMemo(() => buildChildrenMap(inventoryRows, 'parent_id'), [inventoryRows]);

  const rowsWithDepth = useMemo(() => {
    const rows = [];

    const walk = (node, depth = 0) => {
      rows.push({
        ...node,
        depth,
        path: buildItemPath(node, rowMap),
      });

      (childrenByParent.get(node.id) || []).forEach((child) => walk(child, depth + 1));
    };

    (childrenByParent.get(null) || []).forEach((root) => walk(root));

    return rows;
  }, [childrenByParent, rowMap]);

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
    return selected || activeLayer2 || layer2Nodes[0];
  }, [activeLayer2, layer2Nodes, previewLayer2Id]);
  const layer3Nodes = layer2ViewNode ? childrenByParent.get(layer2ViewNode.id) || [] : [];
  const layer3ViewNode = useMemo(() => {
    if (layer3Nodes.length === 0) return null;
    return layer3Nodes.find((node) => String(node.id) === previewLayer3Id) || layer3Nodes[0];
  }, [layer3Nodes, previewLayer3Id]);

  const formatQty = (value) => Number(value ?? 0).toFixed(2);

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextName = String(name || '').trim();
    if (!nextName) return;

    onAddItem?.({
      corpId: corp.id,
      parentId: parentId === '' ? null : Number(parentId),
      name: nextName,
      burmeseName: String(burmeseName || '').trim() || null,
    });

    setName('');
    setBurmeseName('');
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

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.headerRow}>
          <h3>Settings</h3>
          <button type="button" onClick={onClose} className={styles.closeButton}>✕</button>
        </div>

        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <h4>Item Management</h4>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Item name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="text"
              placeholder="Burmese name (optional)"
              value={burmeseName}
              onChange={(event) => setBurmeseName(event.target.value)}
            />
            <select value={parentId} onChange={(event) => setParentId(event.target.value)}>
              <option value="">Root layer</option>
              {rowsWithDepth.map((row) => (
                <option key={row.id} value={row.id}>{`Layer ${row.depth + 1} • ${row.path}`}</option>
              ))}
            </select>

            <button type="submit">Add Item</button>
          </form>

          <div className={styles.layerBoard}>
            <div className={styles.layerColumn}>
              <div className={styles.layerTitle}>Layer 1</div>
              {layer1Nodes.length > 1 && (
                <select
                  className={styles.layerSelect}
                  value={activeLayer1 ? String(activeLayer1.id) : ''}
                  onChange={(event) => setParentId(event.target.value)}
                >
                  <option value="">Root layer</option>
                  {layer1Nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.name}
                    </option>
                  ))}
                </select>
              )}
              {layer1Nodes.length === 0 && <div className={styles.emptyList}>No layer 1 items yet.</div>}
              {layer1Nodes.map((node) => (
                <button
                  type="button"
                  key={node.id}
                  className={`${styles.layerCard} ${activeLayer1?.id === node.id ? styles.layerCardActive : ''}`}
                  onClick={() => setParentId(String(node.id))}
                >
                  <div className={styles.layerCardName}>{node.name}</div>
                  <div className={styles.layerCardSub}>{node.burmese_name || '-'}</div>
                  <div className={styles.layerCardMeta}>{formatQty(node.quantity)}</div>
                </button>
              ))}
            </div>

            <div className={styles.layerColumn}>
              <div className={styles.layerTitle}>Layer 2</div>
              {activeLayer1 == null && <div className={styles.emptyList}>Select a layer 1 item first.</div>}
              {activeLayer1 != null && layer2Nodes.length === 0 && (
                <div className={styles.emptyList}>No layer 2 items under this layer 1 item.</div>
              )}
              {layer2Nodes.length > 1 && (
                <select
                  className={styles.layerSelect}
                  value={layer2ViewNode ? String(layer2ViewNode.id) : ''}
                  onChange={(event) => {
                    setPreviewLayer2Id(event.target.value);
                    setPreviewLayer3Id('');
                  }}
                >
                  {layer2Nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.name}
                    </option>
                  ))}
                </select>
              )}
              {layer2ViewNode && (
                <div className={`${styles.layerCard} ${styles.layerCardPassive}`}>
                  <div className={styles.layerCardName}>{layer2ViewNode.name}</div>
                  <div className={styles.layerCardSub}>{layer2ViewNode.burmese_name || '-'}</div>
                  <div className={styles.layerCardMeta}>{formatQty(layer2ViewNode.quantity)}</div>
                </div>
              )}
            </div>

            <div className={styles.layerColumn}>
              <div className={styles.layerTitle}>Layer 3</div>
              {layer2ViewNode == null && <div className={styles.emptyList}>Select a layer 2 item first.</div>}
              {layer2ViewNode != null && layer3Nodes.length === 0 && (
                <div className={styles.emptyList}>No layer 3 items under this layer 2 item.</div>
              )}
              {layer3Nodes.length > 1 && (
                <select
                  className={styles.layerSelect}
                  value={layer3ViewNode ? String(layer3ViewNode.id) : ''}
                  onChange={(event) => setPreviewLayer3Id(event.target.value)}
                >
                  {layer3Nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.name}
                    </option>
                  ))}
                </select>
              )}
              {layer3ViewNode && (
                <div className={`${styles.layerCard} ${styles.layerCardPassive}`}>
                  <div className={styles.layerCardName}>{layer3ViewNode.name}</div>
                  <div className={styles.layerCardSub}>{layer3ViewNode.burmese_name || '-'}</div>
                  <div className={styles.layerCardMeta}>{formatQty(layer3ViewNode.quantity)}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <h4>Category Management</h4>
            <div className={styles.headerActions}>
              <button
                type="button"
                className={styles.languageToggleButton}
                onClick={() => onToggleLanguageMode?.()}
              >
                {languageMode === LANGUAGE_MODES.ENG ? 'ENG' : 'BUR'}
              </button>
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

            {renderCategoryColumn({
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

            {renderCategoryColumn({
              title: 'Layer 3',
              options: layer3Options,
              selectedValue: selectedLayer3Key,
              onSelect: onSelectLayer3,
              editable: isEditTableMode,
              draftName: newLayer3Name,
              setDraftName: setNewLayer3Name,
              onAdd: handleAddLayer3,
              emptyLabel: 'No layer 3 items.',
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
