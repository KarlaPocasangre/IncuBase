import DashboardAdminPage from "../pages/dashboard/DashboardAdminPage.jsx";
import DashboardTecnicoPage from "../pages/dashboard/DashboardTecnicoPage.jsx";
import Forbidden from "../pages/errors/Forbidden.jsx";

function RoleDashboard() {
  const storedUsuario = localStorage.getItem("usuario");
  const usuario = storedUsuario ? JSON.parse(storedUsuario) : null;

  const rol = usuario?.rol || usuario?.nombre_rol;

  if (rol === "Administrador") {
    return <DashboardAdminPage />;
  }

  if (rol === "Técnico" || rol === "Tecnico") {
    return <DashboardTecnicoPage />;
  }

  return <Forbidden />;
}

export default RoleDashboard;
