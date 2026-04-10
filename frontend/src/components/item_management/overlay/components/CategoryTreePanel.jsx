import styles from '../../ItemManagementOverlay.module.css';

function CategoryTreeNode({
  node,
  depth = 0,
  childrenByParent,
  expandedIds,
  onToggleExpand,
  onSelect,
  selectedKey,
  onContextMenu,
}) {
  const children = childrenByParent.get(node.key) || [];
  const hasChildren = children.length > 0;
  const isExpanded = expandedIds.has(node.key);
  const isSelected = selectedKey === node.key;

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
            if (hasChildren) onToggleExpand(node.key);
          }}
        >
          {hasChildren ? (isExpanded ? '▾' : '▸') : '•'}
        </span>
        <span className={styles.treeLabel}>{node.label}</span>
      </button>

      {hasChildren && isExpanded && children.map((child) => (
        <CategoryTreeNode
          key={child.key}
          node={child}
          depth={depth + 1}
          childrenByParent={childrenByParent}
          expandedIds={expandedIds}
          onToggleExpand={onToggleExpand}
          onSelect={onSelect}
          selectedKey={selectedKey}
          onContextMenu={onContextMenu}
        />
      ))}
    </>
  );
}

export default function CategoryTreePanel({
  rootNodes,
  childrenByParent,
  effectiveExpandedIds,
  toggleTreeNode,
  onSelectNode,
  selectedKey,
  onContextMenu,
}) {
  if (rootNodes.length === 0) {
    return <div className={styles.emptyList}>No categories in tree yet.</div>;
  }

  return (
    <div className={styles.treePanel}>
      {rootNodes.map((node) => (
        <CategoryTreeNode
          key={node.key}
          node={node}
          childrenByParent={childrenByParent}
          expandedIds={effectiveExpandedIds}
          onToggleExpand={toggleTreeNode}
          onSelect={onSelectNode}
          selectedKey={selectedKey}
          onContextMenu={onContextMenu}
        />
      ))}
    </div>
  );
}
