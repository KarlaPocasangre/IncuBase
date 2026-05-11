import {
  Bell,
  CheckCircle2,
  Clock,
  Filter,
  Thermometer,
  Egg,
  TriangleAlert,
  Fence,
  AlertTriangle,
} from "lucide-react";

export const alertasStats = [
  {
    title: "Pendientes",
    value: 3,
    description: "Alertas sin atender",
    icon: Bell,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    title: "En proceso",
    value: 1,
    description: "Alertas en revisión",
    icon: Clock,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Resueltas",
    value: 8,
    description: "Alertas atendidas",
    icon: CheckCircle2,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Críticas",
    value: 1,
    description: "Requieren prioridad",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
  },
];

export const alertasMock = [
  {
    id: 1,
    titulo: "Temperatura fuera de rango",
    mensaje:
      "La temperatura registrada supera el rango recomendado para incubación.",
    tipo: "Temperatura fuera de rango",
    nivel: "alta",
    estado: "pendiente",
    relacionado: "Corral A-03 · Sector 2",
    fecha: "Hace 15 min",
    fechaCompleta: "11/05/2026 09:45 AM",
    icon: Thermometer,
  },
  {
    id: 2,
    titulo: "Nido próximo a eclosión",
    mensaje:
      "El nido está cerca de completar su periodo estimado de incubación.",
    tipo: "Nido próximo a eclosión",
    nivel: "media",
    estado: "pendiente",
    relacionado: "Golfina · Nido N-024",
    fecha: "Hace 2 horas",
    fechaCompleta: "11/05/2026 08:00 AM",
    icon: Egg,
  },
  {
    id: 3,
    titulo: "Corral con capacidad máxima",
    mensaje:
      "El corral ha alcanzado el porcentaje máximo recomendado de ocupación.",
    tipo: "Corral con capacidad máxima",
    nivel: "media",
    estado: "pendiente",
    relacionado: "Corral B-05 · 95% ocupado",
    fecha: "Hace 4 horas",
    fechaCompleta: "11/05/2026 06:10 AM",
    icon: Fence,
  },
  {
    id: 4,
    titulo: "Evidencia de depredación",
    mensaje: "Se registraron indicios de posible depredación en un nido.",
    tipo: "Evidencia de depredación",
    nivel: "critica",
    estado: "en_proceso",
    relacionado: "Nido N-018 · Sector 4",
    fecha: "Ayer",
    fechaCompleta: "10/05/2026 04:25 PM",
    icon: TriangleAlert,
  },
  {
    id: 5,
    titulo: "Temperatura normalizada",
    mensaje: "La alerta de temperatura fue revisada y marcada como resuelta.",
    tipo: "Temperatura fuera de rango",
    nivel: "baja",
    estado: "resuelta",
    relacionado: "Corral C-01 · Sector 1",
    fecha: "Ayer",
    fechaCompleta: "10/05/2026 09:30 AM",
    icon: Thermometer,
  },
];

export const estadoOptions = [
  "Todos",
  "Pendiente",
  "En proceso",
  "Resuelta",
  "Cancelada",
];

export const nivelOptions = ["Todos", "Baja", "Media", "Alta", "Crítica"];

export const tipoOptions = [
  "Todos",
  "Temperatura fuera de rango",
  "Nido próximo a eclosión",
  "Evidencia de depredación",
  "Corral con capacidad máxima",
];

export const getNivelStyles = (nivel) => {
  const styles = {
    baja: "bg-emerald-50 text-emerald-700 border-emerald-200",
    media: "bg-yellow-50 text-yellow-700 border-yellow-200",
    alta: "bg-red-50 text-red-700 border-red-200",
    critica: "bg-red-100 text-red-800 border-red-300",
  };

  return styles[nivel] || "bg-gray-50 text-gray-600 border-gray-200";
};

export const getEstadoStyles = (estado) => {
  const styles = {
    pendiente: "bg-orange-50 text-orange-700 border-orange-200",
    en_proceso: "bg-blue-50 text-blue-700 border-blue-200",
    resuelta: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelada: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return styles[estado] || "bg-gray-50 text-gray-600 border-gray-200";
};

export const formatEstado = (estado) => {
  const labels = {
    pendiente: "Pendiente",
    en_proceso: "En proceso",
    resuelta: "Resuelta",
    cancelada: "Cancelada",
  };

  return labels[estado] || estado;
};

export const formatNivel = (nivel) => {
  const labels = {
    baja: "Baja",
    media: "Media",
    alta: "Alta",
    critica: "Crítica",
  };

  return labels[nivel] || nivel;
};
