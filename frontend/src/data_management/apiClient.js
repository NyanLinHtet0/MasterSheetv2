const DEFAULT_BACKEND_ORIGIN = 'http://localhost:3000';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

function resolveApiPath(path) {
  if (!path.startsWith('/')) {
    throw new Error(`API path must start with '/'. Received: ${path}`);
  }

  return API_BASE ? `${API_BASE}${path}` : path;
}

export async function fetchJson(path, options = {}, errorContext = 'request') {
  const url = resolveApiPath(path);
  let response;

  try {
    response = await fetch(url, options);
  } catch (networkErr) {
    const backendHint =
      API_BASE || import.meta.env.DEV
        ? 'Confirm the backend is reachable and VITE_API_BASE_URL (if set) is correct.'
        : `If you are not using the Vite proxy, set VITE_API_BASE_URL to ${DEFAULT_BACKEND_ORIGIN}.`;

    throw new Error(`Network error during ${errorContext}. ${backendHint}`);
  }

  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    const bodyText = await response.text().catch(() => '');
    const preview = bodyText.slice(0, 120).replace(/\s+/g, ' ').trim();
    throw new Error(
      `${errorContext} failed (${response.status} ${response.statusText}). ${
        preview ? `Response preview: ${preview}` : 'No response body returned.'
      }`
    );
  }

  if (!contentType.includes('application/json')) {
    const bodyText = await response.text().catch(() => '');
    const preview = bodyText.slice(0, 120).replace(/\s+/g, ' ').trim();
    throw new Error(
      `${errorContext} expected JSON but received '${contentType || 'unknown'}'. ${
        preview ? `Response preview: ${preview}` : ''
      }`
    );
  }

  return response.json();
}
