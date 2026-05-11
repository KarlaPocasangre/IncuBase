import {
  Thermometer,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const temperaturaTabs = {
  registro: "registro",
  historial: "historial",
};

export const corralesOptions = [
  {
    id: 1,
    codigo: "Corral A-03",
    ubicacion: "Sector Norte",
  },
  {
    id: 2,
    codigo: "Corral B-05",
    ubicacion: "Sector Central",
  },
  {
    id: 3,
    codigo: "Corral C-01",
    ubicacion: "Sector Sur",
  },
];

export const sectoresOptions = [
  {
    id: 1,
    idCorral: 1,
    codigo: "Sector 1",
    descripcion: "Fila 1 · Columna 1",
  },
  {
    id: 2,
    idCorral: 1,
    codigo: "Sector 2",
    descripcion: "Fila 1 · Columna 2",
  },
  {
    id: 3,
    idCorral: 2,
    codigo: "Sector 1",
    descripcion: "Fila 2 · Columna 1",
  },
  {
    id: 4,
    idCorral: 2,
    codigo: "Sector 2",
    descripcion: "Fila 2 · Columna 2",
  },
  {
    id: 5,
    idCorral: 3,
    codigo: "Sector 1",
    descripcion: "Fila 3 · Columna 1",
  },
];

export const ordenMedicionOptions = [
  "Primera medición",
  "Segunda medición",
  "Tercera medición",
  "Control adicional",
];

export const temperaturaStats = [
  {
    title: "Registros hoy",
    value: 4,
    description: "Mediciones realizadas",
    icon: Thermometer,
    iconColor: "text-[#0F6B3D]",
    bgColor: "bg-[#E9F5F1]",
  },
  {
    title: "Promedio general",
    value: "30.2 °C",
    description: "Temperatura promedio",
    icon: Activity,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Fuera de rango",
    value: 1,
    description: "Registro con alerta",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    title: "Estado general",
    value: "Normal",
    description: "Últimas mediciones",
    icon: CheckCircle2,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
];

export const registrosTemperaturaMock = [
  {
    id: 1,
    corral: "Corral A-03",
    sector: "Sector 2",
    fechaMedicion: "11/05/2026 09:45 AM",
    registradoPor: "Karla Técnico",
    promedio: 34.8,
    estado: "fuera_rango",
    observaciones: "Temperatura elevada durante monitoreo matutino.",
    mediciones: [
      {
        id: 1,
        profundidad: 30,
        temperatura: 33.8,
        orden: "Primera medición",
      },
      {
        id: 2,
        profundidad: 50,
        temperatura: 34.9,
        orden: "Segunda medición",
      },
      {
        id: 3,
        profundidad: 70,
        temperatura: 35.7,
        orden: "Tercera medición",
      },
    ],
  },
  {
    id: 2,
    corral: "Corral B-05",
    sector: "Sector 1",
    fechaMedicion: "11/05/2026 07:30 AM",
    registradoPor: "Karla Técnico",
    promedio: 29.7,
    estado: "normal",
    observaciones: "Medición sin variaciones importantes.",
    mediciones: [
      {
        id: 1,
        profundidad: 30,
        temperatura: 29.4,
        orden: "Primera medición",
      },
      {
        id: 2,
        profundidad: 50,
        temperatura: 29.8,
        orden: "Segunda medición",
      },
      {
        id: 3,
        profundidad: 70,
        temperatura: 30,
        orden: "Tercera medición",
      },
    ],
  },
  {
    id: 3,
    corral: "Corral C-01",
    sector: "Sector 1",
    fechaMedicion: "10/05/2026 04:20 PM",
    registradoPor: "Administrador",
    promedio: 28.9,
    estado: "normal",
    observaciones: "Temperatura estable.",
    mediciones: [
      {
        id: 1,
        profundidad: 30,
        temperatura: 28.5,
        orden: "Primera medición",
      },
      {
        id: 2,
        profundidad: 50,
        temperatura: 29.1,
        orden: "Segunda medición",
      },
      {
        id: 3,
        profundidad: 70,
        temperatura: 29.2,
        orden: "Tercera medición",
      },
    ],
  },
];

export const getEstadoTemperaturaStyles = (estado) => {
  const styles = {
    normal: "bg-emerald-50 text-emerald-700 border-emerald-200",
    fuera_rango: "bg-red-50 text-red-700 border-red-200",
    revision: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return styles[estado] || "bg-gray-50 text-gray-600 border-gray-200";
};

export const formatEstadoTemperatura = (estado) => {
  const labels = {
    normal: "Normal",
    fuera_rango: "Fuera de rango",
    revision: "En revisión",
  };

  return labels[estado] || estado;
};

export const getTemperatureStatus = (temperatura) => {
  const value = Number(temperatura);

  if (Number.isNaN(value)) {
    return {
      status: "sin_dato",
      label: "Sin dato",
      className: "text-gray-500",
    };
  }

  if (value < 24 || value > 34) {
    return {
      status: "fuera_rango",
      label: "Fuera de rango",
      className: "text-red-600",
    };
  }

  return {
    status: "normal",
    label: "Normal",
    className: "text-emerald-600",
  };
};

export const getPromedioMediciones = (mediciones) => {
  if (!mediciones.length) return 0;

  const total = mediciones.reduce((acc, item) => {
    return acc + Number(item.temperatura || 0);
  }, 0);

  return Number((total / mediciones.length).toFixed(1));
};

export const getEstadoPorPromedio = (promedio) => {
  if (promedio < 24 || promedio > 34) return "fuera_rango";
  return "normal";
};
