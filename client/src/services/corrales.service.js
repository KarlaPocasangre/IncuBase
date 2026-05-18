import { httpGet, httpPost } from "./http";

export const obtenerCorrales = async () => {
  const response = await httpGet("/api/corrales");
  return response.data;
};

export const crearCorral = async (data) => {
  const response = await httpPost("/api/corrales", data);
  return response.data;
};