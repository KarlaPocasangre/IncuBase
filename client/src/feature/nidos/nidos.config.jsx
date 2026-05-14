import { Egg, Timer, ClockAlert, FileCheck, CalendarDays } from "lucide-react";

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

  buttonText: "Agregar Nido",
  buttonRedirectTo: "/registro-nidos",

  searchPlaceholder: "Buscar por código de nido...",

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

  filters: ["Rango de fecha", "Especie", "Estado", "Corral"],

  columns: [
    {
      key: "codigoNido",
      header: "Código",
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
      header: (
        <div className="flex items-center gap-2">
          Fecha de siembra
          <CalendarDays className="h-4 w-4 text-gray-500" />
        </div>
      ),
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

  data: [
    {
      id: 1,
      codigoNido: "NID-001",
      especie: "Golfina",
      ubicacion: "C2HJJ-09 / A-03",
      cantidadHuevos: 85,
      estado: "En incubación",
      fechaSiembra: "2026-05-01 14:30",
      registradoPor: "José Gilverto",
    },
    {
      id: 2,
      codigoNido: "NID-002",
      especie: "Carey",
      ubicacion: "C2HJJ-10 / B-01",
      cantidadHuevos: 92,
      estado: "Próximo a eclosión",
      fechaSiembra: "2026-04-20 08:15",
      registradoPor: "Ana Cáceres",
    },
    {
      id: 3,
      codigoNido: "NID-003",
      especie: "Baula",
      ubicacion: "C2HJJ-11 / C-04",
      cantidadHuevos: 70,
      estado: "Eclosionado",
      fechaSiembra: "2026-03-18 17:00",
      registradoPor: "Mario Tesorero",
    },
    {
      id: 4,
      codigoNido: "NID-004",
      especie: "Prieta",
      ubicacion: "C2HJJ-12 / D-02",
      cantidadHuevos: 78,
      estado: "Exhumado",
      fechaSiembra: "2026-02-12 09:45",
      registradoPor: "Juan Ramón",
    },
  ],
};
