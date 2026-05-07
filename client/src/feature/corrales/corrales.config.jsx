import { CalendarPlus, Fence } from "lucide-react";

import CorralFormModal from "../../components/corrales/CorralFormModal";
import CorralDetailModal from "../../components/corrales/CorralDetailModal";

const statusStyles = {
  Activo: "text-emerald-500",
  Cerrado: "text-red-500",
  Mantenimiento: "text-orange-400",
};

export const corralesConfig = {
  pageTitle: "Corrales",
  pageSubtitle: "Gestión de Corrales",

  cardTitle: "Gestión de Corrales",
  cardDescription: "Administra los corrales del sistema IncuBase",
  buttonText: "Agregar Corral",

  searchPlaceholder: "Buscar por código de corral...",
  filters: ["Rango de fecha", "Tipo", "Estado"],

  FormModal: CorralFormModal,
  DetailModal: CorralDetailModal,

  stats: [
    {
      title: "Total de Corrales",
      value: 8,
      icon: Fence,
      iconColor: "text-[#7BB9A0]",
    },
    {
      title: "Cerrados",
      value: 2,
      dotColor: "bg-red-500",
    },
    {
      title: "En mantenimiento",
      value: 6,
      dotColor: "bg-orange-400",
    },
    {
      title: "Activos",
      value: 6,
      dotColor: "bg-emerald-500",
    },
  ],

  columns: [
    { header: "Código", key: "codigo" },
    { header: "Ubicación", key: "ubicacion" },
    { header: "Tipo de corral", key: "tipo" },

    {
      header: "Estado del Corral",
      key: "estado",
      render: (value) => (
        <span
          className={`flex items-center gap-2 font-semibold ${
            statusStyles[value] || "text-gray-500"
          }`}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
          {value}
        </span>
      ),
    },

    {
      header: "Fecha de instalación",
      key: "fechaInstalacion",
      renderHeader: () => (
        <span className="flex items-center gap-2">
          Fecha de instalación
          <CalendarPlus className="h-5 w-5 text-[#52645E]" />
        </span>
      ),
    },

    {
      header: "Acciones",
      key: "acciones",
    },
  ],

  data: [
    {
      codigo: "C2HJJ-09",
      ubicacion: "Zona Norte",
      tipo: "Corral Abierto",
      estado: "Activo",
      fechaInstalacion: "2023-10-02 15:04",
      creadoPor: "Kaxierjo",
      fechaCreacion: "2023-10-02 15:04",
      observaciones: "Corral ubicado en zona norte.",
    },
    {
      codigo: "C2HJJ-10",
      ubicacion: "Zona Sur",
      tipo: "Corral Cerrado",
      estado: "Cerrado",
      fechaInstalacion: "2023-10-02 15:04",
      creadoPor: "Kaxierjo",
      fechaCreacion: "2023-10-02 15:04",
      observaciones: "Corral cerrado temporalmente.",
    },
    {
      codigo: "C2HJJ-11",
      ubicacion: "Zona Centro",
      tipo: "Corral Abierto",
      estado: "Activo",
      fechaInstalacion: "2005-01-01 11:45",
      creadoPor: "Kaxierjo",
      fechaCreacion: "2005-01-01 11:45",
      observaciones: "Sin observaciones registradas.",
    },
    {
      codigo: "C2HJJ-12",
      ubicacion: "Zona Este",
      tipo: "Corral Cerrado",
      estado: "Mantenimiento",
      fechaInstalacion: "2026-11-01 21:00",
      creadoPor: "Kaxierjo",
      fechaCreacion: "2026-11-01 21:00",
      observaciones: "Corral en mantenimiento.",
    },
  ],
};
