export const getIdEspecie = (nombre) => {
  const especies = {
    Golfina: 1,
    Carey: 2,
    Baula: 3,
    Prieta: 4,
  };

  return especies[nombre] || null;
};

export const buildNidoPayload = (form) => {
  return {
    codigoNido: `N-${Date.now()}`,
    idEspecie: getIdEspecie(form.especie),
    registradoPor: 1,
    idCorral: form.corral,
    fila: form.posicion.fila,
    columna: form.posicion.col,
    fechaHoraDesove: form.fechaDesove,
    fechaHoraSiembra: form.fechaSiembra,
    procedenciaExacta: form.procedencia,
    largoCaparazon: form.largoCurvo,
    anchoCaparazon: form.anchoCurvo,
    profundidadNido: form.profundidadNido,
    cantidadHuevos: form.cantidadHuevos,
    idEstadoNido: 1,
  };
};