import { useEffect, useMemo, useState } from "react";

import ManagementPage from "../../../components/management/ManagementPage";
import { corralesConfig } from "../../../feature/corrales/corrales.config";

import {
  obtenerCorrales,
  crearCorral,
  actualizarCorral,
  cerrarCorral,
} from "../../../services/corrales.service";

import {
  getTiposCorralRequest,
  getEstadosCorralRequest,
} from "../../../services/catalogos.service";

import {
  showCloseCorralConfirm,
  showRegisterSuccess,
  showRegisterError,
  showUpdateSuccess,
  showUpdateError,
  showStatusChangeSuccess,
  showStatusChangeError,
  showWarningAlert,
} from "../../../utils/alerts";

const CORRALES_MODULE = {
  article: "El",
  label: "corral",
};

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return dateString;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function mapCorral(corral) {
  return {
    id: corral.id_corral,
    codigo: corral.codigo,
    ubicacion: corral.ubicacion,
    fechaInstalacion: formatDate(corral.fecha_instalacion),
    fechaCreacion: formatDate(corral.fecha_creacion),
    idTipoCorral: corral.id_tipo_corral,
    idEstadoCorral: corral.id_estado_corral,
    tipo: corral.tipo_corral?.nombre || "",
    estado: corral.estado_corral?.nombre || "",
    creadoPor: corral.usuario
      ? `${corral.usuario.nombre || ""} ${corral.usuario.apellido || ""}`.trim()
      : "Usuario no disponible",
    observaciones: corral.observaciones || "",
  };
}

function getUsuarioId() {
  const usuarioGuardado = localStorage.getItem("usuario");

  if (!usuarioGuardado) return 1;

  try {
    const usuario = JSON.parse(usuarioGuardado);
    return Number(usuario.id_usuario || usuario.id || 1);
  } catch {
    return 1;
  }
}

function GestionCorralesPage() {
  const [corrales, setCorrales] = useState([]);
  const [tiposCorral, setTiposCorral] = useState([]);
  const [estadosCorral, setEstadosCorral] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarDatos = async () => {
    try {
      setLoading(true);

      const [corralesData, tiposData, estadosData] = await Promise.all([
        obtenerCorrales(),
        getTiposCorralRequest(),
        getEstadosCorralRequest(),
      ]);

      setCorrales(corralesData.map(mapCorral));
      setTiposCorral(tiposData.tiposCorral || []);
      setEstadosCorral(estadosData.estadosCorral || []);
    } catch (error) {
      console.error("Error al cargar corrales:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const stats = useMemo(() => {
    const total = corrales.length;
    const activos = corrales.filter((c) => c.estado === "Activo").length;
    const cerrados = corrales.filter((c) => c.estado === "Cerrado").length;
    const mantenimiento = corrales.filter(
      (c) => c.estado === "En mantenimiento"
    ).length;

    return corralesConfig.stats.map((stat) => {
      if (stat.title === "Total de Corrales") {
        return { ...stat, value: total };
      }

      if (stat.title === "Cerrados") {
        return { ...stat, value: cerrados };
      }

      if (stat.title === "En mantenimiento") {
        return { ...stat, value: mantenimiento };
      }

      if (stat.title === "Activos") {
        return { ...stat, value: activos };
      }

      return stat;
    });
  }, [corrales]);

  const filters = useMemo(() => {
    return corralesConfig.filters.map((filter) => {
      if (filter.key === "tipo") {
        return {
          ...filter,
          options: tiposCorral.map((tipo) => ({
            value: tipo.nombre,
            label: tipo.nombre,
          })),
        };
      }

      if (filter.key === "estado") {
        return {
          ...filter,
          options: estadosCorral.map((estado) => ({
            value: estado.nombre,
            label: estado.nombre,
          })),
        };
      }

      return filter;
    });
  }, [tiposCorral, estadosCorral]);

  const config = useMemo(() => {
    return {
      ...corralesConfig,
      data: [],
      stats,
      filters,
      catalogos: {
        tiposCorral,
        estadosCorral,
      },
      actions: corralesConfig.actions.map((action) => {
        if (action.key !== "delete") return action;

        return {
          ...action,
          label: "Cerrar corral",
          hiddenWhen: (corral) => corral.estado === "Cerrado",
        };
      }),
    };
  }, [stats, filters, tiposCorral, estadosCorral]);

  const handleCreate = async (payload) => {
    try {
      await crearCorral({
        ...payload,
        creadoPor: getUsuarioId(),
      });

      await cargarDatos();

      showRegisterSuccess({
        module: CORRALES_MODULE,
      });
    } catch (error) {
      console.error("Error al crear corral:", error);

      showRegisterError({
        module: CORRALES_MODULE,
      });
    }
  };

  const handleUpdate = async (payload) => {
    try {
      await actualizarCorral(payload.id, payload);

      await cargarDatos();

      showUpdateSuccess({
        module: CORRALES_MODULE,
      });
    } catch (error) {
      console.error("Error al actualizar corral:", error);

      showUpdateError({
        module: CORRALES_MODULE,
      });
    }
  };

  const handleClose = async (corral) => {
    if (corral.estado === "Cerrado") {
      showWarningAlert({
        title: "Corral ya cerrado",
        text: "Este corral ya se encuentra cerrado.",
      });
      return;
    }

    const result = await showCloseCorralConfirm();

    if (!result.isConfirmed) return;

    try {
      await cerrarCorral(corral.id);

      await cargarDatos();

      showStatusChangeSuccess({
        module: CORRALES_MODULE,
      });
    } catch (error) {
      console.error("Error al cerrar corral:", error);

      showStatusChangeError({
        module: CORRALES_MODULE,
      });
    }
  };

  return (
    <ManagementPage
      config={config}
      data={corrales}
      loading={loading}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleClose}
    />
  );
}

export default GestionCorralesPage;