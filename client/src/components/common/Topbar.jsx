import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Bell,
  CalendarClock,
  ThermometerSun,
  AlertTriangle,
  X,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "Temperatura fuera de rango",
    description: "Corral A-03 · Sector 2",
    time: "Hace 15 min",
    level: "Alta",
    icon: ThermometerSun,
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-700 border-red-200",
  },
  {
    id: 2,
    title: "Nido próximo a eclosión",
    description: "Golfina · Nido N-024",
    time: "Hace 2 horas",
    level: "Media",
    icon: CalendarClock,
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    id: 3,
    title: "Corral con capacidad máxima",
    description: "Corral B-05 · 95% ocupado",
    time: "Hace 4 horas",
    level: "Media",
    icon: AlertTriangle,
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
  },
];

function Topbar() {
  const location = useLocation();
  const [openAlerts, setOpenAlerts] = useState(false);

  const storedUsuario = localStorage.getItem("usuario");
  const usuario = storedUsuario ? JSON.parse(storedUsuario) : null;
  const rol = usuario?.rol || usuario?.nombre_rol;

  const getHomeTitleByRole = () => {
    if (rol === "Administrador") {
      return {
        title: "Dashboard",
        subtitle: "Vista general del sistema",
      };
    }

    if (rol === "Técnico" || rol === "Tecnico") {
      return {
        title: "Inicio Técnico",
        subtitle: "Panel operativo de registros, monitoreo y alertas",
      };
    }

    return {
      title: "Dashboard",
      subtitle: "Vista general del sistema",
    };
  };

  const titles = {
    "/": getHomeTitleByRole(),

    "/registro-nidos": {
      title: "Registro de Nidos",
      subtitle: "Registrar un nuevo nido",
    },
    "/corrales-nidos": {
      title: "Vista de Corrales",
      subtitle: "Consulta los detalles de los nidos de un corral",
    },
    "/temperatura": {
      title: "Temperatura",
      subtitle: "Monitoreo de temperatura",
    },
    "/nacimientos": {
      title: "Eclosión",
      subtitle: "Nacimientos",
    },
    "/exhumacion": {
      title: "Exhumación",
      subtitle: "Exhumación",
    },
    "/reportes": {
      title: "Reportes",
      subtitle: "Reportes",
    },
    "/gestion-corrales": {
      title: "Corrales",
      subtitle: "Gestión de corrales",
    },
    "/gestion-nidos": {
      title: "Gestión de nidos",
      subtitle: "Gestión de nidos",
    },
    "/gestion-nacimientos": {
      title: "Eclosión",
      subtitle: "Gestión de Nacimientos",
    },
    "/gestion-exhumacion": {
      title: "Exhumación",
      subtitle: "Gestión de Exhumación",
    },
    "/usuarios": {
      title: "Usuarios",
      subtitle: "Gestión de Usuarios",
    },
  };

  const current = titles[location.pathname] || {
    title: "IncuBase",
    subtitle: "Sistema de gestión",
  };

  return (
    <header className="relative flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">{current.title}</h1>
        <p className="text-sm text-gray-500">{current.subtitle}</p>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenAlerts((prev) => !prev)}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#D6E1DE] bg-[#F4F8F6] text-[#163832] transition hover:bg-[#E8F2EE] hover:text-[#006C3A]"
          aria-label="Ver alertas"
        >
          <Bell size={20} />

          {alerts.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D97706] px-1 text-[11px] font-bold text-white">
              {alerts.length}
            </span>
          )}
        </button>

        {openAlerts && (
          <div className="absolute right-0 top-14 z-50 w-[380px] rounded-2xl border border-[#D6E1DE] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
            <div className="flex items-start justify-between border-b border-[#E5ECE9] px-5 py-4">
              <div>
                <h2 className="text-sm font-bold text-[#163832]">
                  Alertas Pendientes
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {alerts.length} eventos requieren atención
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpenAlerts(false)}
                className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Cerrar alertas"
              >
                <X size={17} />
              </button>
            </div>

            <div className="max-h-[320px] overflow-y-auto p-3">
              {alerts.map((alert) => {
                const Icon = alert.icon;

                return (
                  <button
                    key={alert.id}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-[#F4F8F6]"
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${alert.dot}`} />

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E5ECE9] bg-white text-[#163832]">
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate text-sm font-bold text-[#163832]">
                          {alert.title}
                        </h3>

                        <span
                          className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${alert.badge}`}
                        >
                          {alert.level}
                        </span>
                      </div>

                      <p className="mt-0.5 truncate text-xs text-gray-500">
                        {alert.description}
                      </p>

                      <p className="mt-1 text-[11px] text-gray-400">
                        {alert.time}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-[#E5ECE9] px-4 py-3">
              <button
                type="button"
                className="w-full rounded-xl bg-[#EEF7F3] px-4 py-2 text-sm font-semibold text-[#006C3A] transition hover:bg-[#DFF0E9]"
              >
                Ver todas las alertas
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Topbar;
