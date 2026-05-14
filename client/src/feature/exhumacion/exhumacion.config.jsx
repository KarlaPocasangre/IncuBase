import {
  AlertTriangle,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  FileSearch,
  Pencil,
  Plus,
  Skull,
  XCircle,
} from "lucide-react";

const depredacionStyles = {
  "Sin depredación": "border-emerald-100 bg-emerald-100 text-emerald-600",
  Perro: "border-red-300 bg-red-50 text-red-500",
  Cangrejo: "border-red-300 bg-red-50 text-red-500",
  Hormigas: "border-red-300 bg-red-50 text-red-500",
  Larvas: "border-red-300 bg-red-50 text-red-500",
  Aves: "border-red-300 bg-red-50 text-red-500",
};

export const exhumacionConfig = {
  pageTitle: "Exhumación",
  pageSubtitle: "Gestión de Exhumación",

  cardTitle: "Gestión de Exhumación",
  cardDescription:
    "Administra las exhumaciones registradas en el sistema IncuBase",
  cardIcon: ClipboardCheck,
  cardIconColor: "text-[#0F7A4F]",

  buttonText: "Registrar Exhumación",
  buttonIcon: Plus,
  buttonRedirectTo: "/exhumacion",

  searchPlaceholder: "Buscar por código de nido...",

  searchKeys: ["nido", "fechaExhumacion", "depredacion", "responsable"],

  defaultSort: {
    key: "nido",
    direction: "asc",
    type: "text",
  },

  stats: [
    {
      title: "Total de Exhumaciones",
      value: 200,
      icon: ClipboardCheck,
      iconColor: "text-blue-400",
    },
    {
      title: "Exhumaciones con Depredación",
      value: 80,
      icon: AlertTriangle,
      iconColor: "text-red-400",
    },
    {
      title: "% Promedio de Eclosión",
      value: "85%",
      icon: ChartNoAxesColumnIncreasing,
      iconColor: "text-emerald-500",
    },
    {
      title: "Mortalidad en Nidos",
      value: 120,
      icon: Skull,
      iconColor: "text-red-400",
    },
  ],

  filters: [
    {
      type: "date",
      key: "fechaExhumacion",
      label: "Rango de fecha",
      icon: CalendarDays,
    },
    {
      type: "select",
      key: "depredacion",
      label: "Depredación",
      options: [
        "Sin depredación",
        "Perro",
        "Cangrejo",
        "Hormigas",
        "Larvas",
        "Aves",
      ],
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
      key: "fechaExhumacion",
      header: "Fecha de Exhumación",
      sortable: true,
      sortType: "date",
      defaultSortDirection: "asc",
    },
    {
      key: "eclosionados",
      header: "Eclosionados",
      sortable: true,
      sortType: "number",
      defaultSortDirection: "desc",
    },
    {
      key: "noEclosionados",
      header: "No Eclosionados",
      sortable: true,
      sortType: "number",
      defaultSortDirection: "desc",
    },
    {
      key: "embrionesMuertos",
      header: "Embriones muertos",
      sortable: true,
      sortType: "number",
      defaultSortDirection: "desc",
    },
    {
      key: "depredacion",
      header: "Depredación",
      render: (value) => (
        <span
          className={`inline-flex rounded-full border px-4 py-1 text-sm font-semibold ${
            depredacionStyles[value] ||
            "border-slate-300 bg-slate-50 text-slate-500"
          }`}
        >
          {value}
        </span>
      ),
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

  emptyTitle: "No hay exhumaciones registradas",
  emptyDescription:
    "Registra una exhumación para visualizar los resultados del nido.",

  data: [
    {
      id: 1,
      nido: "C2HJJ-09",
      fechaExhumacion: "2023-10-02 15:04",
      eclosionados: 80,
      noEclosionados: 0,
      embrionesMuertos: 0,
      depredacion: "Sin depredación",
      responsable: "José Gilverto",
    },
    {
      id: 2,
      nido: "C2HJJ-09",
      fechaExhumacion: "2023-10-02 15:04",
      eclosionados: 100,
      noEclosionados: 23,
      embrionesMuertos: 23,
      depredacion: "Perro",
      responsable: "Ana Cáceres",
    },
    {
      id: 3,
      nido: "C2HJJ-09",
      fechaExhumacion: "2005-01-01 11:45",
      eclosionados: 23,
      noEclosionados: 5,
      embrionesMuertos: 5,
      depredacion: "Cangrejo",
      responsable: "Mario Tesorero",
    },
    {
      id: 4,
      nido: "C2HJJ-09",
      fechaExhumacion: "2026-11-01 21:00",
      eclosionados: 23,
      noEclosionados: 0,
      embrionesMuertos: 0,
      depredacion: "Sin depredación",
      responsable: "Juan Ramón",
    },
  ],
};
