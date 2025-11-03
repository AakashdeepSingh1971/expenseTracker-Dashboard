export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || ""; // Empty means it will use relative /api routes

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    let msg = `API Error: ${res.status}`;
    try {
      const errData = await res.json();
      if (errData.message) msg = errData.message;
    } catch (_) { }
    throw new Error(msg);
  }

  return res.json();
}
