import { useEffect, useMemo, useState } from "react";

import ManagementPage from "../../../components/management/ManagementPage";
import { usuariosConfig } from "../../../feature/usuarios/usuarios.config";
import {
  createUsuarioRequest,
  getUsuariosRequest,
} from "../../../services/usuarios.service";

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
  const [loading, setLoading] = useState(false);

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuariosRequest();

      const listaUsuarios = data.usuarios || data.data?.usuarios || [];
      const usuariosMapeados = listaUsuarios.map(mapUsuario);

      setUsuarios(usuariosMapeados);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      alert(error.message || "Error al cargar los usuarios");
    }
  };

  useEffect(() => {
    cargarUsuarios();
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
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert(error.message || "Error al agregar usuario");
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
  }, [usuarios]);

  return (
    <ManagementPage
      config={pageConfig}
      data={usuarios}
      onCreate={handleAddUsuario}
      loading={loading}
    />
  );
}
