function normalizeAction(action) {
  if (action.action_type !== 'DELETE') {
    return action;
  }

  return {
    ...action,
    action_type: 'UPDATE',
    changed_data: {
      old: {
        soft_delete: 0,
      },
      new: {
        soft_delete: 1,
      },
    },
  };
}

export function simplifyQueue(dirtyMap) {
  const simplified = {};

  Object.values(dirtyMap).forEach((rawAction) => {
    const action = normalizeAction(rawAction);
    const key = `${action.table_name}_${action.row_id}`;
    const existing = simplified[key];

    if (!existing) {
      simplified[key] = { ...action };
      return;
    }

    if (existing.action_type === 'INSERT' && action.action_type === 'UPDATE') {
      existing.changes = {
        ...existing.changes,
        ...action.changed_data.new,
      };
      return;
    }

    if (existing.action_type === 'UPDATE' && action.action_type === 'UPDATE') {
      existing.changed_data.old = {
        ...existing.changed_data.old,
        ...action.changed_data.old,
      };
      existing.changed_data.new = {
        ...existing.changed_data.new,
        ...action.changed_data.new,
      };
    }
  });

  return Object.values(simplified);
}
