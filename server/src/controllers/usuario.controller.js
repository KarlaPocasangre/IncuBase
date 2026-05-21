const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");

function serializeBigInt(data) {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? Number(value) : value,
    ),
  );
}

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        email: true,
        telefono: true,
        fecha_creacion: true,
        rol: {
          select: {
            id_rol: true,
            nombre_rol: true,
          },
        },
        estado_usuario: {
          select: {
            id_estado_usuario: true,
            nombre: true,
          },
        },
      },
      orderBy: {
        id_usuario: "desc",
      },
    });

    return res.json({
      ok: true,
      usuarios: serializeBigInt(usuarios),
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);

    return res.status(500).json({
      ok: false,
      message: "Error al obtener los usuarios",
      error: error.message,
    });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      telefono,
      password,
      id_rol,
      id_estado_usuario,
    } = req.body;

    if (
      !nombre ||
      !apellido ||
      !email ||
      !password ||
      !id_rol ||
      !id_estado_usuario
    ) {
      return res.status(400).json({
        ok: false,
        message: "Todos los campos obligatorios deben completarse",
      });
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (usuarioExistente) {
      return res.status(409).json({
        ok: false,
        message: "Ya existe un usuario con ese correo",
      });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email: email.trim().toLowerCase(),
        telefono: telefono?.trim() || null,
        password_hash,
        id_rol: BigInt(id_rol),
        id_estado_usuario: BigInt(id_estado_usuario),
      },
      select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        email: true,
        telefono: true,
        fecha_creacion: true,
        rol: {
          select: {
            id_rol: true,
            nombre_rol: true,
          },
        },
        estado_usuario: {
          select: {
            id_estado_usuario: true,
            nombre: true,
          },
        },
      },
    });

    return res.status(201).json({
      ok: true,
      message: "Usuario agregado correctamente",
      usuario: serializeBigInt(nuevoUsuario),
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);

    return res.status(500).json({
      ok: false,
      message: "Error al crear el usuario",
      error: error.message,
    });
  }
};

const desactivarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const estadoInactivo = await prisma.estado_usuario.findUnique({
      where: {
        nombre: "Inactivo",
      },
    });

    if (!estadoInactivo) {
      return res.status(404).json({
        ok: false,
        message: "No existe el estado Inactivo en la base de datos",
      });
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        id_usuario: BigInt(id),
      },
    });

    if (!usuarioExistente) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: {
        id_usuario: BigInt(id),
      },
      data: {
        id_estado_usuario: estadoInactivo.id_estado_usuario,
      },
      select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        email: true,
        telefono: true,
        fecha_creacion: true,
        rol: {
          select: {
            id_rol: true,
            nombre_rol: true,
          },
        },
        estado_usuario: {
          select: {
            id_estado_usuario: true,
            nombre: true,
          },
        },
      },
    });

    return res.json({
      ok: true,
      message: "Usuario desactivado correctamente",
      usuario: serializeBigInt(usuarioActualizado),
    });
  } catch (error) {
    console.error("Error al desactivar usuario:", error);

    return res.status(500).json({
      ok: false,
      message: "Error al desactivar el usuario",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  desactivarUsuario,
};
