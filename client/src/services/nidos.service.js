import { httpGet, httpPost } from "./http";

export const obtenerNidosPorCorral = async (idCorral) => {
  const response = await httpGet(`/api/nidos/corral/${idCorral}`);
  return response.data;
};

export const crearNido = async (data) => {
  const response = await httpPost("/api/nidos", data);
  return response.data;
};