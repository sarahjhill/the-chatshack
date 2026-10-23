// Small shared helper for talking to the Django backend (see backend/).
// VITE_API_URL is set in .env for local dev and .env.production for the
// live build (see those files) - if it's not set, forms simply can't
// submit yet and callers should show a friendly message.
export const API_URL = import.meta.env.VITE_API_URL as string | undefined;

/**
 * POST a JSON body to one of the backend's form-submission endpoints.
 * Returns true on success, false on any failure (network error, or a
 * non-2xx response - typically a validation error from the serializer).
 */
export async function postToApi(path: string, data: Record<string, unknown>): Promise<boolean> {
  if (!API_URL) return false;
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * GET a JSON resource from the backend. Returns the parsed data, or null
 * on any failure (API not configured, network error, non-2xx response).
 */
export async function getJsonFromApi<T>(path: string): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * POST a JSON body and return the parsed JSON response, or null on any
 * failure. Unlike postToApi, this also surfaces the server's error
 * message (if any) so callers can show it to the person.
 */
export async function postJsonToApi<T>(
  path: string,
  data: Record<string, unknown>
): Promise<{ ok: true; data: T } | { ok: false; detail: string }> {
  if (!API_URL) return { ok: false, detail: "Payments aren't available right now - please try again soon." };
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) {
      return { ok: false, detail: (body && body.detail) || "Something went wrong - please try again." };
    }
    return { ok: true, data: body as T };
  } catch {
    return { ok: false, detail: "Couldn't reach the server - please check your connection and try again." };
  }
}
