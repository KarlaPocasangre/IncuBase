import { useEffect, useMemo, useState } from "react";

import ManagementPage from "../../../components/management/ManagementPage";
import { usuariosConfig } from "../../../feature/usuarios/usuarios.config";

import {
  createUsuarioRequest,
  disableUsuarioRequest,
  getUsuariosRequest,
} from "../../../services/usuarios.service";

import {
  getEstadosUsuarioRequest,
  getRolesRequest,
} from "../../../services/catalogos.service";

import {
  showDisableUserConfirm,
  showInvalidDataAlert,
  showLoadDataError,
  showRegisterError,
  showRegisterSuccess,
  showStatusChangeError,
  showStatusChangeSuccess,
} from "../../../utils/alerts";

import { MODULES } from "../../../constants/modules";

function formatFecha(fecha) {
  if (!fecha) return "Sin fecha";

  return new Date(fecha).toLocaleString("es-SV", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function mapUsuario(usuario) {
  return {
    id: usuario.id_usuario,
    id_rol: usuario.rol?.id_rol || usuario.id_rol,
    id_estado_usuario:
      usuario.estado_usuario?.id_estado_usuario || usuario.id_estado_usuario,

    nombres: usuario.nombre,
    apellidos: usuario.apellido,
    nombreCompleto: `${usuario.nombre} ${usuario.apellido}`,

    email: usuario.email,
    telefono: usuario.telefono || "Sin teléfono",

    rol: usuario.rol?.nombre_rol || "Sin rol",
    estado: usuario.estado_usuario?.nombre || "Sin estado",

    fechaCreacion: formatFecha(usuario.fecha_creacion),
    fechaActualizacion: formatFecha(usuario.fecha_actualizacion),
  };
}

export default function GestionUsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [estadosUsuario, setEstadosUsuario] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuariosRequest();

      const listaUsuarios = data.usuarios || data.data?.usuarios || [];
      const usuariosMapeados = listaUsuarios.map(mapUsuario);

      setUsuarios(usuariosMapeados);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);

      showLoadDataError({
        moduleName: "los usuarios",
      });
    }
  };

  const cargarCatalogos = async () => {
    try {
      const [rolesData, estadosData] = await Promise.all([
        getRolesRequest(),
        getEstadosUsuarioRequest(),
      ]);

      setRoles(rolesData.roles || []);
      setEstadosUsuario(estadosData.estadosUsuario || []);
    } catch (error) {
      console.error("Error al cargar catálogos:", error);

      showLoadDataError({
        moduleName: "los catálogos de usuarios",
      });
    }
  };

  useEffect(() => {
    cargarUsuarios();
    cargarCatalogos();
  }, []);

  const handleAddUsuario = async (formData) => {
    try {
      setLoading(true);

      await createUsuarioRequest({
        nombre: formData.nombres,
        apellido: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono,
        password: formData.password,
        id_rol: formData.id_rol,
        id_estado_usuario: formData.id_estado_usuario,
      });

      await cargarUsuarios();

      showRegisterSuccess({
        module: MODULES.USUARIO,
      });
    } catch (error) {
      console.error("Error al agregar usuario:", error);

      const message = normalizeText(error.message);

      if (
        message.includes("correo") ||
        message.includes("email") ||
        message.includes("ya existe") ||
        message.includes("registrado")
      ) {
        showInvalidDataAlert({
          text: "El correo ingresado ya está registrado. Usa un correo diferente.",
        });
        return;
      }

      showRegisterError({
        module: MODULES.USUARIO,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisableUsuario = async (usuario) => {
    const estadoActual = normalizeText(usuario.estado);

    if (estadoActual === "inactivo") {
      showInvalidDataAlert({
        text: "Este usuario ya se encuentra inactivo.",
      });
      return;
    }

    try {
      const result = await showDisableUserConfirm();

      if (!result.isConfirmed) return;

      setLoading(true);

      await disableUsuarioRequest(usuario.id);

      await cargarUsuarios();

      showStatusChangeSuccess({
        module: MODULES.USUARIO,
      });
    } catch (error) {
      console.error("Error al desactivar usuario:", error);

      showStatusChangeError({
        module: MODULES.USUARIO,
      });
    } finally {
      setLoading(false);
    }
  };

  const pageConfig = useMemo(() => {
    const totalUsuarios = usuarios.length;

    const totalAdministradores = usuarios.filter(
      (usuario) => normalizeText(usuario.rol) === "administrador",
    ).length;

    const totalTecnicos = usuarios.filter((usuario) => {
      const rol = normalizeText(usuario.rol);
      return rol === "tecnico" || rol === "tecnico de campo";
    }).length;

    const totalActivos = usuarios.filter(
      (usuario) => normalizeText(usuario.estado) === "activo",
    ).length;

    return {
      ...usuariosConfig,
      data: [],

      catalogos: {
        roles,
        estadosUsuario,
      },

      filters: usuariosConfig.filters.map((filter) => {
        if (filter.key === "rol") {
          return {
            ...filter,
            options: roles.map((rol) => rol.nombre_rol),
          };
        }

        if (filter.key === "estado") {
          return {
            ...filter,
            options: estadosUsuario.map((estado) => estado.nombre),
          };
        }

        return filter;
      }),

      stats: usuariosConfig.stats.map((stat) => {
        if (stat.title === "Total de Usuarios") {
          return {
            ...stat,
            value: totalUsuarios,
          };
        }

        if (stat.title === "Administradores") {
          return {
            ...stat,
            value: totalAdministradores,
          };
        }

        if (stat.title === "Técnicos de Campo") {
          return {
            ...stat,
            value: totalTecnicos,
          };
        }

        if (stat.title === "Activos") {
          return {
            ...stat,
            value: totalActivos,
          };
        }

        return stat;
      }),
    };
  }, [usuarios, roles, estadosUsuario]);

  return (
    <ManagementPage
      config={pageConfig}
      data={usuarios}
      onCreate={handleAddUsuario}
      onDelete={handleDisableUsuario}
      loading={loading}
    />
  );
}
