import { simplifyQueue } from './syncSimplifier';
import { fetchJson } from './apiClient';

export async function pushSyncPayload(dirtyMap, currentAuditId, fetchLatestAuditFn) {
  const payload = simplifyQueue(dirtyMap);
  if (payload.length === 0) return { success: true };

  try {
    const result = await fetchJson(
      '/api/sync/push',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_audit_id: currentAuditId,
          actions: payload,
        }),
      },
      'Sync push'
    );

    return {
      success: true,
      current_audit_id: result.current_audit_id,
      simulated_backend: result.simulated_backend,
      server_response: result,
    };
  } catch (error) {
    const message = error?.message || '';

    if (message.includes('(409')) {
      await fetchLatestAuditFn();
      return { success: false, retryNeeded: true };
    }

    return {
      success: false,
      error: message || 'Failed to save changes',
      server_response: {},
    };
  }
}
