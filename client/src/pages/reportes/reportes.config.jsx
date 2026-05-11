import {
  BarChart3,
  Fence,
  Thermometer,
  Egg,
  ClipboardList,
  Shell,
  Activity,
} from "lucide-react";

export const reporteRoles = {
  admin: "Administrador",
  tecnico: "Técnico",
};

export const corralesOptions = [
  "Todos",
  "Corral A-03",
  "Corral B-05",
  "Corral C-01",
];

export const especiesOptions = ["Todas", "Golfina", "Carey", "Baula", "Prieta"];

export const reportTypes = [
  {
    id: "corrales",
    title: "Reporte de Corrales",
    description: "Estado, ocupación y nidos por corral.",
    icon: Fence,
    color: "text-[#0F6B3D]",
    bgColor: "bg-[#E9F5F1]",
    roles: ["Administrador", "Técnico", "Tecnico"],
  },
  {
    id: "nidos",
    title: "Reporte de Nidos",
    description: "Seguimiento de nidos registrados y su estado.",
    icon: Egg,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    roles: ["Administrador", "Técnico", "Tecnico"],
  },
  {
    id: "temperatura",
    title: "Reporte de Temperatura",
    description: "Promedios, máximas y mediciones fuera de rango.",
    icon: Thermometer,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    roles: ["Administrador", "Técnico", "Tecnico"],
  },
  {
    id: "eclosion",
    title: "Reporte de Eclosión",
    description: "Neonatos vivos, muertos y tasa de eclosión.",
    icon: Shell,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    roles: ["Administrador"],
  },
  {
    id: "exhumacion",
    title: "Reporte de Exhumación",
    description: "Resultados de exhumación y evidencias registradas.",
    icon: ClipboardList,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    roles: ["Administrador"],
  },
  {
    id: "consolidado",
    title: "Reporte Consolidado",
    description: "Resumen estadístico general del sistema.",
    icon: BarChart3,
    color: "text-red-600",
    bgColor: "bg-red-50",
    roles: ["Administrador"],
  },
];

export const generalSummary = [
  {
    title: "Nidos registrados",
    value: 128,
    description: "Temporada actual",
    icon: Egg,
    iconColor: "text-[#0F6B3D]",
    bgColor: "bg-[#E9F5F1]",
  },
  {
    title: "Tasa de eclosión",
    value: "84%",
    description: "Promedio general",
    icon: Activity,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Corrales activos",
    value: 6,
    description: "En funcionamiento",
    icon: Fence,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Alertas generadas",
    value: 14,
    description: "Durante el periodo",
    icon: BarChart3,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

export const reportsData = {
  corrales: {
    title: "Reporte de Corrales",
    subtitle: "Resumen de estado y ocupación de corrales.",
    columns: ["Corral", "Estado", "Tipo", "Nidos", "Ocupación", "Ubicación"],
    rows: [
      ["Corral A-03", "Activo", "Corral cerrado", "24", "80%", "Sector Norte"],
      [
        "Corral B-05",
        "Activo",
        "Corral abierto",
        "18",
        "95%",
        "Sector Central",
      ],
      [
        "Corral C-01",
        "Mantenimiento",
        "Corral cerrado",
        "0",
        "0%",
        "Sector Sur",
      ],
    ],
    indicators: [
      { label: "Total corrales", value: 3 },
      { label: "Activos", value: 2 },
      { label: "En mantenimiento", value: 1 },
    ],
  },

  nidos: {
    title: "Reporte de Nidos",
    subtitle: "Estado general de nidos registrados.",
    columns: [
      "Código",
      "Especie",
      "Corral",
      "Estado",
      "Huevos",
      "Fecha siembra",
    ],
    rows: [
      [
        "N-024",
        "Golfina",
        "Corral A-03",
        "Próximo a eclosión",
        "98",
        "02/05/2026",
      ],
      ["N-018", "Carey", "Corral B-05", "En incubación", "87", "29/04/2026"],
      ["N-011", "Golfina", "Corral A-03", "Eclosionado", "102", "18/04/2026"],
    ],
    indicators: [
      { label: "Total nidos", value: 128 },
      { label: "En incubación", value: 74 },
      { label: "Eclosionados", value: 39 },
    ],
  },

  temperatura: {
    title: "Reporte de Temperatura",
    subtitle: "Mediciones de temperatura por corral y sector.",
    columns: ["Corral", "Sector", "Promedio", "Máxima", "Mínima", "Estado"],
    rows: [
      [
        "Corral A-03",
        "Sector 2",
        "34.8 °C",
        "35.7 °C",
        "33.8 °C",
        "Fuera de rango",
      ],
      ["Corral B-05", "Sector 1", "29.7 °C", "30.0 °C", "29.4 °C", "Normal"],
      ["Corral C-01", "Sector 1", "28.9 °C", "29.2 °C", "28.5 °C", "Normal"],
    ],
    indicators: [
      { label: "Promedio general", value: "30.2 °C" },
      { label: "Máxima registrada", value: "35.7 °C" },
      { label: "Fuera de rango", value: 1 },
    ],
  },

  eclosion: {
    title: "Reporte de Eclosión",
    subtitle: "Resultados de nacimientos y liberaciones.",
    columns: ["Nido", "Especie", "Vivos", "Muertos", "Liberados", "Tasa"],
    rows: [
      ["N-011", "Golfina", "87", "8", "87", "85%"],
      ["N-009", "Carey", "72", "5", "72", "88%"],
      ["N-006", "Golfina", "91", "4", "91", "91%"],
    ],
    indicators: [
      { label: "Nidos eclosionados", value: 39 },
      { label: "Neonatos vivos", value: 250 },
      { label: "Tasa promedio", value: "84%" },
    ],
  },

  exhumacion: {
    title: "Reporte de Exhumación",
    subtitle: "Datos finales de revisión de nidos.",
    columns: [
      "Nido",
      "Huevos sin embrión",
      "No eclosionados",
      "Depredación",
      "Cascarones",
      "Fecha",
    ],
    rows: [
      ["N-011", "6", "4", "No", "87", "10/05/2026"],
      ["N-009", "3", "5", "Sí", "72", "08/05/2026"],
      ["N-006", "2", "3", "No", "91", "05/05/2026"],
    ],
    indicators: [
      { label: "Exhumaciones", value: 21 },
      { label: "Con depredación", value: 3 },
      { label: "Cascarones", value: 250 },
    ],
  },

  consolidado: {
    title: "Reporte Estadístico Consolidado",
    subtitle: "Resumen general para análisis de conservación.",
    columns: ["Indicador", "Valor", "Periodo", "Tendencia", "Observación"],
    rows: [
      [
        "Total de nidos",
        "128",
        "Temporada actual",
        "Alta",
        "Buen volumen de registros",
      ],
      [
        "Tasa de eclosión",
        "84%",
        "Temporada actual",
        "Estable",
        "Dentro del rango esperado",
      ],
      ["Alertas críticas", "2", "Último mes", "Baja", "Requiere seguimiento"],
    ],
    indicators: [
      { label: "Nidos totales", value: 128 },
      { label: "Huevos registrados", value: 1148 },
      { label: "Éxito reproductivo", value: "84%" },
    ],
  },
};

export const getReportById = (id) => {
  return reportsData[id] || reportsData.corrales;
};
