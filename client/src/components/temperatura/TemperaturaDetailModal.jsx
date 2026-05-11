import { X, Thermometer, CalendarClock, User, MapPin } from "lucide-react";

import {
  formatEstadoTemperatura,
  getEstadoTemperaturaStyles,
  getTemperatureStatus,
} from "../../pages/registro/temperatura/temperatura.config";

function TemperaturaDetailModal({ registro, onClose }) {
  if (!registro) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[620px] rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#D8E5DF] px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-[#163832]">
              Detalle de temperatura
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Información completa del registro seleccionado
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
          <div className="mb-5 rounded-2xl border border-[#D8E5DF] bg-[#F8FCFA] p-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                <Thermometer className="h-5 w-5 text-[#163832]" />
              </div>

              <div>
                <h3 className="text-base font-bold text-[#163832]">
                  {registro.corral} · {registro.sector}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {registro.observaciones || "Sin observaciones registradas."}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DetailItem
              icon={MapPin}
              label="Ubicación"
              value={`${registro.corral} · ${registro.sector}`}
            />

            <DetailItem
              icon={CalendarClock}
              label="Fecha de medición"
              value={registro.fechaMedicion}
            />

            <DetailItem
              icon={User}
              label="Registrado por"
              value={registro.registradoPor}
            />

            <div className="rounded-xl border border-[#D8E5DF] bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Estado
              </p>

              <span
                className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getEstadoTemperaturaStyles(
                  registro.estado,
                )}`}
              >
                {formatEstadoTemperatura(registro.estado)}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-[#D8E5DF] bg-white">
            <div className="border-b border-[#D8E5DF] px-5 py-4">
              <h3 className="text-base font-bold text-[#163832]">
                Mediciones registradas
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Detalle por profundidad y temperatura.
              </p>
            </div>

            <div className="divide-y divide-[#E5ECE9]">
              {registro.mediciones.map((medicion) => {
                const status = getTemperatureStatus(medicion.temperatura);

                return (
                  <div
                    key={medicion.id}
                    className="grid grid-cols-1 gap-3 px-5 py-4 sm:grid-cols-4 sm:items-center"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Profundidad
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#163832]">
                        {medicion.profundidad} cm
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Temperatura
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#163832]">
                        {medicion.temperatura} °C
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Orden
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#163832]">
                        {medicion.orden}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Estado
                      </p>
                      <p
                        className={`mt-1 text-sm font-bold ${status.className}`}
                      >
                        {status.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-[#D8E5DF] bg-[#F8FCFA] px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-500">
                  Promedio del registro
                </p>

                <p className="text-lg font-bold text-[#163832]">
                  {registro.promedio} °C
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-[#D8E5DF] px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl bg-[#0F6B3D] px-6 text-sm font-semibold text-white transition hover:bg-[#0B5732]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-[#D8E5DF] bg-white p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#0F6B3D]" />
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {label}
        </p>
      </div>

      <p className="mt-2 text-sm font-bold text-[#163832]">{value}</p>
    </div>
  );
}

export default TemperaturaDetailModal;
