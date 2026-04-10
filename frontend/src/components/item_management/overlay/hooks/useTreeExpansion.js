import { useMemo, useState } from 'react';

export default function useTreeExpansion(expandedIds) {
  const [manualCollapsedIds, setManualCollapsedIds] = useState(new Set());
  const [manualExpandedIds, setManualExpandedIds] = useState(new Set());

  const effectiveExpandedIds = useMemo(() => {
    const set = new Set(expandedIds);
    manualExpandedIds.forEach((id) => set.add(id));
    manualCollapsedIds.forEach((id) => set.delete(id));
    return set;
  }, [expandedIds, manualCollapsedIds, manualExpandedIds]);

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

  return {
    effectiveExpandedIds,
    toggleTreeNode,
  };
}
