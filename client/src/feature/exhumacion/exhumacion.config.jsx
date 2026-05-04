import {
  CalendarPlus,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  FileSearch,
  Pencil,
  Plus,
  Skull,
  TriangleAlert,
} from "lucide-react";

const depredacionStyles = {
  "Sin depredacion": "bg-emerald-100 text-emerald-500",
  Perro: "bg-red-50 text-red-500 border border-red-400",
  Cangrejo: "bg-red-50 text-red-500 border border-red-400",
};

export const exhumacionConfig = {
  pageTitle: "Exhumacion",
  pageSubtitle: "Gestion de Exhumaciones",

  cardTitle: "Gestion de Exhumacion",
  cardDescription: "Administra los nacimientos del sistema IncuBase",
  buttonText: "Registrar Exhumacion",
  buttonIcon: Plus,

  searchPlaceholder: "Buscar por codigo de nido...",
  filters: ["Rango de fecha", "Depredacion", "Responsable"],

  stats: [
    {
      title: "Total de Exhumaciones",
      value: 200,
      icon: ClipboardCheck,
      iconColor: "text-blue-500",
    },
    {
      title: "Exhumaciones con Depredación",
      value: 80,
      subtitle: "40% del total",
      icon: TriangleAlert,
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
      subtitle: "30% del total",
      icon: Skull,
      iconColor: "text-red-400",
    },
  ],

  columns: [
    { header: "Nido", key: "nido" },

    {
      header: "Fecha de Exhumación",
      key: "fechaExhumacion",
    },

    { header: "Eclosionados", key: "eclosionados" },
    { header: "No Eclosionados", key: "noEclosionados" },

    {
      header: "Embriones muertos",
      key: "embrionesMuertos",
    },

    {
      header: "Depredacion",
      key: "depredacion",
      render: (value) => (
        <span
          className={`inline-flex rounded-full px-4 py-1 text-sm font-medium ${
            depredacionStyles[value] || "bg-gray-100 text-gray-500"
          }`}
        >
          {value}
        </span>
      ),
    },

    { header: "Responsable", key: "responsable" },

    {
      header: "Acciones",
      key: "acciones",
      render: () => (
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="rounded-md p-1 hover:bg-[#E6A11D]/10"
          >
            <Pencil className="h-5 w-5 text-[#E6A11D]" />
          </button>

          <button type="button" className="rounded-md p-1 hover:bg-blue-100">
            <FileSearch className="h-5 w-5 text-blue-400" />
          </button>
        </div>
      ),
    },
  ],

  data: [
    {
      nido: "C2HJJ-09",
      fechaExhumacion: "2023-10-02 15:04",
      eclosionados: 80,
      noEclosionados: 0,
      embrionesMuertos: 0,
      depredacion: "Sin depredacion",
      responsable: "Jose Gilverto",
    },
    {
      nido: "C2HJJ-09",
      fechaExhumacion: "2023-10-02 15:04",
      eclosionados: 100,
      noEclosionados: 23,
      embrionesMuertos: 23,
      depredacion: "Perro",
      responsable: "Ana Caceres",
    },
    {
      nido: "C2HJJ-09",
      fechaExhumacion: "2005-01-01 11:45",
      eclosionados: 23,
      noEclosionados: 5,
      embrionesMuertos: 5,
      depredacion: "Cangrejo",
      responsable: "Mario Tesorero",
    },
    {
      nido: "C2HJJ-09",
      fechaExhumacion: "2026-11-01 21:00",
      eclosionados: 23,
      noEclosionados: 0,
      embrionesMuertos: 0,
      depredacion: "Sin depredacion",
      responsable: "Juan Ramon",
    },
  ],
};
