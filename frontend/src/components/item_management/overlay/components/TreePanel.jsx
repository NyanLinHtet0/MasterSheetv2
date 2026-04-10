import styles from '../../ItemManagementOverlay.module.css';
import { getLocalizedName } from '../../../helpers/nameLocalization';

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

export default function TreePanel({
  rootNodes,
  childrenByParent,
  effectiveExpandedIds,
  toggleTreeNode,
  handleSelectTreeNode,
  parentId,
  languageMode,
  formatQty,
  handleTreeContextMenu,
  onStartTree,
  isAddingItemInline = false,
  addItemParentNode = null,
  onInlineAddSubmit,
  newItemName,
  setNewItemName,
  newItemBurmeseName,
  setNewItemBurmeseName,
  onCancelInlineAdd,
}) {
  const inlineForm = isAddingItemInline ? (
    <form className={styles.inlineAddItemForm} onSubmit={onInlineAddSubmit}>
      <div className={styles.inlineAddItemHeader}>
        Add item under: {addItemParentNode ? getLocalizedName(addItemParentNode, languageMode) : 'Root layer'}
      </div>
      <input
        type="text"
        placeholder="English name"
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
      <div className={styles.inlineAddItemActions}>
        <button type="button" onClick={onCancelInlineAdd}>Cancel</button>
        <button type="submit" disabled={!String(newItemName || '').trim()}>Add</button>
      </div>
    </form>
  ) : null;

  if (rootNodes.length === 0) {
    return (
      <div className={styles.emptyList}>
        <div>No items in tree yet.</div>
        {!isAddingItemInline && (
          <button
            type="button"
            className={styles.emptyTreeAddButton}
            onClick={onStartTree}
          >
            Add first item
          </button>
        )}
        {inlineForm}
      </div>
    );
  }

  return (
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
      {inlineForm}
    </div>
  );
}
