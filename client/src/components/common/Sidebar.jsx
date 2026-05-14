import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Thermometer,
  FileSearch,
  Wrench,
  FileText,
  ChevronDown,
  UserCircle2,
  LogOut,
  ClipboardList,
  Egg,
  Users,
  Fence,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
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
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

  const nombreCompleto = usuario
    ? `${usuario.nombre || ""} ${usuario.apellido || ""}`.trim()
    : "Usuario";

  const rolUsuario = usuario?.rol || "Sin rol";

  const sections = [
    {
      title: "Principal",
      items: [
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
      ],
    },
    {
      title: "Monitoreo",
      items: [
        {
          label: "Corrales y Nidos",
          sublabel: "Consulta",
          path: "/corrales-nidos",
          icon: Fence,
        },
        {
          label: "Temperatura",
          sublabel: "Monitoreo",
          path: "/temperatura",
          icon: Thermometer,
        },
      ],
    },
    {
      title: "Registros",
      items: [
        {
          label: "Registro de Nidos",
          sublabel: "Nidos",
          path: "/registro-nidos",
          icon: Egg,
        },
        {
          label: "Registro de Nacimientos",
          sublabel: "Eclosión",
          path: "/nacimientos",
          customIcon: turtleIcon,
          collapsedIcon: turtleCollapsedIcon,
        },
        {
          label: "Registro de Exhumación",
          sublabel: "Exhumación",
          path: "/exhumacion",
          icon: FileSearch,
        },
      ],
    },
    {
      title: "Análisis",
      items: [
        {
          label: "Reportes",
          sublabel: "Documentos",
          path: "/reportes",
          icon: FileText,
        },
      ],
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

  const cerrarSesion = async () => {
    const result = await showLogoutConfirm();

    if (!result.isConfirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login", { replace: true });
  };

  const renderMenuIcon = (item, isActive = false) => {
    const Icon = item.icon;

    if (item.customIcon) {
      return (
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all ${
            isActive
              ? "bg-[#B9F3D4] text-[#063B34]"
              : "bg-white/8 text-white group-hover:bg-white/12"
          }`}
        >
          <img
            src={
              collapsed
                ? item.collapsedIcon || item.customIcon
                : item.customIcon
            }
            alt={item.label}
            className="h-5 w-5 object-contain"
          />
        </span>
      );
    }

    return (
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all ${
          isActive
            ? "bg-[#B9F3D4] text-[#063B34]"
            : "bg-white/8 text-white group-hover:bg-white/12"
        }`}
      >
        <Icon size={19} />
      </span>
    );
  };

  const renderGestionIcon = (isActive = false) => (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all ${
        isActive
          ? "bg-[#B9F3D4] text-[#063B34]"
          : "bg-white/8 text-white group-hover:bg-white/12"
      }`}
    >
      <Wrench size={19} />
    </span>
  );

  return (
    <aside
      className={`relative flex h-screen shrink-0 flex-col border-r border-white/10 bg-[#043D35] text-white shadow-[8px_0_30px_rgba(0,0,0,0.08)] transition-all duration-300 ${
        collapsed ? "w-[88px]" : "w-[280px]"
      }`}
    >
      {/* HEADER */}
      <div className="flex h-[82px] shrink-0 items-center border-b border-white/10 px-4">
        <div
          className={`flex w-full items-center ${
            collapsed ? "justify-center" : "justify-between gap-3"
          }`}
        >
          <div
            className={`flex min-w-0 items-center ${
              collapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10">
              <img
                src={logo}
                alt="Logo IncuBase"
                className="h-8 w-8 object-contain"
              />
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <h2 className="truncate text-[18px] font-bold leading-none">
                  IncuBase
                </h2>
                <p className="mt-1 truncate text-xs font-medium text-white/65">
                  Playa Los Cóbanos
                </p>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              type="button"
              onClick={toggleCollapsed}
              title="Contraer menú"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white/75 transition-all hover:bg-white/10 hover:text-white"
            >
              <PanelLeftClose size={20} />
            </button>
          )}
        </div>
      </div>

      {/* BOTÓN FLOTANTE PARA EXPANDIR */}
      {collapsed && (
        <button
          type="button"
          onClick={toggleCollapsed}
          title="Expandir menú"
          className="absolute right-[-14px] top-[27px] z-30 flex h-8 w-8 items-center justify-center rounded-full border border-[#CFE0DA] bg-white text-[#063B34] shadow-md transition-all hover:scale-105 hover:bg-[#F3F8F6]"
        >
          <PanelLeftOpen size={17} />
        </button>
      )}

      {/* CONTENIDO */}
      <div className="flex-1 overflow-y-auto overflow-x-visible px-3 py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <nav className="flex flex-col gap-5">
          {sections.map((section, sectionIndex) => (
            <div key={section.title} className="flex flex-col gap-1.5">
              {!collapsed ? (
                <div className="px-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                    {section.title}
                  </p>
                </div>
              ) : sectionIndex > 0 ? (
                <div className="mx-2 my-1 border-t border-white/10" />
              ) : null}

              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  title={collapsed ? item.label : ""}
                  onClick={() => setGestionOpen(false)}
                  className={({ isActive }) =>
                    `group relative flex items-center rounded-2xl transition-all duration-200 ${
                      collapsed
                        ? "justify-center px-2 py-1.5"
                        : "gap-3 px-3 py-2"
                    } ${
                      isActive
                        ? "bg-[#0E5A4F] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                        : "hover:bg-[#075047]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#B9F3D4]" />
                      )}

                      {renderMenuIcon(item, isActive)}

                      {!collapsed && (
                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate text-sm font-semibold leading-tight ${
                              isActive ? "text-white" : "text-white/90"
                            }`}
                          >
                            {item.label}
                          </p>
                          <span
                            className={`block truncate text-xs leading-tight ${
                              isActive ? "text-white/70" : "text-white/50"
                            }`}
                          >
                            {item.sublabel}
                          </span>
                        </div>
                      )}

                      {collapsed && (
                        <span className="pointer-events-none absolute left-[74px] z-50 hidden whitespace-nowrap rounded-xl bg-[#102E29] px-3 py-2 text-xs font-semibold text-white shadow-xl group-hover:block">
                          {item.label}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}

          {/* SECCIÓN ADMINISTRACIÓN */}
          <div className="flex flex-col gap-1.5">
            {!collapsed ? (
              <div className="px-3 pt-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  Administración
                </p>
              </div>
            ) : (
              <div className="mx-2 my-1 border-t border-white/10" />
            )}

            <div className="relative">
              <button
                type="button"
                title={collapsed ? "Gestión" : ""}
                onClick={() => setGestionOpen((prev) => !prev)}
                onMouseEnter={() => collapsed && setGestionOpen(true)}
                className={`group relative flex w-full items-center rounded-2xl transition-all duration-200 ${
                  collapsed ? "justify-center px-2 py-1.5" : "gap-3 px-3 py-2"
                } ${gestionOpen ? "bg-[#0E5A4F]" : "hover:bg-[#075047]"}`}
              >
                {renderGestionIcon(gestionOpen)}

                {!collapsed && (
                  <>
                    <div className="min-w-0 flex-1 text-left">
                      <p className="truncate text-sm font-semibold leading-tight text-white/90">
                        Gestión
                      </p>
                      <span className="block truncate text-xs leading-tight text-white/50">
                        Administración
                      </span>
                    </div>

                    <ChevronDown
                      size={16}
                      className={`text-white/65 transition-transform ${
                        gestionOpen ? "rotate-180" : ""
                      }`}
                    />
                  </>
                )}

                {collapsed && (
                  <span className="pointer-events-none absolute left-[74px] z-50 hidden whitespace-nowrap rounded-xl bg-[#102E29] px-3 py-2 text-xs font-semibold text-white shadow-xl group-hover:block">
                    Gestión
                  </span>
                )}
              </button>

              {!collapsed && gestionOpen && (
                <div className="mt-2 ml-5 flex flex-col gap-1 border-l border-white/15 pl-4">
                  {gestionItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setGestionOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-all ${
                            isActive
                              ? "bg-[#B9F3D4] text-[#063B34]"
                              : "text-white/70 hover:bg-[#075047] hover:text-white"
                          }`
                        }
                      >
                        {item.customIcon ? (
                          <img
                            src={item.customIcon}
                            alt={item.label}
                            className="h-[15px] w-[15px] shrink-0 object-contain"
                          />
                        ) : (
                          <Icon size={15} />
                        )}

                        <span className="truncate">{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}

              {collapsed && gestionOpen && (
                <div
                  onMouseLeave={() => setGestionOpen(false)}
                  className="fixed left-[98px] top-[482px] z-50 w-[255px] rounded-3xl border border-[#CFE0DA] bg-[#F5FAF8] p-3 shadow-[0_18px_45px_rgba(7,38,32,0.18)]"
                >
                  <div className="mb-2 px-2">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#6D837C]">
                      Administración
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    {gestionItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={() => setGestionOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all ${
                              isActive
                                ? "bg-[#C9DDD8] text-[#063B34]"
                                : "text-[#21433F] hover:bg-[#E4EFEB]"
                            }`
                          }
                        >
                          {item.customIcon ? (
                            <img
                              src={item.collapsedIcon || item.customIcon}
                              alt={item.label}
                              className="h-[17px] w-[17px] shrink-0 object-contain"
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
          </div>
        </nav>
      </div>

      {/* FOOTER */}
      <div className="shrink-0 border-t border-white/10 bg-[#043D35] px-4 py-4">
        {collapsed ? (
          <button
            type="button"
            onClick={cerrarSesion}
            className="flex w-full items-center justify-center rounded-2xl p-3 text-white/85 transition-all hover:bg-[#075047] hover:text-white"
            title="Cerrar sesión"
          >
            <LogOut size={22} />
          </button>
        ) : (
          <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                <UserCircle2 size={28} className="text-white/90" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {nombreCompleto}
                </p>
                <p className="truncate text-xs text-white/55">{rolUsuario}</p>
              </div>

              <button
                type="button"
                onClick={cerrarSesion}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white/70 transition-all hover:bg-white/10 hover:text-white"
                title="Cerrar sesión"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
