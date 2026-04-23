import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";

/* AUTH */
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyCode from "../pages/auth/VerifyCode";
import ResetPassword from "../pages/auth/ResetPassword";

/* SISTEMA */
import DashboardPage from "../pages/dashboard/DashboardPage";
import CorralesNidosPage from "../pages/corralesNidos/CorralesNidosPage";
import GestionCorralesPage from "../pages/gestioncorrales/GestionCorralesPage";
import RegistroNidosPage from "../pages/registronidos/RegistroNidosPage";
import TemperaturaPage from "../pages/temperatura/TemperaturaPage";
import NacimientosPage from "../pages/nacimientos/NacimientosPage";
import ExhumacionPage from "../pages/exhumacion/ExhumacionPage";
import ReportesPage from "../pages/reportes/ReportesPage";
import UsuariosView from "../pages/usuarios/UsuariosView";

import GestionNidosPage from "../pages/gestionnidos/GestionNidosPage";
import GestionNacimientosPage from "../pages/gestionnacimientos/GestionNacimientosPage";
import GestionExhumacionPage from "../pages/gestionexhumacion/GestionExhumacionPage";

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
          <Route path="/gestion-nacimientos" element={<GestionNacimientosPage />} />
          <Route path="/gestion-exhumacion" element={<GestionExhumacionPage />} />
        </Route>

        {/* SI NO EXISTE RUTA */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;