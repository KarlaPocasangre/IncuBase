const BASE_URL = "http://localhost:4000";

export async function httpGet(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  return res.json();
}