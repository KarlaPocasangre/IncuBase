import {
  Activity,
  AlertTriangle,
  BellRing,
  CalendarDays,
  CheckCircle2,
  Clock,
  Database,
  Egg,
  Fence,
  ShieldCheck,
  Thermometer,
  Turtle,
  Users,
} from "lucide-react";

export const adminSummary = {
  temporada: "Temporada 2026",
  descripcion: "Vista general del rendimiento operativo del sistema",
  items: [
    {
      label: "Nidos registrados",
      value: "128",
      icon: Egg,
      tone: "green",
    },
    {
      label: "Tasa de eclosión",
      value: "84%",
      icon: Activity,
      tone: "blue",
    },
    {
      label: "Corrales activos",
      value: "6",
      icon: Fence,
      tone: "green",
    },
    {
      label: "Alertas críticas",
      value: "1",
      icon: AlertTriangle,
      tone: "red",
    },
    {
      label: "Usuarios activos",
      value: "12",
      icon: Users,
      tone: "orange",
    },
  ],
};

export const nidosPorEstado = [
  {
    estado: "Registrado",
    total: 18,
  },
  {
    estado: "En incubación",
    total: 42,
  },
  {
    estado: "Próximo a eclosión",
    total: 8,
  },
  {
    estado: "Eclosionado",
    total: 36,
  },
  {
    estado: "Exhumado",
    total: 24,
  },
];

export const alertasPorNivel = [
  {
    nivel: "Baja",
    total: 4,
    color: "#10B981",
  },
  {
    nivel: "Media",
    total: 8,
    color: "#F59E0B",
  },
  {
    nivel: "Alta",
    total: 3,
    color: "#F97316",
  },
  {
    nivel: "Crítica",
    total: 1,
    color: "#EF4444",
  },
];

export const tendenciaMensual = [
  {
    mes: "Ene",
    nidos: 12,
    eclosiones: 8,
    exhumaciones: 5,
  },
  {
    mes: "Feb",
    nidos: 18,
    eclosiones: 12,
    exhumaciones: 9,
  },
  {
    mes: "Mar",
    nidos: 23,
    eclosiones: 16,
    exhumaciones: 11,
  },
  {
    mes: "Abr",
    nidos: 16,
    eclosiones: 14,
    exhumaciones: 10,
  },
  {
    mes: "May",
    nidos: 28,
    eclosiones: 20,
    exhumaciones: 15,
  },
  {
    mes: "Jun",
    nidos: 31,
    eclosiones: 24,
    exhumaciones: 18,
  },
];

export const ocupacionCorrales = [
  {
    corral: "Corral A-03",
    ocupacion: 80,
    estado: "Activo",
  },
  {
    corral: "Corral B-05",
    ocupacion: 95,
    estado: "Activo",
  },
  {
    corral: "Corral C-01",
    ocupacion: 45,
    estado: "Activo",
  },
  {
    corral: "Corral D-02",
    ocupacion: 62,
    estado: "Mantenimiento",
  },
  {
    corral: "Corral E-04",
    ocupacion: 35,
    estado: "Activo",
  },
];

export const resultadosPorEspecie = [
  {
    especie: "Golfina",
    nidos: 45,
    eclosiones: 38,
  },
  {
    especie: "Carey",
    nidos: 12,
    eclosiones: 9,
  },
  {
    especie: "Baula",
    nidos: 8,
    eclosiones: 6,
  },
  {
    especie: "Prieta",
    nidos: 23,
    eclosiones: 19,
  },
];

export const temperaturaPromedio = [
  {
    dia: "Lun",
    promedio: 29.4,
    max: 31.2,
  },
  {
    dia: "Mar",
    promedio: 30.1,
    max: 32.0,
  },
  {
    dia: "Mié",
    promedio: 30.2,
    max: 32.4,
  },
  {
    dia: "Jue",
    promedio: 31.0,
    max: 33.1,
  },
  {
    dia: "Vie",
    promedio: 30.5,
    max: 32.8,
  },
  {
    dia: "Sáb",
    promedio: 29.9,
    max: 31.9,
  },
  {
    dia: "Dom",
    promedio: 30.3,
    max: 32.2,
  },
];

export const actividadReciente = [
  {
    id: 1,
    title: "Nido N-024 registrado",
    description: "Golfina · Corral A-03 · Sector 2",
    time: "Hace 15 min",
    icon: Egg,
    tone: "green",
  },
  {
    id: 2,
    title: "Alerta crítica generada",
    description: "Temperatura fuera de rango en Corral A-03",
    time: "Hace 35 min",
    icon: BellRing,
    tone: "red",
  },
  {
    id: 3,
    title: "Registro de temperatura agregado",
    description: "Promedio registrado: 30.2 °C",
    time: "Hace 1 hora",
    icon: Thermometer,
    tone: "blue",
  },
  {
    id: 4,
    title: "Eclosión registrada",
    description: "Nido N-018 · 95 neonatos vivos",
    time: "Hace 3 horas",
    icon: Turtle,
    tone: "green",
  },
  {
    id: 5,
    title: "Usuario técnico activo",
    description: "Se registró actividad operativa reciente",
    time: "Hoy",
    icon: ShieldCheck,
    tone: "orange",
  },
];

export const estadoOperativo = [
  {
    label: "Base de datos",
    value: "Operativa",
    icon: Database,
    tone: "green",
  },
  {
    label: "Última actualización",
    value: "Hoy",
    icon: Clock,
    tone: "blue",
  },
  {
    label: "Periodo actual",
    value: "Junio 2026",
    icon: CalendarDays,
    tone: "orange",
  },
  {
    label: "Sistema",
    value: "Normal",
    icon: CheckCircle2,
    tone: "green",
  },
];
