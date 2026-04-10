import { useMemo, useState } from 'react';
import styles from './ItemManagementOverlay.module.css';
import { buildChildrenMap, buildRowMap, normalizeRows } from '../helpers/treeHelpers';

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

export default function ItemManagementOverlay({
  corp,
  onClose,
  onAddItem,
}) {
  const [name, setName] = useState('');
  const [burmeseName, setBurmeseName] = useState('');
  const [parentId, setParentId] = useState('');

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
    setParentId('');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.headerRow}>
          <h3>Item Management</h3>
          <button type="button" onClick={onClose} className={styles.closeButton}>✕</button>
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
              <option key={row.id} value={row.id}>{row.path}</option>
            ))}
          </select>

          <button type="submit">Add Item</button>
        </form>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Parent</th>
                <th>Item</th>
                <th>Burmese</th>
                <th>Qty</th>
                <th>Leaf</th>
              </tr>
            </thead>
            <tbody>
              {rowsWithDepth.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.parent_id ?? '-'}</td>
                  <td>{row.path}</td>
                  <td>{row.burmese_name || '-'}</td>
                  <td>{row.quantity ?? 0}</td>
                  <td>{Number(row.leaf) === 1 ? 'Yes' : 'No'}</td>
                </tr>
              ))}
              {rowsWithDepth.length === 0 && (
                <tr>
                  <td colSpan={6} className={styles.empty}>No inventory items yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
