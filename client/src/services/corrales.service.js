import { httpGet, httpPost, httpPut, httpPatch } from "./http";

export const obtenerCorrales = async () => {
  const response = await httpGet("/api/corrales");
  return response.data;
};

export const crearCorral = async (data) => {
  const response = await httpPost("/api/corrales", data);
  return response.data;
};

export const actualizarCorral = async (id, data) => {
  const response = await httpPut(`/api/corrales/${id}`, data);
  return response.data;
};

export const cerrarCorral = async (id) => {
  const response = await httpPatch(`/api/corrales/${id}/cerrar`);
  return response.data;
};