const prisma = require("../config/prisma");

function serializeBigInt(data) {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? Number(value) : value,
    ),
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

module.exports = {
  obtenerRoles,
  obtenerEstadosUsuario,
};
