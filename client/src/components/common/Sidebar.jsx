import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Thermometer,
  Circle,
  Baby,
  Fish,
  FileSearch,
  Wrench,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  UserCircle2,
  LogOut,
  ClipboardList,
  Egg,
  Users,
} from "lucide-react";

import logo from "../../assets/incubase-logo-sin-fondo.png";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [gestionOpen, setGestionOpen] = useState(false);

  const mainItems = [
    { label: "Dashboard", sublabel: "Inicio", path: "/", icon: LayoutDashboard },
    {
      label: "Corrales y Nidos",
      sublabel: "Detalles",
      path: "/corrales-nidos",
      icon: Map,
    },
    {
      label: "Temperatura",
      sublabel: "Monitoreo",
      path: "/temperatura",
      icon: Thermometer,
    },
    {
      label: "Registro de Nidos",
      sublabel: "Nidos",
      path: "/registro-nidos",
      icon: Egg,
    },
    {
      label: "Registro de Nacimientos",
      sublabel: "Nacimientos",
      path: "/nacimientos",
      icon: Fish,
    },
    {
      label: "Registro de Exhumación",
      sublabel: "Exhumación",
      path: "/exhumacion",
      icon: FileSearch,
    },
    {
      label: "Reportes",
      sublabel: "Detalles",
      path: "/reportes",
      icon: FileText,
    },
  ];

  const gestionItems = [
    {
      label: "Gestión de corrales",
      path: "/gestion-corrales",
      icon: ClipboardList,
    },
    {
      label: "Gestión de Nidos",
      path: "/gestion-nidos",
      icon: Egg,
    },
    {
      label: "Gestión de Nacimientos",
      path: "/gestion-nacimientos",
      icon: Baby,
    },
    {
      label: "Gestión de Exhumación",
      path: "/gestion-exhumacion",
      icon: FileSearch,
    },
    {
      label: "Gestión de Usuarios",
      path: "/usuarios",
      icon: Users,
    },
  ];

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
    setGestionOpen(false);
  };

  const toggleGestion = () => {
    setGestionOpen((prev) => !prev);
  };

  return (
    <aside
      className={`min-h-screen bg-[#062F2A] text-white flex flex-col justify-between border-r border-white/10 transition-all duration-300 ${
        collapsed ? "w-[88px]" : "w-[260px]"
      }`}
    >
      <div>
        <div className="h-[80px] border-b border-white/10 px-4 flex items-center">
          <div
            className={`flex items-center w-full ${
              collapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="h-12 w-12 rounded-xl bg-[#2B503E] flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={logo}
                alt="Logo IncuBase"
                className="h-8 w-8 object-contain opacity-90"
              />
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <h2 className="text-[18px] font-semibold leading-none">IncuBase</h2>
                <p className="text-sm text-white/75 mt-1">Playa Los Cóbanos</p>
              </div>
            )}
          </div>
        </div>

        <nav className="px-3 py-4 flex flex-col gap-2">
          {mainItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                title={collapsed ? item.label : ""}
                onClick={() => setGestionOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
                    isActive ? "bg-[#2B503E]" : "hover:bg-[#0B3B35]"
                  } ${collapsed ? "justify-center" : ""}`
                }
              >
                <Icon size={20} className="shrink-0 text-white/90" />

                {!collapsed && (
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-none truncate">
                      {item.label}
                    </p>
                    <span className="text-xs text-white/65">{item.sublabel}</span>
                  </div>
                )}
              </NavLink>
            );
          })}

          <div
            className="relative"
            onMouseLeave={() => collapsed && setGestionOpen(false)}
          >
            <button
              type="button"
              title={collapsed ? "Gestión" : ""}
              onMouseEnter={() => collapsed && setGestionOpen(true)}
              onClick={() => !collapsed && toggleGestion()}
              className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 transition-all hover:bg-[#0B3B35] ${
                !collapsed && gestionOpen ? "bg-[#0B3B35]" : ""
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Wrench size={20} className="shrink-0 text-white/90" />

              {!collapsed && (
                <>
                  <div className="min-w-0 text-left flex-1">
                    <p className="text-sm font-semibold leading-none">Gestión</p>
                    <span className="text-xs text-white/65">Historial</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      gestionOpen ? "rotate-180" : ""
                    }`}
                  />
                </>
              )}
            </button>

            {!collapsed && gestionOpen && (
              <div className="mt-2 ml-5 pl-4 border-l border-white/15 flex flex-col gap-1">
                {gestionItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setGestionOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                          isActive
                            ? "bg-[#2B503E]"
                            : "text-white/75 hover:bg-[#0B3B35] hover:text-white"
                        }`
                      }
                    >
                      <Icon size={15} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            )}

            {collapsed && gestionOpen && (
              <div
                onMouseEnter={() => setGestionOpen(true)}
                onMouseLeave={() => setGestionOpen(false)}
                className="absolute left-[78px] top-0 z-50 w-64 rounded-2xl bg-[#F3F7F6] shadow-xl border border-[#D6E1DE] p-3"
              >
                <div className="flex flex-col gap-1">
                  {gestionItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setGestionOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                            isActive
                              ? "bg-[#C7D8D3] text-[#163C36]"
                              : "text-[#21433F] hover:bg-[#E4ECEA]"
                          }`
                        }
                      >
                        <Icon size={17} />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={toggleCollapsed}
            title={collapsed ? "Expandir menú" : "Contraer menú"}
            className={`mt-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-left hover:bg-[#0B3B35] transition-all ${
              collapsed ? "justify-center" : ""
            }`}
          >
            {collapsed ? (
              <ChevronRight size={20} className="shrink-0" />
            ) : (
              <ChevronLeft size={20} className="shrink-0" />
            )}

            {!collapsed && (
              <span className="text-sm font-semibold">Contraer menú</span>
            )}
          </button>
        </nav>
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          } gap-3`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <UserCircle2 size={30} className="shrink-0 text-white/90" />

            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">Erick Ulises Martínez</p>
                <p className="text-xs text-white/65">Administrador</p>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-[#0B3B35] transition"
              title="Cerrar sesión"
            >
              <LogOut size={17} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;