import { useMemo, useState } from "react";
import { Eye, Search, Thermometer, CalendarClock } from "lucide-react";
import ClearButton from "../common/ClearButton";

import {
  formatEstadoTemperatura,
  getEstadoTemperaturaStyles,
} from "../../pages/registro/temperatura/temperatura.config";

function HistorialTemperatura({ registros, onViewDetail }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("Todos");

  const registrosFiltrados = useMemo(() => {
    return registros.filter((registro) => {
      const matchesSearch =
        registro.corral.toLowerCase().includes(searchTerm.toLowerCase()) ||
        registro.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        registro.registradoPor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesEstado =
        estadoFilter === "Todos" ||
        formatEstadoTemperatura(registro.estado) === estadoFilter;

      return matchesSearch && matchesEstado;
    });
  }, [registros, searchTerm, estadoFilter]);

  const limpiarFiltros = () => {
    setSearchTerm("");
    setEstadoFilter("Todos");
  };

  return (
    <section>
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-[#0F6B3D]" />
            <h3 className="text-base font-bold text-[#163832]">
              Historial de mediciones
            </h3>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Consulta las mediciones registradas en los corrales.
          </p>
        </div>

        <span className="w-fit rounded-full border border-[#BFD8D2] bg-[#EFF8F5] px-4 py-1.5 text-xs font-semibold text-[#0F6B3D]">
          {registrosFiltrados.length} registros encontrados
        </span>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_240px_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Buscar por corral, sector o responsable..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="input-base input-icon-left"
          />
        </div>

        <select
          value={estadoFilter}
          onChange={(event) => setEstadoFilter(event.target.value)}
          className="select-base"
        >
          <option value="Todos">Todos los estados</option>
          <option value="Normal">Normal</option>
          <option value="Fuera de rango">Fuera de rango</option>
          <option value="En revisión">En revisión</option>
        </select>

        <ClearButton
          onClick={limpiarFiltros}
          variant="filters"
          className="w-full lg:w-auto"
        >
          Limpiar
        </ClearButton>
      </div>

      {registrosFiltrados.length > 0 ? (
        <div className="space-y-3">
          {registrosFiltrados.map((registro) => (
            <article
              key={registro.id}
              className="rounded-2xl border border-[#D8E5DF] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#B6D5CC] hover:bg-[#F8FCFA] hover:shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D8E5DF] bg-white shadow-sm">
                    <Thermometer className="h-5 w-5 text-[#163832]" />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#163832]">
                      {registro.corral} · {registro.sector}
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      {registro.fechaMedicion}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Registrado por: {registro.registradoPor}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                  <div className="rounded-xl border border-[#D8E5DF] bg-[#F8FCFA] px-4 py-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                      Promedio
                    </p>
                    <p className="text-sm font-bold text-[#163832]">
                      {registro.promedio} °C
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getEstadoTemperaturaStyles(
                      registro.estado,
                    )}`}
                  >
                    {formatEstadoTemperatura(registro.estado)}
                  </span>

                  <button
                    type="button"
                    onClick={() => onViewDetail(registro)}
                    className="flex h-9 items-center gap-2 rounded-xl border border-[#D8E5DF] px-3 text-xs font-semibold text-[#163832] transition hover:border-[#0F6B3D] hover:bg-[#EFF8F5] hover:text-[#0F6B3D]"
                  >
                    <Eye className="h-4 w-4" />
                    Ver detalle
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#C9DDD8] bg-[#F8FCFA] text-center">
          <Thermometer className="h-10 w-10 text-[#7BB9A0]" />

          <h3 className="mt-3 text-sm font-bold text-[#163832]">
            No se encontraron registros
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Prueba limpiando los filtros o cambiando la búsqueda.
          </p>
        </div>
      )}
    </section>
  );
}

export default HistorialTemperatura;
