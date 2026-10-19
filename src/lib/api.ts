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
