const API_URL = "http://localhost:4000/api/catalogos";

const handleResponse = async (response, errorMessage) => {
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("El servidor no devolvió JSON.");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || errorMessage);
  }

  return data;
};

export const getRolesRequest = async () => {
  const response = await fetch(`${API_URL}/roles`, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(response, "Error al obtener los roles");
};

export const getEstadosUsuarioRequest = async () => {
  const response = await fetch(`${API_URL}/estados-usuario`, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(response, "Error al obtener los estados de usuario");
};

export const getTiposCorralRequest = async () => {
  const response = await fetch(`${API_URL}/tipos-corral`, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(response, "Error al obtener los tipos de corral");
};

export const getEstadosCorralRequest = async () => {
  const response = await fetch(`${API_URL}/estados-corral`, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(response, "Error al obtener los estados de corral");
};