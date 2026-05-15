import {
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  FileSearch,
  Pencil,
  Plus,
  Skull,
  Turtle,
  XCircle,
} from "lucide-react";

import NacimientoFormModal from "../../components/nacimientos/NacimientoFormModal";
import NacimientoDetailModal from "../../components/nacimientos/NacimientoDetailModal";

export const nacimientosConfig = {
  pageTitle: "Eclosión",
  pageSubtitle: "Gestión de Nacimientos",

  cardTitle: "Gestión de Nacimientos",
  cardDescription: "Administra los nacimientos del sistema IncuBase",
  cardIcon: Turtle,
  cardIconColor: "text-[#0F7A4F]",

  buttonText: "Registrar Nacimiento",
  buttonIcon: Plus,
  buttonRedirectTo: "/nacimientos",

  FormModal: NacimientoFormModal,
  DetailModal: NacimientoDetailModal,

  searchPlaceholder: "Buscar por código de nido...",

  searchKeys: [
    "nido",
    "marea",
    "fechaEclosion",
    "responsable",
    "responsableLiberacion",
  ],

  defaultSort: {
    key: "nido",
    direction: "asc",
    type: "text",
  },

  stats: [
    {
      title: "Eclosiones",
      value: 200,
      icon: Turtle,
      iconColor: "text-[#7BB9A0]",
    },
    {
      title: "Neonatos Vivos",
      value: 2000,
      icon: Turtle,
      iconColor: "text-[#7BB9A0]",
    },
    {
      title: "Neonatos muertos",
      value: 300,
      icon: Skull,
      iconColor: "text-[#7BB9A0]",
    },
    {
      title: "Tasa de supervivencia",
      value: "40%",
      icon: ChartNoAxesColumnIncreasing,
      iconColor: "text-[#7BB9A0]",
    },
  ],

  filters: [
    {
      type: "date",
      key: "fechaEclosion",
      label: "Rango de fecha",
      icon: CalendarDays,
    },
    {
      type: "select",
      key: "marea",
      label: "Marea",
      options: ["Marea Alta", "Marea Media", "Marea Baja"],
    },
    {
      type: "select",
      key: "responsable",
      label: "Responsable",
      options: ["José Gilverto", "Ana Cáceres", "Mario Tesorero", "Juan Ramón"],
    },
  ],

  columns: [
    {
      key: "nido",
      header: "Nido",
      sortable: true,
      sortType: "text",
      defaultSortDirection: "asc",
    },
    {
      key: "vivos",
      header: "Vivos",
      sortable: true,
      sortType: "number",
      defaultSortDirection: "desc",
    },
    {
      key: "muertos",
      header: "Muertos",
      sortable: true,
      sortType: "number",
      defaultSortDirection: "desc",
    },
    {
      key: "marea",
      header: "Marea",
    },
    {
      key: "fechaEclosion",
      header: "Fecha de Eclosión",
      sortable: true,
      sortType: "date",
      defaultSortDirection: "asc",
    },
    {
      key: "responsable",
      header: "Responsable",
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

  emptyTitle: "No hay nacimientos registrados",
  emptyDescription:
    "Registra un nacimiento para visualizar la información de eclosión.",

  data: [
    {
      id: 1,
      nido: "C2HJJ-09",
      vivos: 80,
      muertos: 23,
      marea: "Marea Alta",
      fechaEclosion: "2023-10-02 15:04",
      fechaLiberacion: "2023-10-02 18:30",
      responsable: "José Gilverto",
      responsableLiberacion: "José Gilverto",

      vivosFueraArena: 48,
      muertosFueraArena: 12,
      vivosDentroArena: 32,
      muertosDentroArena: 11,

      registradoPor: "Mario Saul Martinez",
      fechaRegistro: "2023-10-02 18:45",
      observaciones: "Nacimiento registrado sin incidentes.",
    },
    {
      id: 2,
      nido: "C2HJJ-10",
      vivos: 100,
      muertos: 23,
      marea: "Marea Alta",
      fechaEclosion: "2023-10-02 15:04",
      fechaLiberacion: "2023-10-02 19:00",
      responsable: "Ana Cáceres",
      responsableLiberacion: "Ana Cáceres",

      vivosFueraArena: 60,
      muertosFueraArena: 10,
      vivosDentroArena: 40,
      muertosDentroArena: 13,

      registradoPor: "Mario Saul Martinez",
      fechaRegistro: "2023-10-02 19:20",
      observaciones:
        "Se registró una buena cantidad de neonatos vivos durante la liberación.",
    },
    {
      id: 3,
      nido: "C2HJJ-11",
      vivos: 23,
      muertos: 43,
      marea: "Marea Baja",
      fechaEclosion: "2005-01-01 11:45",
      fechaLiberacion: "2005-01-01 14:30",
      responsable: "Mario Tesorero",
      responsableLiberacion: "Mario Tesorero",

      vivosFueraArena: 15,
      muertosFueraArena: 20,
      vivosDentroArena: 8,
      muertosDentroArena: 23,

      registradoPor: "Carlos Martinez",
      fechaRegistro: "2005-01-01 15:00",
      observaciones:
        "Se reportó alta mortalidad dentro del nido. Requiere revisión posterior.",
    },
    {
      id: 4,
      nido: "C2HJJ-12",
      vivos: 23,
      muertos: 32,
      marea: "Marea Baja",
      fechaEclosion: "2026-11-01 21:00",
      fechaLiberacion: "2026-11-01 22:01",
      responsable: "Juan Ramón",
      responsableLiberacion: "Juan Ramón",

      vivosFueraArena: 12,
      muertosFueraArena: 20,
      vivosDentroArena: 11,
      muertosDentroArena: 12,

      registradoPor: "Mario Saul Martinez",
      fechaRegistro: "2026-11-01 22:20",
      observaciones:
        "Liberación realizada en condiciones controladas durante marea baja.",
    },
  ],
};
