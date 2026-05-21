const BASE_URL = "http://localhost:4000";

function getHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

async function handleResponse(res) {
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

export async function httpGet(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: getHeaders(),
    credentials: "include",
  });

  return handleResponse(res);
}

export async function httpPost(endpoint, data = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: getHeaders(),
    credentials: "include",
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}
