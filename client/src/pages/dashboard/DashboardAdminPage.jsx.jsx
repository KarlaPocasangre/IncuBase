import AdminSummaryBar from "../../components/dashboard/admin/AdminSummaryBar";
import AlertasNivelChart from "../../components/dashboard/admin/AlertasNivelChart";
import AdminActivityPanel from "../../components/dashboard/admin/AdminActivityPanel";
import NidosEstadoChart from "../../components/dashboard/admin/NidosEstadoChart";
import OcupacionCorralesChart from "../../components/dashboard/admin/OcupacionCorralesChart";
import ResultadosEspeciesChart from "../../components/dashboard/admin/ResultadosEspeciesChart";
import TemperaturaPromedioChart from "../../components/dashboard/admin/TemperaturaPromedioChart";
import TendenciaMensualChart from "../../components/dashboard/admin/TendenciaMensualChart";

function DashboardAdminPage() {
  return (
    <main className="min-h-full bg-[#EEF5F2] px-6 py-6">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-5">
        <AdminSummaryBar />

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <NidosEstadoChart />
          <AlertasNivelChart />
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <TendenciaMensualChart />
          <OcupacionCorralesChart />
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <ResultadosEspeciesChart />
          <TemperaturaPromedioChart />
        </section>

        <AdminActivityPanel />
      </div>
    </main>
  );
}

export default DashboardAdminPage;
