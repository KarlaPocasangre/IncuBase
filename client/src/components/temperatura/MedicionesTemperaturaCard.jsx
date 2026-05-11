import { Plus, Trash2, Thermometer, Ruler } from "lucide-react";

import {
  ordenMedicionOptions,
  getTemperatureStatus,
} from "../../pages/registro/temperatura/temperatura.config";

function MedicionesTemperaturaCard({
  mediciones,
  promedio,
  estadoPromedio,
  onAddMedicion,
  onChangeMedicion,
  onRemoveMedicion,
}) {
  return (
    <section className="rounded-2xl border border-[#D8E5DF] bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-[#0F6B3D]" />
            <h3 className="text-base font-bold text-[#163832]">
              Mediciones de temperatura
            </h3>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Registra una o varias mediciones por profundidad.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddMedicion}
          className="flex h-[44px] items-center justify-center gap-2 rounded-lg bg-[#006B35] px-4 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#005A2C] hover:shadow-md"
        >
          <Plus className="h-4 w-4" />
          Agregar medición
        </button>
      </div>

      <div className="space-y-3">
        {mediciones.map((medicion, index) => {
          const status = getTemperatureStatus(medicion.temperatura);

          return (
            <div
              key={medicion.id}
              className="rounded-2xl border border-[#D8E5DF] bg-[#F8FCFA] p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#163832]">
                  Medición {index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => onRemoveMedicion(medicion.id)}
                  disabled={mediciones.length === 1}
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                  title="Eliminar medición"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1.2fr]">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Profundidad cm
                  </label>

                  <div className="relative">
                    <Ruler className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type="number"
                      min="1"
                      step="0.1"
                      value={medicion.profundidad}
                      onChange={(event) =>
                        onChangeMedicion(
                          medicion.id,
                          "profundidad",
                          event.target.value,
                        )
                      }
                      placeholder="Ej. 30"
                      className="input-base input-icon-left"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Temperatura °C
                  </label>

                  <div className="relative">
                    <Thermometer className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type="number"
                      min="0"
                      max="60"
                      step="0.1"
                      value={medicion.temperatura}
                      onChange={(event) =>
                        onChangeMedicion(
                          medicion.id,
                          "temperatura",
                          event.target.value,
                        )
                      }
                      placeholder="Ej. 29.5"
                      className="input-base input-icon-left"
                    />
                  </div>

                  {medicion.temperatura !== "" && (
                    <p
                      className={`mt-1 text-xs font-semibold ${status.className}`}
                    >
                      {status.label}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Orden de medición
                  </label>

                  <select
                    value={medicion.orden}
                    onChange={(event) =>
                      onChangeMedicion(medicion.id, "orden", event.target.value)
                    }
                    className="select-base"
                  >
                    {ordenMedicionOptions.map((orden) => (
                      <option key={orden} value={orden}>
                        {orden}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-[#D8E5DF] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Promedio calculado
          </p>

          <p className="mt-1 text-xl font-bold text-[#163832]">
            {promedio ? `${promedio} °C` : "Sin datos"}
          </p>
        </div>

        <div className="rounded-2xl border border-[#D8E5DF] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Estado del promedio
          </p>

          <p
            className={`mt-1 text-xl font-bold ${
              estadoPromedio === "fuera_rango"
                ? "text-red-600"
                : "text-emerald-600"
            }`}
          >
            {estadoPromedio === "fuera_rango" ? "Fuera de rango" : "Normal"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default MedicionesTemperaturaCard;
