import { useMemo, useState } from "react";
import { FileBarChart } from "lucide-react";

import ReportSummaryCards from "../../components/reportes/ReportSummaryCards";
import ReportFilters from "../../components/reportes/ReportFilters";
import ReportTypeCard from "../../components/reportes/ReportTypeCard";
import ReportPreviewTable from "../../components/reportes/ReportPreviewTable";
import ReportExportActions from "../../components/reportes/ReportExportActions";

import {
  corralesOptions,
  especiesOptions,
  generalSummary,
  reportTypes,
  getReportById,
} from "./reportes.config";

function ReportesPage() {
  const storedUsuario = localStorage.getItem("usuario");
  const usuario = storedUsuario ? JSON.parse(storedUsuario) : null;
  const rol = usuario?.rol || usuario?.nombre_rol || "Técnico";

  const allowedReports = useMemo(() => {
    return reportTypes.filter((report) => report.roles.includes(rol));
  }, [rol]);

  const [selectedReportId, setSelectedReportId] = useState(
    allowedReports[0]?.id || "corrales",
  );

  const [filters, setFilters] = useState({
    fechaInicio: "",
    fechaFin: "",
    corral: "Todos",
    especie: "Todas",
  });

  const selectedReport = getReportById(selectedReportId);

  const handleChangeFilters = (event) => {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      fechaInicio: "",
      fechaFin: "",
      corral: "Todos",
      especie: "Todas",
    });
  };

  const handleGenerateReport = () => {
    console.log("Generando reporte:", {
      selectedReportId,
      filters,
    });
  };

  const handleExportPdf = () => {
    console.log("Exportar PDF:", selectedReportId);
  };

  const handleExportExcel = () => {
    console.log("Exportar Excel:", selectedReportId);
  };

  return (
    <div className="space-y-6">
      <ReportSummaryCards summary={generalSummary} />

      <section className="rounded-2xl border border-[#D8E5DF] bg-white shadow-sm">
        <div className="border-b border-[#D8E5DF] px-6 py-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FileBarChart className="h-5 w-5 text-[#0F6B3D]" />
                <h2 className="text-lg font-bold text-[#163832]">
                  Centro de reportes
                </h2>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                Selecciona el tipo de reporte, aplica filtros y consulta la
                vista previa.
              </p>
            </div>

            <span className="w-fit rounded-full border border-[#BFD8D2] bg-[#EFF8F5] px-4 py-1.5 text-xs font-semibold text-[#0F6B3D]">
              Rol actual: {rol}
            </span>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <ReportFilters
            filters={filters}
            corralesOptions={corralesOptions}
            especiesOptions={especiesOptions}
            onChange={handleChangeFilters}
            onClear={handleClearFilters}
          />

          <div>
            <h3 className="mb-3 text-sm font-bold text-[#163832]">
              Tipo de reporte
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {allowedReports.map((report) => (
                <ReportTypeCard
                  key={report.id}
                  report={report}
                  active={selectedReportId === report.id}
                  onSelect={() => setSelectedReportId(report.id)}
                />
              ))}
            </div>
          </div>

          <ReportExportActions
            onGenerate={handleGenerateReport}
            onExportPdf={handleExportPdf}
            onExportExcel={handleExportExcel}
          />

          <ReportPreviewTable report={selectedReport} />
        </div>
      </section>
    </div>
  );
}

export default ReportesPage;
