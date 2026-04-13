import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout() {
  const location = useLocation();

  const pageData = {
    "/": {
      title: "Dashboard",
      subtitle: "Inicio",
    },
    "/corrales-nidos": {
      title: "Corrales y Nidos",
      subtitle: "Detalles",
    },
    "/registro-nidos": {
      title: "Registro de Nidos",
      subtitle: "Registro de Nidos",
    },
    "/temperatura": {
      title: "Temperatura",
      subtitle: "Monitoreo",
    },
    "/nacimientos": {
      title: "Nacimientos",
      subtitle: "Detalles",
    },
    "/exhumacion": {
      title: "Exhumación",
      subtitle: "Exhumación",
    },
    "/reportes": {
      title: "Reportes",
      subtitle: "Detalles",
    },
    "/usuarios": {
      title: "Usuarios",
      subtitle: "Gestión",
    },
  };

  const currentPage = pageData[location.pathname] || {
    title: "IncuBase",
    subtitle: "Sistema",
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-[#F4F6F5]">
        <Topbar
          title={currentPage.title}
          subtitle={currentPage.subtitle}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;