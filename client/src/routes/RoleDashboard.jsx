import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import DashboardAdminPage from "../pages/dashboard/DashboardAdminPage.jsx";
import DashboardTecnicoPage from "../pages/dashboard/DashboardTecnicoPage.jsx";

function RoleDashboard() {
  const { usuario } = useAuth();

  const normalizarRol = (rol) =>
    rol
      ?.trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const rolUsuario = normalizarRol(usuario?.rol);

  if (rolUsuario === "Administrador") {
    return <DashboardAdminPage />;
  }

  if (rolUsuario === "Tecnico") {
    return <DashboardTecnicoPage />;
  }

  return <Navigate to="/403" replace />;
}

export default RoleDashboard;
