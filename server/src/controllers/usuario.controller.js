const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");

function serializeBigInt(data) {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === "bigint" ? Number(value) : value,
    ),
  );
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function getAuthenticatedUser(req) {
  return req.usuario || req.user || req.authUser || null;
}

async function getUsuarioAutenticadoCompleto(req) {
  const usuarioAutenticado = getAuthenticatedUser(req);

  const idUsuario =
    usuarioAutenticado?.id_usuario ||
    usuarioAutenticado?.id ||
    usuarioAutenticado?.userId;

  if (!idUsuario) return null;

  return prisma.usuario.findUnique({
    where: {
      id_usuario: BigInt(idUsuario),
    },
    include: {
      rol: true,
      estado_usuario: true,
    },
  });
}

const usuarioSelect = {
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
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: usuarioSelect,
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

    const emailNormalizado = email.trim().toLowerCase();

    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        email: emailNormalizado,
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
        email: emailNormalizado,
        telefono: telefono?.trim() || null,
        password_hash,
        id_rol: BigInt(id_rol),
        id_estado_usuario: BigInt(id_estado_usuario),
      },
      select: usuarioSelect,
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

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nombre,
      apellido,
      email,
      telefono,
      id_rol,
      id_estado_usuario,
      adminPassword,
    } = req.body;

    if (!nombre || !apellido || !email || !id_rol || !id_estado_usuario) {
      return res.status(400).json({
        ok: false,
        message: "Todos los campos obligatorios deben completarse",
      });
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        id_usuario: BigInt(id),
      },
      include: {
        rol: true,
        estado_usuario: true,
      },
    });

    if (!usuarioExistente) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    const emailNormalizado = email.trim().toLowerCase();

    const correoEnUso = await prisma.usuario.findFirst({
      where: {
        email: emailNormalizado,
        NOT: {
          id_usuario: BigInt(id),
        },
      },
    });

    if (correoEnUso) {
      return res.status(409).json({
        ok: false,
        message: "Ya existe un usuario con ese correo",
      });
    }

    const usuarioAutenticado = await getUsuarioAutenticadoCompleto(req);

    if (!usuarioAutenticado) {
      return res.status(401).json({
        ok: false,
        message: "No se pudo validar la sesión del usuario",
      });
    }

    const esMismoUsuario = Number(usuarioAutenticado.id_usuario) === Number(id);

    const cambioRol = Number(usuarioExistente.id_rol) !== Number(id_rol);

    const cambioEstado =
      Number(usuarioExistente.id_estado_usuario) !== Number(id_estado_usuario);

    const rolAutenticado = normalizeText(usuarioAutenticado.rol?.nombre_rol);
    const esAdminAutenticado = rolAutenticado === "administrador";

    if (esMismoUsuario && cambioRol) {
      return res.status(403).json({
        ok: false,
        message: "No puedes cambiar tu propio rol",
      });
    }

    if (esMismoUsuario && cambioEstado) {
      return res.status(403).json({
        ok: false,
        message: "No puedes cambiar tu propio estado",
      });
    }

    if (cambioRol) {
      if (!esAdminAutenticado) {
        return res.status(403).json({
          ok: false,
          message: "Solo un administrador puede cambiar roles",
        });
      }

      const nuevoRol = await prisma.rol.findUnique({
        where: {
          id_rol: BigInt(id_rol),
        },
      });

      if (!nuevoRol) {
        return res.status(404).json({
          ok: false,
          message: "El rol seleccionado no existe",
        });
      }

      const nuevoRolEsAdministrador =
        normalizeText(nuevoRol.nombre_rol) === "administrador";

      if (nuevoRolEsAdministrador) {
        if (!adminPassword) {
          return res.status(400).json({
            ok: false,
            message: "Debes ingresar la contraseña del administrador",
          });
        }

        const passwordValida = await bcrypt.compare(
          adminPassword,
          usuarioAutenticado.password_hash,
        );

        if (!passwordValida) {
          return res.status(401).json({
            ok: false,
            message: "Contraseña de administrador incorrecta",
          });
        }
      }

      const rolActualEsAdministrador =
        normalizeText(usuarioExistente.rol?.nombre_rol) === "administrador";

      const nuevoRolNoEsAdministrador =
        normalizeText(nuevoRol.nombre_rol) !== "administrador";

      if (rolActualEsAdministrador && nuevoRolNoEsAdministrador) {
        const estadoActivo = await prisma.estado_usuario.findUnique({
          where: {
            nombre: "Activo",
          },
        });

        if (estadoActivo) {
          const administradoresActivos = await prisma.usuario.count({
            where: {
              id_rol: usuarioExistente.id_rol,
              id_estado_usuario: estadoActivo.id_estado_usuario,
            },
          });

          if (administradoresActivos <= 1) {
            return res.status(400).json({
              ok: false,
              message:
                "No puedes quitar el rol al último administrador activo del sistema",
            });
          }
        }
      }
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: {
        id_usuario: BigInt(id),
      },
      data: {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email: emailNormalizado,
        telefono: telefono?.trim() || null,
        id_rol: BigInt(id_rol),
        id_estado_usuario: BigInt(id_estado_usuario),
      },
      select: usuarioSelect,
    });

    return res.json({
      ok: true,
      message: "Usuario actualizado correctamente",
      usuario: serializeBigInt(usuarioActualizado),
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);

    return res.status(500).json({
      ok: false,
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

const desactivarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioAutenticado = await getUsuarioAutenticadoCompleto(req);

    if (!usuarioAutenticado) {
      return res.status(401).json({
        ok: false,
        message: "No se pudo validar la sesión del usuario",
      });
    }

    const esMismoUsuario = Number(usuarioAutenticado.id_usuario) === Number(id);

    if (esMismoUsuario) {
      return res.status(403).json({
        ok: false,
        message: "No puedes desactivar tu propio usuario",
      });
    }

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

    const estadoActivo = await prisma.estado_usuario.findUnique({
      where: {
        nombre: "Activo",
      },
    });

    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        id_usuario: BigInt(id),
      },
      include: {
        rol: true,
        estado_usuario: true,
      },
    });

    if (!usuarioExistente) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    if (normalizeText(usuarioExistente.estado_usuario?.nombre) === "inactivo") {
      return res.status(400).json({
        ok: false,
        message: "Este usuario ya se encuentra inactivo",
      });
    }

    const rolUsuario = normalizeText(usuarioExistente.rol?.nombre_rol);

    if (rolUsuario === "administrador" && estadoActivo) {
      const administradoresActivos = await prisma.usuario.count({
        where: {
          id_rol: usuarioExistente.id_rol,
          id_estado_usuario: estadoActivo.id_estado_usuario,
        },
      });

      if (administradoresActivos <= 1) {
        return res.status(400).json({
          ok: false,
          message: "No puedes desactivar el último administrador activo",
        });
      }
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: {
        id_usuario: BigInt(id),
      },
      data: {
        id_estado_usuario: estadoInactivo.id_estado_usuario,
      },
      select: usuarioSelect,
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
  actualizarUsuario,
  desactivarUsuario,
};
