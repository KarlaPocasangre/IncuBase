import {
  AlertTriangle,
  Bell,
  CalendarClock,
  ClipboardPlus,
  Egg,
  Skull,
  Thermometer,
  ThermometerSun,
  Turtle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardMetricCard from "../../components/dashboard/DashboardMetricCard.jsx";
import QuickActionCard from "../../components/dashboard/QuickActionCard.jsx";
import AlertCard from "../../components/dashboard/AlertCard.jsx";
import SectionHeader from "../../components/dashboard/SectionHeader.jsx";
import TurtleSpeciesCard from "../../components/dashboard/TurtleSpeciesCard.jsx";

//Imagenes
import careyImg from "../../assets/baula.jpg";
import baulaImg from "../../assets/carey.webp";
import golfinaImg from "../../assets/golfina.png";
import prietaImg from "../../assets/prieta.jpg";

const summaryCards = [
  {
    title: "Nidos activos",
    value: "42",
    description: "Nidos en incubación",
    icon: Egg,
    accent: "border-l-[#006C3A]",
    iconBg: "bg-[#E5F4EC]",
    iconColor: "text-[#006C3A]",
  },
  {
    title: "Próximos a eclosión",
    value: "05",
    description: "En los próximos 5 días",
    icon: CalendarClock,
    accent: "border-l-[#0B7A8F]",
    iconBg: "bg-[#E4F4F7]",
    iconColor: "text-[#0B7A8F]",
  },
  {
    title: "Alertas pendientes",
    value: "03",
    description: "Requieren atención",
    icon: Bell,
    accent: "border-l-[#D97706]",
    iconBg: "bg-[#FFF4E5]",
    iconColor: "text-[#D97706]",
  },
  {
    title: "Temp. pendientes",
    value: "08",
    description: "Sectores por monitorear",
    icon: ThermometerSun,
    accent: "border-l-[#B91C1C]",
    iconBg: "bg-[#FDECEC]",
    iconColor: "text-[#B91C1C]",
  },
];
const turtleSpecies = [
  {
    name: "Carey",
    scientificName: "Eretmochelys imbricata",
    image: careyImg,
    status: "Peligro crítico",
    statusClassName: "border-red-300 bg-red-100 text-red-700",
    activeNests: "12",
    eggs: "1440",
    description:
      "Tortuga de caparazón con escamas superpuestas. Es una de las especies más amenazadas y requiere monitoreo constante.",
  },
  {
    name: "Baula",
    scientificName: "Dermochelys coriacea",
    image: baulaImg,
    status: "Vulnerable",
    statusClassName: "border-emerald-300 bg-emerald-100 text-emerald-700",
    activeNests: "08",
    eggs: "640",
    description:
      "La tortuga marina más grande del mundo. Su monitoreo es importante por su sensibilidad a los cambios ambientales.",
  },
  {
    name: "Golfina",
    scientificName: "Lepidochelys olivacea",
    image: golfinaImg,
    status: "Vulnerable",
    statusClassName: "border-emerald-300 bg-emerald-100 text-emerald-700",
    activeNests: "45",
    eggs: "4500",
    description:
      "Especie común en playas del Pacífico. Destaca por sus arribadas masivas y su importancia para la conservación.",
  },
  {
    name: "Prieta",
    scientificName: "Chelonia mydas agassizii",
    image: prietaImg,
    status: "En peligro",
    statusClassName: "border-amber-300 bg-amber-100 text-amber-700",
    activeNests: "23",
    eggs: "2530",
    description:
      "Subespecie del Pacífico de la tortuga verde. Requiere seguimiento durante el proceso de incubación.",
  },
];

const quickActions = [
  {
    title: "Registrar Nido",
    description: "Nuevo registro de nido",
    icon: ClipboardPlus,
    path: "/registro-nidos",
    className: "bg-[#006C3A] text-white hover:bg-[#00582F]",
    iconBg: "bg-white/20",
  },
  {
    title: "Monitoreo Temp.",
    description: "Registrar temperaturas",
    icon: Thermometer,
    path: "/temperatura",
    className: "bg-[#1F7EA0] text-white hover:bg-[#176984]",
    iconBg: "bg-white/20",
  },
  {
    title: "Registrar Nacimiento",
    description: "Registrar eclosión",
    icon: Turtle,
    path: "/nacimientos",
    className: "bg-white text-[#163832] hover:bg-[#F4F8F6]",
    iconBg: "bg-[#EAF2EF]",
  },
  {
    title: "Registrar Exhumación",
    description: "Nuevo registro de exhumación",
    icon: Skull,
    path: "/exhumacion",
    className: "bg-white text-[#163832] hover:bg-[#F4F8F6]",
    iconBg: "bg-[#EAF2EF]",
  },
];

const alerts = [
  {
    title: "Temperatura fuera de rango",
    description: "Corral A-03 · Sector 2",
    level: "Alta",
    time: "Hace 15 min",
    color: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-500",
    icon: ThermometerSun,
  },
  {
    title: "Nido próximo a eclosión",
    description: "Golfina · Nido N-024",
    level: "Media",
    time: "Hace 2 horas",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    icon: CalendarClock,
  },
  {
    title: "Corral con capacidad máxima",
    description: "Corral B-05 · 95% ocupado",
    level: "Media",
    time: "Hace 4 horas",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    icon: AlertTriangle,
  },
];

function DashboardTecnicoPage() {
  const navigate = useNavigate();

  return (
    <section className="space-y-7">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <DashboardMetricCard key={card.title} {...card} />
        ))}
      </div>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <SectionHeader
            title="Especies en Monitoreo"
            description="Resumen de especies registradas actualmente en el sistema."
          />

          <span className="rounded-full border border-[#B7D7CC] bg-[#EEF7F3] px-3 py-1 text-xs font-semibold text-[#006C3A]">
            {turtleSpecies.length} especies activas
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {turtleSpecies.map((species) => (
            <TurtleSpeciesCard key={species.name} {...species} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-[#B7D7CC] bg-white/60 p-6">
        <div className="mb-5">
          <SectionHeader
            icon={ClipboardPlus}
            title="Acciones Rápidas"
            description="Accede directamente a los registros principales del sistema."
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <QuickActionCard
              key={action.title}
              {...action}
              onNavigate={navigate}
            />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[#D6E1DE] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <SectionHeader
            icon={Bell}
            iconColor="text-[#D97706]"
            title="Alertas Pendientes"
            description="Eventos que requieren revisión o atención del técnico."
          />

          <span className="rounded-full border border-[#B7D7CC] bg-[#EEF7F3] px-3 py-1 text-xs font-semibold text-[#006C3A]">
            {alerts.length} pendientes
          </span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <AlertCard key={alert.title} {...alert} />
          ))}
        </div>
      </section>
    </section>
  );
}

export default DashboardTecnicoPage;
