export function simplifyQueue(dirtyMap) {
  const simplified = {};

  Object.values(dirtyMap).forEach((action) => {
    const key = `${action.table_name}_${action.row_id}`;
    const existing = simplified[key];

    if (!existing) {
      simplified[key] = action;
      return;
    }

    // Insert + Update = Insert (with merged new data)
    if (existing.action_type === 'INSERT' && action.action_type === 'UPDATE') {
      existing.changes = { ...existing.changes, ...action.changed_data.new };
    }
    // Insert + Delete = Remove entirely from queue (Never happened)
    else if (existing.action_type === 'INSERT' && action.action_type === 'DELETE') {
      delete simplified[key];
    }
    // Update + Delete = Delete
    else if (existing.action_type === 'UPDATE' && action.action_type === 'DELETE') {
      simplified[key] = { ...action, action_type: 'DELETE' };
    }
    // Update + Update = Update (Merge changed fields)
    else if (existing.action_type === 'UPDATE' && action.action_type === 'UPDATE') {
      existing.changed_data.old = { ...existing.changed_data.old, ...action.changed_data.old };
      existing.changed_data.new = { ...existing.changed_data.new, ...action.changed_data.new };
    }
  });

  return Object.values(simplified);
}