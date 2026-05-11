import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Clock,
  CheckCircle2,
  X,
  Bell,
  CalendarClock,
  ListFilter,
} from "lucide-react";

import {
  alertasMock,
  alertasStats,
  estadoOptions,
  nivelOptions,
  tipoOptions,
  getEstadoStyles,
  getNivelStyles,
  formatEstado,
  formatNivel,
} from "./alertas.config";

function AlertasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("Todos");
  const [nivelFilter, setNivelFilter] = useState("Todos");
  const [tipoFilter, setTipoFilter] = useState("Todos");
  const [selectedAlerta, setSelectedAlerta] = useState(null);

  const alertasFiltradas = useMemo(() => {
    return alertasMock.filter((alerta) => {
      const matchesSearch =
        alerta.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alerta.mensaje.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alerta.relacionado.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesEstado =
        estadoFilter === "Todos" ||
        formatEstado(alerta.estado).toLowerCase() ===
          estadoFilter.toLowerCase();

      const matchesNivel =
        nivelFilter === "Todos" ||
        formatNivel(alerta.nivel).toLowerCase() === nivelFilter.toLowerCase();

      const matchesTipo = tipoFilter === "Todos" || alerta.tipo === tipoFilter;

      return matchesSearch && matchesEstado && matchesNivel && matchesTipo;
    });
  }, [searchTerm, estadoFilter, nivelFilter, tipoFilter]);

  const limpiarFiltros = () => {
    setSearchTerm("");
    setEstadoFilter("Todos");
    setNivelFilter("Todos");
    setTipoFilter("Todos");
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {alertasStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.title}
              className="rounded-2xl border border-[#D8E5DF] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-[#163832]">
                    {stat.value}
                  </h3>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}
                >
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>

              <p className="mt-3 text-xs text-gray-500">{stat.description}</p>
            </article>
          );
        })}
      </section>

      {/* Contenedor principal */}
      <section className="rounded-2xl border border-[#D8E5DF] bg-white shadow-sm">
        <div className="border-b border-[#D8E5DF] px-6 py-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-bold text-[#163832]">
                  Centro de alertas
                </h2>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Consulta, filtra y gestiona las alertas generadas por el
                sistema.
              </p>
            </div>

            <span className="w-fit rounded-full border border-[#BFD8D2] bg-[#EFF8F5] px-4 py-1.5 text-xs font-semibold text-[#0F6B3D]">
              {alertasFiltradas.length} alertas encontradas
            </span>
          </div>
        </div>

        {/* Filtros */}
        <div className="space-y-4 border-b border-[#D8E5DF] px-6 py-5">
          <div className="flex items-center gap-2">
            <ListFilter className="h-4 w-4 text-[#0F6B3D]" />
            <h3 className="text-sm font-semibold text-[#163832]">Filtros</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar alerta..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="h-11 w-full rounded-xl border border-[#D8E5DF] bg-white pl-11 pr-4 text-sm text-[#163832] outline-none transition placeholder:text-gray-400 hover:border-[#7BB9A0] focus:border-[#0F6B3D] focus:ring-2 focus:ring-[#0F6B3D]/10"
              />
            </div>

            <select
              value={estadoFilter}
              onChange={(event) => setEstadoFilter(event.target.value)}
              className="h-11 rounded-xl border border-[#D8E5DF] bg-white px-4 text-sm text-[#163832] outline-none transition hover:border-[#7BB9A0] focus:border-[#0F6B3D] focus:ring-2 focus:ring-[#0F6B3D]/10"
            >
              {estadoOptions.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>

            <select
              value={nivelFilter}
              onChange={(event) => setNivelFilter(event.target.value)}
              className="h-11 rounded-xl border border-[#D8E5DF] bg-white px-4 text-sm text-[#163832] outline-none transition hover:border-[#7BB9A0] focus:border-[#0F6B3D] focus:ring-2 focus:ring-[#0F6B3D]/10"
            >
              {nivelOptions.map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>

            <select
              value={tipoFilter}
              onChange={(event) => setTipoFilter(event.target.value)}
              className="h-11 rounded-xl border border-[#D8E5DF] bg-white px-4 text-sm text-[#163832] outline-none transition hover:border-[#7BB9A0] focus:border-[#0F6B3D] focus:ring-2 focus:ring-[#0F6B3D]/10"
            >
              {tipoOptions.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={limpiarFiltros}
              className="h-11 rounded-xl border border-[#D8E5DF] px-5 text-sm font-semibold text-[#163832] transition hover:border-[#0F6B3D] hover:bg-[#EFF8F5] hover:text-[#0F6B3D]"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Lista / tabla */}
        <div className="p-6">
          {alertasFiltradas.length > 0 ? (
            <div className="space-y-3">
              {alertasFiltradas.map((alerta) => {
                const Icon = alerta.icon;

                return (
                  <article
                    key={alerta.id}
                    className="group rounded-2xl border border-[#D8E5DF] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#B6D5CC] hover:bg-[#F8FCFA] hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-4">
                        <span
                          className={`mt-5 h-2.5 w-2.5 rounded-full ${
                            alerta.nivel === "critica" ||
                            alerta.nivel === "alta"
                              ? "bg-red-500"
                              : alerta.nivel === "media"
                                ? "bg-orange-400"
                                : "bg-emerald-500"
                          }`}
                        />

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D8E5DF] bg-white shadow-sm">
                          <Icon className="h-5 w-5 text-[#163832]" />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-[#163832]">
                            {alerta.titulo}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {alerta.relacionado}
                          </p>
                          <p className="mt-1 max-w-2xl text-xs text-gray-400">
                            {alerta.mensaje}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${getNivelStyles(
                            alerta.nivel,
                          )}`}
                        >
                          {formatNivel(alerta.nivel)}
                        </span>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${getEstadoStyles(
                            alerta.estado,
                          )}`}
                        >
                          {formatEstado(alerta.estado)}
                        </span>

                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <CalendarClock className="h-4 w-4" />
                          {alerta.fecha}
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedAlerta(alerta)}
                          className="flex h-9 items-center gap-2 rounded-xl border border-[#D8E5DF] px-3 text-xs font-semibold text-[#163832] transition hover:border-[#0F6B3D] hover:bg-[#EFF8F5] hover:text-[#0F6B3D]"
                        >
                          <Eye className="h-4 w-4" />
                          Ver
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#C9DDD8] bg-[#F8FCFA] text-center">
              <Bell className="h-10 w-10 text-[#7BB9A0]" />
              <h3 className="mt-3 text-sm font-bold text-[#163832]">
                No se encontraron alertas
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Prueba limpiando los filtros o cambiando la búsqueda.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal detalle */}
      {selectedAlerta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[560px] rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#D8E5DF] px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-[#163832]">
                  Detalle de alerta
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Información completa de la alerta seleccionada
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAlerta(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 px-6 py-5">
              <div className="flex items-start gap-4 rounded-2xl border border-[#D8E5DF] bg-[#F8FCFA] p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <selectedAlerta.icon className="h-5 w-5 text-[#163832]" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#163832]">
                    {selectedAlerta.titulo}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {selectedAlerta.mensaje}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <DetailItem label="Tipo" value={selectedAlerta.tipo} />
                <DetailItem
                  label="Relacionado"
                  value={selectedAlerta.relacionado}
                />
                <DetailItem
                  label="Nivel"
                  value={formatNivel(selectedAlerta.nivel)}
                  badgeClass={getNivelStyles(selectedAlerta.nivel)}
                />
                <DetailItem
                  label="Estado"
                  value={formatEstado(selectedAlerta.estado)}
                  badgeClass={getEstadoStyles(selectedAlerta.estado)}
                />
                <DetailItem
                  label="Fecha"
                  value={selectedAlerta.fechaCompleta}
                />
                <DetailItem label="Tiempo" value={selectedAlerta.fecha} />
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[#D8E5DF] px-6 py-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setSelectedAlerta(null)}
                className="h-11 rounded-xl border border-[#D8E5DF] px-5 text-sm font-semibold text-[#163832] transition hover:bg-gray-50"
              >
                Cerrar
              </button>

              <button
                type="button"
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                <Clock className="h-4 w-4" />
                Marcar en proceso
              </button>

              <button
                type="button"
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0F6B3D] px-5 text-sm font-semibold text-white transition hover:bg-[#0B5732]"
              >
                <CheckCircle2 className="h-4 w-4" />
                Resolver alerta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value, badgeClass }) {
  return (
    <div className="rounded-xl border border-[#D8E5DF] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      {badgeClass ? (
        <span
          className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass}`}
        >
          {value}
        </span>
      ) : (
        <p className="mt-2 text-sm font-semibold text-[#163832]">{value}</p>
      )}
    </div>
  );
}

export default AlertasPage;
