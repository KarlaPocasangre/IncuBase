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
  };

  const current = titles[location.pathname] || {
    title: "IncuBase",
    subtitle: "Sistema de gestión",
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <h1 className="text-xl font-semibold text-gray-800">
        {current.title}
      </h1>
      <p className="text-sm text-gray-500">
        {current.subtitle}
      </p>
    </header>
  );
}

export default Topbar;