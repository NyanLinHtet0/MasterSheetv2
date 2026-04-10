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

function renderInventoryColumn({
  title,
  rows,
  selectedId,
  onSelect,
  emptyLabel,
}) {
  return (
    <div className={styles.categoryColumn}>
      <div className={styles.sectionTitle}>{title}</div>
      <div className={styles.optionsList}>
        {rows.length === 0 ? (
          <div className={styles.emptyList}>{emptyLabel}</div>
        ) : (
          rows.map((row) => {
            const isSelected = selectedId === String(row.id);
            return (
              <button
                type="button"
                key={row.id}
                className={`${styles.inventoryCard} ${isSelected ? styles.inventoryCardActive : ''}`}
                onClick={() => onSelect(String(row.id))}
              >
                <div className={styles.inventoryCardTitle}>{row.name || `ID ${row.id}`}</div>
                <div className={styles.inventoryCardSub}>{row.burmese_name || '-'}</div>
                <div className={styles.inventoryCardQty}>Qty: {row.quantity ?? 0}</div>
              </button>
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
  const [selectedItemLayer1Id, setSelectedItemLayer1Id] = useState('');
  const [selectedItemLayer2Id, setSelectedItemLayer2Id] = useState('');
  const [selectedItemLayer3Id, setSelectedItemLayer3Id] = useState('');

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

  const itemLayer1Rows = useMemo(() => childrenByParent.get(null) || [], [childrenByParent]);

  const itemLayer2Rows = useMemo(() => {
    if (selectedItemLayer1Id) {
      return childrenByParent.get(Number(selectedItemLayer1Id)) || [];
    }

    return itemLayer1Rows.flatMap((row) => childrenByParent.get(row.id) || []);
  }, [childrenByParent, itemLayer1Rows, selectedItemLayer1Id]);

  const itemLayer3Rows = useMemo(() => {
    if (selectedItemLayer2Id) {
      return childrenByParent.get(Number(selectedItemLayer2Id)) || [];
    }

    if (selectedItemLayer1Id) {
      return itemLayer2Rows.flatMap((row) => childrenByParent.get(row.id) || []);
    }

    return [];
  }, [childrenByParent, itemLayer2Rows, selectedItemLayer1Id, selectedItemLayer2Id]);

  const selectedItemDepthLabel = useMemo(() => {
    if (!parentId) {
      return 'Root';
    }

    const selectedNode = rowMap.get(Number(parentId));
    if (!selectedNode) {
      return 'Root';
    }

    const selectedRow = rowsWithDepth.find((row) => row.id === selectedNode.id);
    const depth = (selectedRow?.depth ?? 0) + 1;
    return `Layer ${depth}`;
  }, [parentId, rowMap, rowsWithDepth]);


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

  const handleSelectItemLayer1 = (nextId) => {
    const resolved = nextId === selectedItemLayer1Id ? '' : nextId;
    setSelectedItemLayer1Id(resolved);
    setSelectedItemLayer2Id('');
    setSelectedItemLayer3Id('');
    setParentId(resolved);
  };

  const handleSelectItemLayer2 = (nextId) => {
    const resolved = nextId === selectedItemLayer2Id ? '' : nextId;
    setSelectedItemLayer2Id(resolved);
    setSelectedItemLayer3Id('');

    if (!resolved) {
      setParentId(selectedItemLayer1Id || '');
      return;
    }

    setParentId(resolved);

    if (!selectedItemLayer1Id) {
      const parentNode = rowMap.get(Number(resolved));
      setSelectedItemLayer1Id(parentNode?.parent_id != null ? String(parentNode.parent_id) : '');
    }
  };

  const handleSelectItemLayer3 = (nextId) => {
    const resolved = nextId === selectedItemLayer3Id ? '' : nextId;
    setSelectedItemLayer3Id(resolved);

    if (!resolved) {
      setParentId(selectedItemLayer2Id || selectedItemLayer1Id || '');
      return;
    }

    setParentId(resolved);

    const node = rowMap.get(Number(resolved));

    if (!selectedItemLayer2Id) {
      setSelectedItemLayer2Id(node?.parent_id != null ? String(node.parent_id) : '');
    }

    if (!selectedItemLayer1Id && node?.parent_id != null) {
      const parentNode = rowMap.get(node.parent_id);
      setSelectedItemLayer1Id(parentNode?.parent_id != null ? String(parentNode.parent_id) : '');
    }
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
                <option key={row.id} value={row.id}>{`${row.path} (${`Layer ${row.depth + 1}`})`}</option>
              ))}
            </select>

            <button type="submit">Add Item</button>
          </form>

          <div className={styles.selectedLayerHint}>Current root layer target: {selectedItemDepthLabel}</div>

          <div className={styles.categoryColumns}>
            {renderInventoryColumn({
              title: 'Layer 1',
              rows: itemLayer1Rows,
              selectedId: selectedItemLayer1Id,
              onSelect: handleSelectItemLayer1,
              emptyLabel: 'No layer 1 items.',
            })}

            {renderInventoryColumn({
              title: 'Layer 2',
              rows: itemLayer2Rows,
              selectedId: selectedItemLayer2Id,
              onSelect: handleSelectItemLayer2,
              emptyLabel: 'No layer 2 items.',
            })}

            {renderInventoryColumn({
              title: 'Layer 3',
              rows: itemLayer3Rows,
              selectedId: selectedItemLayer3Id,
              onSelect: handleSelectItemLayer3,
              emptyLabel: 'No layer 3 items.',
            })}
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
