import { Download, FileSpreadsheet, FileText, PlayCircle } from "lucide-react";

function ReportExportActions({ onGenerate, onExportPdf, onExportExcel }) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-[#D8E5DF] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-sm font-bold text-[#163832]">
          Acciones del reporte
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Genera la vista previa o prepara la exportación del reporte.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onGenerate}
          className="inline-flex h-[44px] items-center justify-center gap-2 rounded-lg bg-[#006B35] px-5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#005A2C] hover:shadow-md"
        >
          <PlayCircle className="h-4 w-4" />
          Generar
        </button>

        <button
          type="button"
          onClick={onExportPdf}
          className="inline-flex h-[44px] items-center justify-center gap-2 rounded-lg border border-[#D7E4E0] bg-white px-5 text-sm font-semibold text-[#111827] shadow-sm transition hover:bg-[#F8FCFA]"
        >
          <FileText className="h-4 w-4 text-red-500" />
          PDF
        </button>

        <button
          type="button"
          onClick={onExportExcel}
          className="inline-flex h-[44px] items-center justify-center gap-2 rounded-lg border border-[#D7E4E0] bg-white px-5 text-sm font-semibold text-[#111827] shadow-sm transition hover:bg-[#F8FCFA]"
        >
          <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
          Excel
        </button>
      </div>
    </section>
  );
}

export default ReportExportActions;
