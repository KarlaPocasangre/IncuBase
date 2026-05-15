import {
  CalendarDays,
  ClockAlert,
  Egg,
  FileCheck,
  FileSearch,
  Pencil,
  Plus,
  Timer,
  XCircle,
} from "lucide-react";

import NidoFormModal from "../../components/nidos/NidoFormModal";
import NidoDetailModal from "../../components/nidos/NidoDetailModal";

const estadoStyles = {
  Registrado: "text-blue-500",
  "En incubación": "text-emerald-500",
  "Próximo a eclosión": "text-orange-500",
  Eclosionado: "text-purple-500",
  Exhumado: "text-slate-500",
};

export const nidosConfig = {
  pageTitle: "Nidos",
  pageSubtitle: "Gestión de Nidos",

  cardTitle: "Gestión de Nidos",
  cardDescription:
    "Administra y consulta los nidos registrados en el sistema IncuBase",
  cardIcon: Egg,
  cardIconColor: "text-[#0F7A4F]",

  buttonText: "Agregar Nido",
  buttonIcon: Plus,
  buttonRedirectTo: "/registro-nidos",

  FormModal: NidoFormModal,
  DetailModal: NidoDetailModal,

  searchPlaceholder: "Buscar por código de nido...",

  searchKeys: [
    "codigoNido",
    "especie",
    "ubicacion",
    "corral",
    "sector",
    "estado",
    "registradoPor",
  ],

  defaultSort: {
    key: "codigoNido",
    direction: "asc",
    type: "text",
  },

  stats: [
    {
      title: "Total de Nidos",
      value: 120,
      icon: Egg,
      iconColor: "text-[#7BB9A0]",
    },
    {
      title: "En incubación",
      value: 84,
      icon: Timer,
      iconColor: "text-[#0F6B3D]",
    },
    {
      title: "Próximos a eclosión",
      value: 12,
      icon: ClockAlert,
      iconColor: "text-orange-500",
    },
    {
      title: "Exhumados",
      value: 24,
      icon: FileCheck,
      iconColor: "text-slate-500",
    },
  ],

  filters: [
    {
      type: "date",
      key: "fechaSiembra",
      label: "Rango de fecha",
      icon: CalendarDays,
    },
    {
      type: "select",
      key: "especie",
      label: "Especie",
      options: ["Golfina", "Carey", "Baula", "Prieta"],
    },
    {
      type: "select",
      key: "estado",
      label: "Estado",
      options: [
        "Registrado",
        "En incubación",
        "Próximo a eclosión",
        "Eclosionado",
        "Exhumado",
      ],
    },
    {
      type: "select",
      key: "corral",
      label: "Corral",
      options: ["C2HJJ-09", "C2HJJ-10", "C2HJJ-11", "C2HJJ-12"],
    },
  ],

  columns: [
    {
      key: "codigoNido",
      header: "Código",
      sortable: true,
      sortType: "text",
      defaultSortDirection: "asc",
    },
    {
      key: "especie",
      header: "Especie",
    },
    {
      key: "ubicacion",
      header: "Corral / Sector",
    },
    {
      key: "cantidadHuevos",
      header: "Huevos",
      sortable: true,
      sortType: "number",
      defaultSortDirection: "asc",
    },
    {
      key: "estado",
      header: "Estado",
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
      key: "fechaSiembra",
      header: "Fecha de siembra",
      sortable: true,
      sortType: "date",
      defaultSortDirection: "asc",
    },
    {
      key: "registradoPor",
      header: "Registrado por",
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
      label: "Eliminar",
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

  emptyTitle: "No hay nidos registrados",
  emptyDescription:
    "Agrega un nuevo nido para comenzar el seguimiento dentro del sistema.",

  data: [
    {
      id: 1,
      codigoNido: "NID-001",
      especie: "Golfina",
      ubicacion: "C2HJJ-09 / A-03",
      corral: "C2HJJ-09",
      sector: "A-03",
      cantidadHuevos: 85,
      estado: "En incubación",
      fechaDesove: "2026-05-01 12:20",
      fechaSiembra: "2026-05-01 14:30",
      profundidadNido: 45,
      largoCaparazon: 62.5,
      anchoCaparazon: 58.2,
      procedenciaExacta:
        "Zona media de la playa, cerca del punto de monitoreo norte.",
      registradoPor: "José Gilverto",
      observaciones: "Nido trasladado sin incidentes.",
    },
    {
      id: 2,
      codigoNido: "NID-002",
      especie: "Carey",
      ubicacion: "C2HJJ-10 / B-01",
      corral: "C2HJJ-10",
      sector: "B-01",
      cantidadHuevos: 92,
      estado: "Próximo a eclosión",
      fechaDesove: "2026-04-20 06:50",
      fechaSiembra: "2026-04-20 08:15",
      profundidadNido: 48,
      largoCaparazon: 68.4,
      anchoCaparazon: 61.7,
      procedenciaExacta:
        "Zona sur de la playa, a pocos metros del límite de marea alta.",
      registradoPor: "Ana Cáceres",
      observaciones:
        "Nido con seguimiento prioritario por cercanía a eclosión.",
    },
    {
      id: 3,
      codigoNido: "NID-003",
      especie: "Baula",
      ubicacion: "C2HJJ-11 / C-04",
      corral: "C2HJJ-11",
      sector: "C-04",
      cantidadHuevos: 70,
      estado: "Eclosionado",
      fechaDesove: "2026-03-18 15:35",
      fechaSiembra: "2026-03-18 17:00",
      profundidadNido: 52,
      largoCaparazon: 110.2,
      anchoCaparazon: 78.6,
      procedenciaExacta:
        "Zona centro de la playa, sector de monitoreo cercano al acceso principal.",
      registradoPor: "Mario Tesorero",
      observaciones: "Nido eclosionado correctamente.",
    },
    {
      id: 4,
      codigoNido: "NID-004",
      especie: "Prieta",
      ubicacion: "C2HJJ-12 / D-02",
      corral: "C2HJJ-12",
      sector: "D-02",
      cantidadHuevos: 78,
      estado: "Exhumado",
      fechaDesove: "2026-02-12 08:10",
      fechaSiembra: "2026-02-12 09:45",
      profundidadNido: 43,
      largoCaparazon: 72.8,
      anchoCaparazon: 65.3,
      procedenciaExacta:
        "Zona este de la playa, cerca del área de vegetación costera.",
      registradoPor: "Juan Ramón",
      observaciones: "Nido exhumado y registrado en el sistema.",
    },
  ],
};
