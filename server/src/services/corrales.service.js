const prisma = require("../config/prisma");

const serializeBigInt = (data) => {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value,
    ),
  );
};

const formatCorral = (corral) => {
  return {
    id_corral: corral.id_corral,
    id: corral.id_corral,

    codigo: corral.codigo,
    ubicacion: corral.ubicacion,

    fechaInstalacion: corral.fecha_instalacion,
    fechaCreacion: corral.fecha_creacion,

    idTipoCorral: corral.id_tipo_corral,
    idEstadoCorral: corral.id_estado_corral,

    tipo: corral.tipo_corral?.nombre || "Sin tipo",
    estado: corral.estado_corral?.nombre || "Sin estado",

    observaciones: corral.observaciones,

    creadoPor: corral.creado_por,

    tipo_corral: corral.tipo_corral,
    estado_corral: corral.estado_corral,
  };
};

const obtenerCorrales = async () => {
  const corrales = await prisma.corral.findMany({
    include: {
      tipo_corral: true,
      estado_corral: true,
    },
    orderBy: {
      id_corral: "asc",
    },
  });

  const corralesFormateados = corrales.map(formatCorral);

  return serializeBigInt(corralesFormateados);
};

const generarCodigoCorral = async () => {
  const ultimoCorral = await prisma.corral.findFirst({
    orderBy: {
      id_corral: "desc",
    },
  });

  const siguienteNumero = ultimoCorral ? Number(ultimoCorral.id_corral) + 1 : 1;

  return `COR-${String(siguienteNumero).padStart(4, "0")}`;
};

const crearCorral = async (data) => {
  const codigoGenerado = await generarCodigoCorral();

  const corral = await prisma.corral.create({
    data: {
      codigo: codigoGenerado,
      ubicacion: data.ubicacion,
      fecha_instalacion: new Date(data.fechaInstalacion),
      id_tipo_corral: Number(data.idTipoCorral),
      id_estado_corral: Number(data.idEstadoCorral),
      observaciones: data.observaciones || null,
      creado_por: Number(data.creadoPor),
    },
    include: {
      tipo_corral: true,
      estado_corral: true,
    },
  });

  return serializeBigInt(formatCorral(corral));
};

module.exports = {
  obtenerCorrales,
  crearCorral,
};
