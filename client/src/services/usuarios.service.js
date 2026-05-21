const API_URL = "http://localhost:4000/api/usuarios";

export const getUsuariosRequest = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });

  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    console.error("Respuesta no JSON:", text);

    throw new Error(
      "El servidor no devolvió JSON. Revisa si la ruta /api/usuarios existe.",
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener usuarios");
  }

  return data;
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

  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    console.error("Respuesta no JSON:", text);

    throw new Error(
      "El servidor no devolvió JSON. Revisa si la ruta POST /api/usuarios existe.",
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al agregar usuario");
  }

  return data;
};
