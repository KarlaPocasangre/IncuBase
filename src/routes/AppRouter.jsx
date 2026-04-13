import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import CorralesNidosPage from "../pages/CorralesNidosPage";
import RegistroNidosPage from "../pages/RegistroNidosPage";
import TemperaturaPage from "../pages/TemperaturaPage";
import NacimientosPage from "../pages/NacimientosPage";
import ExhumacionPage from "../pages/ExhumacionPage";
import ReportesPage from "../pages/ReportesPage";
import UsuariosPage from "../pages/UsuariosPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/corrales-nidos" element={<CorralesNidosPage />} />
          <Route path="/registro-nidos" element={<RegistroNidosPage />} />
          <Route path="/temperatura" element={<TemperaturaPage />} />
          <Route path="/nacimientos" element={<NacimientosPage />} />
          <Route path="/exhumacion" element={<ExhumacionPage />} />
          <Route path="/reportes" element={<ReportesPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;