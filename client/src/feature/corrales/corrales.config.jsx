import {
  CalendarDays,
  Fence,
  FileSearch,
  Pencil,
  Plus,
  Wrench,
  XCircle,
} from "lucide-react";

import CorralFormModal from "../../components/corrales/CorralFormModal";
import CorralDetailModal from "../../components/corrales/CorralDetailModal";

const estadoStyles = {
  Activo: "text-emerald-500",
  Cerrado: "text-red-500",
  "En mantenimiento": "text-orange-500",
};

export const corralesConfig = {
  pageTitle: "Corrales",
  pageSubtitle: "Gestión de Corrales",

  cardTitle: "Gestión de Corrales",
  cardDescription: "Administra los corrales del sistema IncuBase",
  cardIcon: Wrench,
  cardIconColor: "text-[#0F7A4F]",

  buttonText: "Agregar Corral",
  buttonIcon: Plus,

  FormModal: CorralFormModal,
  DetailModal: CorralDetailModal,

  searchPlaceholder: "Buscar por código de corral...",

  searchKeys: ["codigo", "ubicacion", "tipo", "estado", "fechaInstalacion"],

  defaultSort: {
    key: "codigo",
    direction: "asc",
    type: "text",
  },

  stats: [
    {
      title: "Total de Corrales",
      value: 0,
      icon: Fence,
      iconColor: "text-[#7BB9A0]",
    },
    {
      title: "Cerrados",
      value: 0,
      dotColor: "bg-red-500",
    },
    {
      title: "En mantenimiento",
      value: 0,
      dotColor: "bg-orange-500",
    },
    {
      title: "Activos",
      value: 0,
      dotColor: "bg-emerald-500",
    },
  ],

  filters: [
    {
      type: "date",
      key: "fechaInstalacion",
      label: "Rango de fecha",
      icon: CalendarDays,
    },
    {
      type: "select",
      key: "tipo",
      label: "Tipo",
      options: [],
    },
    {
      type: "select",
      key: "estado",
      label: "Estado",
      options: [],
    },
  ],

  columns: [
    {
      key: "codigo",
      header: "Código",
      sortable: true,
      sortType: "text",
      defaultSortDirection: "asc",
    },
    {
      key: "ubicacion",
      header: "Ubicación",
    },
    {
      key: "tipo",
      header: "Tipo de corral",
    },
    {
      key: "estado",
      header: "Estado del Corral",
      render: (value) => (
        <span
          className={`inline-flex items-center gap-2 font-semibold ${
            estadoStyles[value] || "text-gray-500"
          }`}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
          {value}
        </span>
      ),
    },
    {
      key: "fechaInstalacion",
      header: "Fecha de instalación",
      sortable: true,
      sortType: "date",
      defaultSortDirection: "asc",
    },
    {
      key: "acciones",
      header: "Acciones",
    },
  ],

  actions: [
    {
      key: "edit",
      label: "Editar",
      icon: Pencil,
      color: "text-[#E6A11D]",
      hover: "hover:bg-orange-50",
    },
    {
      key: "delete",
      label: "Cerrar corral",
      icon: XCircle,
      color: "text-red-400",
      hover: "hover:bg-red-50",
    },
    {
      key: "detail",
      label: "Ver detalle",
      icon: FileSearch,
      color: "text-blue-400",
      hover: "hover:bg-blue-50",
    },
  ],

  emptyTitle: "No hay corrales registrados",
  emptyDescription:
    "Agrega un nuevo corral para comenzar la administración del sistema.",

  data: [],
};