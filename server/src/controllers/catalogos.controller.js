const prisma = require("../config/prisma");

function serializeBigInt(data) {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );
}

const obtenerRoles = async (req, res) => {
  try {
    const roles = await prisma.rol.findMany({
      select: {
        id_rol: true,
        nombre_rol: true,
        descripcion: true,
      },
      orderBy: {
        id_rol: "asc",
      },
    });

    return res.json({
      ok: true,
      roles: serializeBigInt(roles),
    });
  } catch (error) {
    console.error("Error al obtener roles:", error);

    return res.status(500).json({
      ok: false,
      message: "Error al obtener los roles",
    });
  }
};

const obtenerEstadosUsuario = async (req, res) => {
  try {
    const estadosUsuario = await prisma.estado_usuario.findMany({
      select: {
        id_estado_usuario: true,
        nombre: true,
        descripcion: true,
      },
      orderBy: {
        id_estado_usuario: "asc",
      },
    });

    return res.json({
      ok: true,
      estadosUsuario: serializeBigInt(estadosUsuario),
    });
  } catch (error) {
    console.error("Error al obtener estados de usuario:", error);

    return res.status(500).json({
      ok: false,
      message: "Error al obtener los estados de usuario",
    });
  }
};

const obtenerTiposCorral = async (req, res) => {
  try {
    const tiposCorral = await prisma.tipo_corral.findMany({
      select: {
        id_tipo_corral: true,
        nombre: true,
        descripcion: true,
      },
      orderBy: {
        id_tipo_corral: "asc",
      },
    });

    return res.json({
      ok: true,
      tiposCorral: serializeBigInt(tiposCorral),
    });
  } catch (error) {
    console.error("Error al obtener tipos de corral:", error);

    return res.status(500).json({
      ok: false,
      message: "Error al obtener los tipos de corral",
    });
  }
};

const obtenerEstadosCorral = async (req, res) => {
  try {
    const estadosCorral = await prisma.estado_corral.findMany({
      select: {
        id_estado_corral: true,
        nombre: true,
        descripcion: true,
      },
      orderBy: {
        id_estado_corral: "asc",
      },
    });

    return res.json({
      ok: true,
      estadosCorral: serializeBigInt(estadosCorral),
    });
  } catch (error) {
    console.error("Error al obtener estados de corral:", error);

    return res.status(500).json({
      ok: false,
      message: "Error al obtener los estados de corral",
    });
  }
};

module.exports = {
  obtenerRoles,
  obtenerEstadosUsuario,
  obtenerTiposCorral,
  obtenerEstadosCorral,
};