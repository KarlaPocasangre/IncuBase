import { Filter, Fence, Shell } from "lucide-react";
import ClearButton from "../common/ClearButton";
import DateInput from "../common/DateInput";

function ReportFilters({
  filters,
  corralesOptions,
  especiesOptions,
  onChange,
  onClear,
}) {
  return (
    <section className="rounded-2xl border border-[#D8E5DF] bg-[#F8FCFA] p-5">
      <div className="mb-4 flex items-center gap-2">
        <Filter className="h-5 w-5 text-[#0F6B3D]" />
        <h3 className="text-base font-bold text-[#163832]">
          Filtros del reporte
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        <DateInput
          label="Fecha inicio"
          name="fechaInicio"
          value={filters.fechaInicio}
          onChange={onChange}
        />

        <DateInput
          label="Fecha fin"
          name="fechaFin"
          value={filters.fechaFin}
          onChange={onChange}
        />

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#111827]">
            Corral
          </label>

          <div className="relative">
            <Fence className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <select
              name="corral"
              value={filters.corral}
              onChange={onChange}
              className="select-base input-icon-left"
            >
              {corralesOptions.map((corral) => (
                <option key={corral} value={corral}>
                  {corral}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#111827]">
            Especie
          </label>

          <div className="relative">
            <Shell className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <select
              name="especie"
              value={filters.especie}
              onChange={onChange}
              className="select-base input-icon-left"
            >
              {especiesOptions.map((especie) => (
                <option key={especie} value={especie}>
                  {especie}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-end">
          <ClearButton
            onClick={onClear}
            variant="filters"
            className="w-full lg:w-auto"
          >
            Limpiar
          </ClearButton>
        </div>
      </div>
    </section>
  );
}

export default ReportFilters;
