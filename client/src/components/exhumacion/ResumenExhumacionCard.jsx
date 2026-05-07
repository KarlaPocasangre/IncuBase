import { Search } from "lucide-react";

export default function ResumenExhumacionCard({ nidoSeleccionado, resumen }) {
  if (!nidoSeleccionado) {
    return (
      <div className="rounded-2xl border border-[#C9DDD8] bg-[#E9F5F1] p-7 shadow-sm">
        <h3 className="text-lg font-bold text-[#111827]">
          Resumen de Exhumacion
        </h3>

        <div className="flex min-h-[190px] flex-col items-center justify-center text-center">
          <Search className="mb-5 h-16 w-16 text-[#8EA09A]" strokeWidth={1.5} />

          <p className="text-sm text-[#6B7280]">
            Selecciona un nido para ver el resumen
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#C9DDD8] bg-[#E9F5F1] p-5 shadow-sm">
      <h3 className="mb-5 text-center text-lg font-bold text-[#111827]">
        Resumen de Exhumacion
      </h3>

      <div className="space-y-4">
        <SummaryItem
          label="Huevos Iniciales"
          value={resumen.huevosIniciales}
          className="bg-white"
          valueClassName="text-[#111827]"
        />

        <SummaryItem
          label="Liberados Vivos"
          value={resumen.liberadosVivos}
          className="bg-[#D6F3E5]"
          valueClassName="text-[#007A4D]"
        />

        <SummaryItem
          label="Sin Eclosionar"
          value={resumen.sinEclosionar}
          className="bg-[#EEECD9]"
          valueClassName="text-[#D97706]"
        />

        <SummaryItem
          label="Embriones Muertos"
          value={resumen.embrionesMuertos}
          className="bg-[#F1DEDE]"
          valueClassName="text-[#DC2626]"
        />
      </div>
    </div>
  );
}

function SummaryItem({ label, value, className, valueClassName }) {
  return (
    <div className={`rounded-lg p-4 text-center shadow-sm ${className}`}>
      <p className="text-sm text-[#374151]">{label}</p>
      <p className={`text-2xl font-bold ${valueClassName}`}>{value}</p>
    </div>
  );
}
