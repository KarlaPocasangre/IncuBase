import { Fence, MapPin, ClipboardList } from "lucide-react";
import DateTimeInput from "../common/DateTimeInput";

function TemperaturaForm({
  formData,
  corralesOptions,
  sectoresFiltrados,
  onChange,
}) {
  return (
    <section className="rounded-2xl border border-[#D8E5DF] bg-white p-5 shadow-sm">
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-[#0F6B3D]" />
          <h3 className="text-base font-bold text-[#163832]">
            Datos del registro
          </h3>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          Selecciona el corral, sector y fecha de la medición.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#111827]">
            Corral
          </label>

          <div className="relative">
            <Fence className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <select
              name="idCorral"
              value={formData.idCorral}
              onChange={onChange}
              className="select-base input-icon-left"
            >
              <option value="">Selecciona un corral</option>

              {corralesOptions.map((corral) => (
                <option key={corral.id} value={corral.id}>
                  {corral.codigo} · {corral.ubicacion}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#111827]">
            Sector
          </label>

          <div className="relative">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <select
              name="idSector"
              value={formData.idSector}
              onChange={onChange}
              disabled={!formData.idCorral}
              className="select-base input-icon-left"
            >
              <option value="">
                {formData.idCorral
                  ? "Selecciona un sector"
                  : "Primero selecciona un corral"}
              </option>

              {sectoresFiltrados.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.codigo} · {sector.descripcion}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DateTimeInput
          label="Fecha y hora de medición"
          name="fechaHoraMedicion"
          value={formData.fechaHoraMedicion}
          onChange={onChange}
          required
        />

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#111827]">
            Responsable
          </label>

          <input
            type="text"
            value="Usuario autenticado"
            disabled
            className="input-base"
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-semibold text-[#111827]">
          Observaciones
        </label>

        <textarea
          name="observaciones"
          value={formData.observaciones}
          onChange={onChange}
          rows="4"
          placeholder="Escribe observaciones sobre la medición..."
          className="textarea-base"
        />
      </div>
    </section>
  );
}

export default TemperaturaForm;
