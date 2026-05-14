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

  searchPlaceholder: "Buscar por código de nido...",

  searchKeys: ["nido", "marea", "fechaEclosion", "responsable"],

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
      responsable: "José Gilverto",
    },
    {
      id: 2,
      nido: "C2HJJ-09",
      vivos: 100,
      muertos: 23,
      marea: "Marea Alta",
      fechaEclosion: "2023-10-02 15:04",
      responsable: "Ana Cáceres",
    },
    {
      id: 3,
      nido: "C2HJJ-09",
      vivos: 23,
      muertos: 43,
      marea: "Marea Baja",
      fechaEclosion: "2005-01-01 11:45",
      responsable: "Mario Tesorero",
    },
    {
      id: 4,
      nido: "C2HJJ-09",
      vivos: 23,
      muertos: 32,
      marea: "Marea Baja",
      fechaEclosion: "2026-11-01 21:00",
      responsable: "Juan Ramón",
    },
  ],
};
