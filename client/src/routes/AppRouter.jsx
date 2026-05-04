import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

/* AUTH */
import Login from "../pages/auth/Login.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import VerifyCode from "../pages/auth/VerifyCode.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";

/* SISTEMA */
import DashboardPage from "../pages/dashboard/DashboardAdminPage.jsx";
import CorralesNidosPage from "../pages/corralesNidos/CorralesNidosPage.jsx";
import GestionCorralesPage from "../pages/gestion/corrales/GestionCorralesPage.jsx";
import RegistroNidosPage from "../pages/registro/nidos/RegistroNidosPage.jsx";
import TemperaturaPage from "../pages/registro/temperatura/TemperaturaPage.jsx";
import NacimientosPage from "../pages/registro/nacimientos/NacimientosPage.jsx";
import ExhumacionPage from "../pages/registro/exhumacion/ExhumacionPage.jsx";
import ReportesPage from "../pages/reportes/ReportesPage.jsx";
import UsuariosView from "../pages/gestion/usuarios/UsuariosView.jsx";

import GestionNidosPage from "../pages/gestion/nidos/GestionNidosPage.jsx";
import GestionNacimientosPage from "../pages/gestion/nacimientos/GestionNacimientosPage.jsx";
import GestionExhumacionPage from "../pages/gestion/exhumacion/GestionExhumacionPage.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLICAS */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* PRIVADAS */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/corrales-nidos" element={<CorralesNidosPage />} />
          <Route path="/gestion-corrales" element={<GestionCorralesPage />} />
          <Route path="/registro-nidos" element={<RegistroNidosPage />} />
          <Route path="/temperatura" element={<TemperaturaPage />} />
          <Route path="/nacimientos" element={<NacimientosPage />} />
          <Route path="/exhumacion" element={<ExhumacionPage />} />
          <Route path="/reportes" element={<ReportesPage />} />
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

        {/* SI NO EXISTE RUTA */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
