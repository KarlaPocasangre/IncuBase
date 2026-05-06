import {
  CalendarPlus,
  Circle,
  FileSearch,
  Pencil,
  Plus,
  Search,
  Skull,
  ChartNoAxesColumnIncreasing,
  Turtle,
  Wrench,
} from "lucide-react";

export const nacimientosConfig = {
  pageTitle: "Eclosion",
  pageSubtitle: "Gestion de Nacimientos",

  cardTitle: "Gestion de Nacimientos",
  cardDescription: "Administra los nacimientos del sistema IncuBase",
  buttonText: "Registrar Nacimiento",
  buttonIcon: Plus,

  searchPlaceholder: "Buscar por codigo de nido...",
  filters: ["Rango de fecha", "Marea", "Responsable"],

  stats: [
    {
      title: "Eclosiones",
      value: 200,
      icon: Circle,
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

  columns: [
    {
      header: "Nido",
      key: "nido",
    },
    {
      header: "Vivos",
      key: "vivos",
    },
    {
      header: "Muertos",
      key: "muertos",
    },
    {
      header: "Marea",
      key: "marea",
    },
    {
      header: "Fecha de Eclosion",
      key: "fechaEclosion",
      renderHeader: () => (
        <span className="flex items-center gap-2">
          Fecha de Eclosion
          <CalendarPlus className="h-5 w-5 text-[#52645E]" />
        </span>
      ),
    },
    {
      header: "Responsable",
      key: "responsable",
    },
    {
      header: "Acciones",
      key: "acciones",
      render: () => (
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="rounded-md p-1 transition hover:bg-[#E6A11D]/10"
          >
            <Pencil className="h-5 w-5 text-[#E6A11D]" />
          </button>

          <button
            type="button"
            className="rounded-md p-1 transition hover:bg-blue-100"
          >
            <FileSearch className="h-5 w-5 text-blue-400" />
          </button>
        </div>
      ),
    },
  ],

  data: [
    {
      nido: "C2HJJ-09",
      vivos: 80,
      muertos: 23,
      marea: "Marea Alta",
      fechaEclosion: "2023-10-02 15:04",
      responsable: "Jose Gilverto",
    },
    {
      nido: "C2HJJ-09",
      vivos: 100,
      muertos: 23,
      marea: "Marea Alta",
      fechaEclosion: "2023-10-02 15:04",
      responsable: "Ana Caceres",
    },
    {
      nido: "C2HJJ-09",
      vivos: 23,
      muertos: 43,
      marea: "Marea Baja",
      fechaEclosion: "2005-01-01 11:45",
      responsable: "Mario Tesorero",
    },
    {
      nido: "C2HJJ-09",
      vivos: 23,
      muertos: 32,
      marea: "Marea Baja",
      fechaEclosion: "2026-11-01 21:00",
      responsable: "Juan Ramon",
    },
  ],
};
