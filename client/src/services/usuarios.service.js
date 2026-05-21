const API_URL = "http://localhost:4000/api/usuarios";

const handleResponse = async (response, defaultMessage) => {
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("El servidor no devolvió JSON.");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || defaultMessage);
  }

  return data;
};

export const getUsuariosRequest = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(response, "Error al obtener los usuarios");
};

export const createUsuarioRequest = async (usuario) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(usuario),
  });

  return handleResponse(response, "Error al agregar usuario");
};

export const disableUsuarioRequest = async (id) => {
  const response = await fetch(`${API_URL}/${id}/desactivar`, {
    method: "PATCH",
    credentials: "include",
  });

  return handleResponse(response, "Error al desactivar usuario");
};
