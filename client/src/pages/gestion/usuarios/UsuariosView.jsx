import { useEffect, useMemo, useState } from "react";

import ManagementPage from "../../../components/management/ManagementPage";
import { usuariosConfig } from "../../../feature/usuarios/usuarios.config";
import {
  createUsuarioRequest,
  getUsuariosRequest,
} from "../../../services/usuarios.service";
import {
  getEstadosUsuarioRequest,
  getRolesRequest,
} from "../../../services/catalogos.service";

import {
  showInvalidDataAlert,
  showLoadDataError,
  showRegisterError,
  showRegisterSuccess,
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

      const message = error.message || "";

      if (
        message.toLowerCase().includes("correo") ||
        message.toLowerCase().includes("email") ||
        message.toLowerCase().includes("ya existe") ||
        message.toLowerCase().includes("registrado")
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

  const pageConfig = useMemo(() => {
    const totalUsuarios = usuarios.length;

    const totalAdministradores = usuarios.filter(
      (usuario) => usuario.rol === "Administrador",
    ).length;

    const totalTecnicos = usuarios.filter(
      (usuario) => usuario.rol === "Técnico" || usuario.rol === "Tecnico",
    ).length;

    const totalActivos = usuarios.filter(
      (usuario) => usuario.estado === "Activo",
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
      loading={loading}
    />
  );
}
