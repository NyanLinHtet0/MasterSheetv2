export function getAncestorPath(node, rowMap) {
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
