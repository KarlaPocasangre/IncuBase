import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Thermometer,
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
  Fence,
  Bell,
} from "lucide-react";

import logo from "../../assets/logo-tortugaSVG.svg";
import turtleIcon from "../../assets/turtleWhite.svg";
import turtleCollapsedIcon from "../../assets/turtle2SVG.svg";

import { showLogoutConfirm } from "../../utils/alerts";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [gestionOpen, setGestionOpen] = useState(false);

  const navigate = useNavigate();

  const usuarioGuardado = localStorage.getItem("usuario");
  let usuario = null;

    try {
      usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
    } catch (error) {
      console.error("Error leyendo usuario desde localStorage:", error);
      localStorage.removeItem("usuario");
    }

  const nombreCompleto = usuario
    ? `${usuario.nombre || ""} ${usuario.apellido || ""}`.trim()
    : "Usuario";

  const rolUsuario = usuario?.rol || "Sin rol";

  const mainItems = [
    {
      label: "Dashboard",
      sublabel: "Inicio",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Alertas",
      sublabel: "Seguimiento",
      path: "/alertas",
      icon: Bell,
    },
    {
      label: "Corrales y Nidos",
      sublabel: "Detalles",
      path: "/corrales-nidos",
      icon: Fence,
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
      customIcon: turtleIcon,
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
      customIcon: turtleIcon,
      collapsedIcon: turtleCollapsedIcon,
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

  const cerrarSesion = async () => {
    const result = await showLogoutConfirm();

    if (!result.isConfirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`h-screen shrink-0 bg-[#062F2A] text-white flex flex-col border-r border-white/10 transition-all duration-300 ${
        collapsed ? "w-[88px]" : "w-[260px]"
      }`}
    >
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="h-[80px] border-b border-white/10 px-4 flex items-center">
          <div
            className={`flex items-center w-full ${
              collapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="h-12 w-12 rounded-xl bg-[#062F2A] flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={logo}
                alt="Logo IncuBase"
                className="h-8 w-8 object-contain opacity-90"
              />
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <h2 className="text-[18px] font-semibold leading-none">
                  IncuBase
                </h2>
                <p className="text-sm text-white/75 mt-1">Playa Los Cóbanos</p>
              </div>
            )}
          </div>
        </div>

        <nav className="px-4 py-2.5 flex flex-col gap-1">
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
                  `group flex items-start gap-3 rounded-2xl px-4 py-3 transition-all ${
                    isActive ? "bg-[#2B503E]" : "hover:bg-[#0B3B35]"
                  } ${collapsed ? "justify-center" : ""}`
                }
              >
                {item.customIcon ? (
                  <img
                    src={item.customIcon}
                    alt={item.label}
                    className="h-5 w-5 shrink-0 object-contain opacity-90"
                  />
                ) : (
                  <Icon size={20} className="shrink-0 text-white/90" />
                )}

                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight whitespace-normal">
                      {item.label}
                    </p>
                    <span className="text-xs text-white/65 leading-tight">
                      {item.sublabel}
                    </span>
                  </div>
                )}
              </NavLink>
            );
          })}

          <div className="relative">
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
                    <p className="text-sm font-semibold leading-none">
                      Gestión
                    </p>
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
                      {item.customIcon ? (
                        <img
                          src={item.customIcon}
                          alt={item.label}
                          className="h-[15px] w-[15px] shrink-0 object-contain opacity-90"
                        />
                      ) : (
                        <Icon size={15} />
                      )}

                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            )}

            {collapsed && gestionOpen && (
              <div className="fixed left-[95px] top-[335px] z-50 w-64 rounded-2xl bg-[#F3F7F6] shadow-xl border border-[#D6E1DE] p-3">
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
                        {item.customIcon ? (
                          <img
                            src={item.collapsedIcon || item.customIcon}
                            alt={item.label}
                            className="h-[17px] w-[17px] shrink-0 object-contain opacity-90"
                          />
                        ) : (
                          <Icon size={17} />
                        )}

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
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}

            {!collapsed && (
              <span className="text-sm font-semibold">Contraer menú</span>
            )}
          </button>
        </nav>
      </div>

      <div className="border-t border-white/10 px-4 py-4 shrink-0 bg-[#062F2A]">
        {collapsed ? (
          <button
            type="button"
            onClick={cerrarSesion}
            className="flex w-full items-center justify-center rounded-2xl p-3 text-white/90 transition hover:bg-[#0B3B35] hover:text-white"
            title="Cerrar sesión"
          >
            <LogOut size={24} />
          </button>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <UserCircle2 size={30} className="shrink-0 text-white/90" />

              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">
                  {nombreCompleto}
                </p>
                <p className="text-xs text-white/65">{rolUsuario}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={cerrarSesion}
              className="p-2 rounded-lg hover:bg-[#0B3B35] transition"
              title="Cerrar sesión"
            >
              <LogOut size={17} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
