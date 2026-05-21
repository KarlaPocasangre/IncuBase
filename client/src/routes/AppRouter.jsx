import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

/* AUTH */
import Login from "../pages/auth/Login.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import VerifyCode from "../pages/auth/VerifyCode.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";
import RoleDashboard from "./RoleDashboard.jsx";

/* SISTEMA */
import CorralesNidosPage from "../pages/corralesNidos/CorralesNidosPage.jsx";
import GestionCorralesPage from "../pages/gestion/corrales/GestionCorralesPage.jsx";
import RegistroNidosPage from "../pages/registro/nidos/RegistroNidosPage.jsx";
import TemperaturaPage from "../pages/registro/temperatura/TemperaturaPage.jsx";
import NacimientosPage from "../pages/registro/nacimientos/NacimientosPage.jsx";
import ExhumacionPage from "../pages/registro/exhumacion/ExhumacionPage.jsx";
import ReportesPage from "../pages/reportes/ReportesPage.jsx";
import UsuariosView from "../pages/gestion/usuarios/UsuariosView.jsx";
import GuiaIncubasePage from "../pages/informacion/GuiaIncubasePage.jsx";
import AlertasPage from "../pages/alertas/AlertasPage.jsx";

import GestionNidosPage from "../pages/gestion/nidos/GestionNidosPage.jsx";
import GestionNacimientosPage from "../pages/gestion/nacimientos/GestionNacimientosPage.jsx";
import GestionExhumacionPage from "../pages/gestion/exhumacion/GestionExhumacionPage.jsx";

/* ERRORES */
import NotFound from "../pages/errors/NotFound.jsx";
import Forbidden from "../pages/errors/Forbidden.jsx";
import Maintenance from "../pages/errors/Maintenance.jsx";
import ServerError from "../pages/errors/ServerError.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* RUTAS DE ERROR - FUERA DEL LAYOUT */}
        <Route path="/403" element={<Forbidden />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/500" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />

        {/* RUTAS PRIVADAS GENERALES */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<RoleDashboard />} />
          <Route path="/corrales-nidos" element={<CorralesNidosPage />} />
          <Route path="/registro-nidos" element={<RegistroNidosPage />} />
          <Route path="/temperatura" element={<TemperaturaPage />} />
          <Route path="/nacimientos" element={<NacimientosPage />} />
          <Route path="/exhumacion" element={<ExhumacionPage />} />
          <Route path="/reportes" element={<ReportesPage />} />
          <Route path="/alertas" element={<AlertasPage />} />
          <Route path="/guia-incubase" element={<GuiaIncubasePage />} />
        </Route>

        {/* RUTAS PRIVADAS SOLO ADMINISTRADOR */}
        <Route
          element={
            <PrivateRoute allowedRoles={["Administrador"]}>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/gestion-corrales" element={<GestionCorralesPage />} />
          <Route path="/usuarios" element={<UsuariosView />} />
          <Route path="/gestion-nidos" element={<GestionNidosPage />} />
          <Route
            path="/gestion-nacimientos"
            element={<GestionNacimientosPage />}
          />
          <Route
            path="/gestion-exhumacion"
            element={<GestionExhumacionPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
