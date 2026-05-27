const BACKEND_URL = "https://protip-backend.onrender.com";

export function getAuthHeaders() {
  const headers = {} as any;
  
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    
    headers["Content-Type"] = "application/json";
    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }
    return headers;
  }
  
  headers["Content-Type"] = "application/json";
  return headers;
}

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const headers = { ...getAuthHeaders(), ...options.headers };
  const response = await fetch(BACKEND_URL + endpoint, { ...options, headers });
  
  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/login";
    }
  }
  return response;
}
