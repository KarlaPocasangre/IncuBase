const prisma = require("../config/prisma");

const serializeBigInt = (data) => {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

const obtenerCorrales = async () => {
  const corrales = await prisma.corral.findMany({
    include: {
      tipo_corral: true,
      estado_corral: true,
      usuario: {
        select: {
          nombre: true,
          apellido: true,
        },
      },
    },
    orderBy: {
      id_corral: "desc",
    },
  });

  return serializeBigInt(corrales);
};

const generarCodigoCorral = async () => {
  const ultimoCorral = await prisma.corral.findFirst({
    orderBy: {
      id_corral: "desc",
    },
  });

  const siguienteNumero = ultimoCorral
    ? Number(ultimoCorral.id_corral) + 1
    : 1;

  return `COR-${String(siguienteNumero).padStart(4, "0")}`;
};

const crearCorral = async (data) => {
  const corral = await prisma.corral.create({
    data: {
      codigo: await generarCodigoCorral(),
      ubicacion: data.ubicacion,
      fecha_instalacion: new Date(data.fechaInstalacion),
      id_tipo_corral: Number(data.idTipoCorral),
      id_estado_corral: Number(data.idEstadoCorral),
      observaciones: data.observaciones,
      creado_por: Number(data.creadoPor),
    },
    include: {
      tipo_corral: true,
      estado_corral: true,
      usuario: {
        select: {
          nombre: true,
          apellido: true,
        },
      },
    },
  });

  return serializeBigInt(corral);
};

const actualizarCorral = async (id, data) => {
  const corral = await prisma.corral.update({
    where: {
      id_corral: Number(id),
    },
    data: {
      ubicacion: data.ubicacion,
      fecha_instalacion: new Date(data.fechaInstalacion),
      id_tipo_corral: Number(data.idTipoCorral),
      id_estado_corral: Number(data.idEstadoCorral),
      observaciones: data.observaciones,
    },
    include: {
      tipo_corral: true,
      estado_corral: true,
      usuario: {
        select: {
          nombre: true,
          apellido: true,
        },
      },
    },
  });

  return serializeBigInt(corral);
};

const cerrarCorral = async (id) => {
  const estadoCerrado = await prisma.estado_corral.findFirst({
    where: {
      nombre: "Cerrado",
    },
  });

  if (!estadoCerrado) {
    throw new Error("No existe el estado Cerrado");
  }

  const corralActual = await prisma.corral.findUnique({
    where: {
      id_corral: Number(id),
    },
    include: {
      estado_corral: true,
    },
  });

  if (!corralActual) {
    throw new Error("Corral no encontrado");
  }

  if (corralActual.estado_corral.nombre === "Cerrado") {
    throw new Error("El corral ya está cerrado");
  }

  const corral = await prisma.corral.update({
    where: {
      id_corral: Number(id),
    },
    data: {
      id_estado_corral: Number(estadoCerrado.id_estado_corral),
    },
    include: {
      tipo_corral: true,
      estado_corral: true,
      usuario: {
        select: {
          nombre: true,
          apellido: true,
        },
      },
    },
  });

  return serializeBigInt(corral);
};

module.exports = {
  obtenerCorrales,
  crearCorral,
  actualizarCorral,
  cerrarCorral,
};