import { simplifyQueue } from './syncSimplifier';

export async function pushSyncPayload(dirtyMap, currentAuditId, fetchLatestAuditFn) {
  const payload = simplifyQueue(dirtyMap);
  if (payload.length === 0) return { success: true };

  const response = await fetch('http://localhost:3000/api/sync/push', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_audit_id: currentAuditId,
      actions: payload,
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (response.status === 409 && result.out_of_date) {
    await fetchLatestAuditFn();
    return { success: false, retryNeeded: true };
  }

  if (!response.ok) {
    return {
      success: false,
      error: result.error || 'Failed to save changes',
      server_response: result,
    };
  }

  return {
    success: true,
    current_audit_id: result.current_audit_id,
    simulated_backend: result.simulated_backend,
    server_response: result,
  };
}
