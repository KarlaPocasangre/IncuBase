const BASE_URL = "http://localhost:4000";

export async function httpGet(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("Error en la petición");
  }

  return res.json();
}

export async function httpPost(endpoint, data) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw {
      response: {
        data: result,
      },
    };
  }

  return { data: result };
}