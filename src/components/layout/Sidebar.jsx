import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Fence,
  ClipboardList,
  Thermometer,
  Egg,
  Box,
  FileText,
  Users,
  ChevronsLeft,
  ChevronsRight,
  CircleUserRound,
  LogOut,
} from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/", desc: "Inicio", icon: LayoutGrid },
  { name: "Corrales y Nidos", path: "/corrales-nidos", desc: "Detalles", icon: Fence },
  { name: "Registro de Nidos", path: "/registro-nidos", desc: "Registro de Nidos", icon: ClipboardList },
  { name: "Temperatura", path: "/temperatura", desc: "Monitoreo", icon: Thermometer },
  { name: "Nacimientos", path: "/nacimientos", desc: "Detalles", icon: Egg },
  { name: "Exhumación", path: "/exhumacion", desc: "Detalles", icon: Box },
  { name: "Reportes", path: "/reportes", desc: "Detalles", icon: FileText },
  { name: "Usuarios", path: "/usuarios", desc: "Gestión", icon: Users },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-[#0B2B26] text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-[74px]" : "w-[190px]"
      }`}
    >
      {/* Logo */}
      <div
        className={`h-20 border-b border-[#1E473E] flex items-center ${
          collapsed ? "justify-center px-2" : "px-4"
        }`}
      >
        {collapsed ? (
          <h1 className="text-[18px] font-bold leading-none">I</h1>
        ) : (
          <div>
            <h1 className="text-[18px] font-bold leading-none">IncuBase</h1>
            <p className="mt-1 text-[10px] text-[#C8DDD5]">Playa los Cobanos</p>
          </div>
        )}
      </div>

      {/* Menú */}
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.name : ""}
              className={({ isActive }) =>
                `group flex rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-[#2B503E] text-white"
                    : "text-[#E4F1EC] hover:bg-[#2B503E]"
                } ${collapsed ? "justify-center px-2 py-3" : "items-start gap-3 px-3 py-3"}`
              }
            >
              <Icon size={16} className={`shrink-0 ${collapsed ? "" : "mt-0.5"}`} />

              {!collapsed && (
                <div className="leading-tight">
                  <p className="text-[12px] font-semibold">{item.name}</p>
                  <p className="mt-1 text-[10px] text-[#C6D8D1]">{item.desc}</p>
                </div>
              )}
            </NavLink>
          );
        })}

        {/* Botón contraer / expandir */}
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className={`mt-2 flex w-full rounded-lg text-left text-[#E4F1EC] transition-colors duration-200 hover:bg-[#2B503E] ${
            collapsed ? "justify-center px-2 py-3" : "items-center gap-3 px-3 py-3"
          }`}
          title={collapsed ? "Expandir menú" : "Contraer menú"}
        >
          {collapsed ? (
            <ChevronsRight size={16} className="shrink-0" />
          ) : (
            <>
              <ChevronsLeft size={16} className="shrink-0" />
              <span className="text-[12px] font-medium">Contraer menú</span>
            </>
          )}
        </button>
      </nav>

      {/* Usuario */}
      <div className="border-t border-[#1E473E] px-2 py-4">
        {collapsed ? (
          <div className="flex flex-col items-center gap-3">
            <CircleUserRound size={18} className="text-[#D8E7E2]" />
            <button
              type="button"
              className="text-[#D8E7E2] transition-colors duration-200 hover:text-white"
              title="Cerrar sesión"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <CircleUserRound size={18} className="text-[#D8E7E2] shrink-0" />

              <div className="leading-tight">
                <p className="text-[11px] font-semibold text-white">
                  Erick Ulises Martinez
                </p>
                <p className="mt-0.5 text-[10px] text-[#BDD3CB]">
                  Administrador
                </p>
              </div>
            </div>

            <button
              type="button"
              className="text-[#D8E7E2] transition-colors duration-200 hover:text-white"
              title="Cerrar sesión"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;