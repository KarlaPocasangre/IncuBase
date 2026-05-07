import { useLocation } from "react-router-dom";

function Topbar() {
  const location = useLocation();

  const titles = {
    "/": {
      title: "Dashboard",
      subtitle: "Vista general del sistema",
    },
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
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <h1 className="text-xl font-semibold text-gray-800">{current.title}</h1>
      <p className="text-sm text-gray-500">{current.subtitle}</p>
    </header>
  );
}

export default Topbar;