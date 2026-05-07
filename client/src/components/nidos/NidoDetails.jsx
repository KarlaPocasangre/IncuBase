import { Search, Egg, CalendarDays, Thermometer, Package } from "lucide-react";

function getStatusLabel(estado) {
  if (estado === "proximo") return "Próximo a Eclosión";
  if (estado === "eclosionado") return "Eclosionado";
  if (estado === "exhumado") return "Exhumado";
  if (estado === "vacio") return "Vacío";

  return "Ocupado";
}

function getStatusClass(estado) {
  if (estado === "proximo") {
    return "bg-orange-100 text-orange-500";
  }

  if (estado === "eclosionado") {
    return "bg-blue-100 text-blue-500";
  }

  if (estado === "exhumado") {
    return "bg-red-100 text-red-500";
  }

  if (estado === "vacio") {
    return "bg-slate-100 text-slate-500";
  }

  return "bg-emerald-100 text-emerald-600";
}

function NidoDetails({ selectedNido }) {
  return (
    <section className="rounded-2xl border border-[#CFE0DC] bg-white p-6 shadow-sm">
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-bold text-[#10231F]">Detalles del nido</h2>

        <p className="text-sm text-slate-500">Selecciona un nido</p>
      </div>

      {/* SEARCH */}
      <div className="relative mt-5">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

        <input
          type="text"
          placeholder="Buscar por codigo del nido o corral..."
          className="h-12 w-full rounded-lg border border-[#D7E4E1] bg-white pl-11 pr-4 text-sm outline-none"
        />
      </div>

      {/* EMPTY */}
      {!selectedNido ? (
        <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
          <Egg className="h-14 w-14 text-slate-400" />

          <p className="mt-5 max-w-[260px] text-sm text-slate-500">
            Selecciona un nido de la cuadrícula para ver sus detalles
          </p>
        </div>
      ) : (
        <div className="mt-4">
          {/* TAGS */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-lg px-3 py-1 text-sm font-bold ${getStatusClass(
                selectedNido.estado,
              )}`}
            >
              {getStatusLabel(selectedNido.estado)}
            </span>

            <span className="rounded-lg border border-[#CFE0DC] bg-white px-4 py-1 text-sm text-[#10231F]">
              {selectedNido.estado === "exhumado" ? "Carey" : "Baule"}
            </span>

            <span className="rounded-lg border border-[#CFE0DC] bg-white px-4 py-1 text-sm text-[#10231F]">
              {selectedNido.row}-{selectedNido.col}
            </span>
          </div>

          {/* EXHUMADO */}
          {selectedNido.estado === "exhumado" ? (
            <div className="rounded-xl bg-[#EEF5F2] p-5">
              <div className="flex items-center gap-3 text-slate-500">
                <CalendarDays className="h-5 w-5" />

                <span>Fecha y hora de Exhumacion</span>
              </div>

              <p className="mt-6 text-center text-lg font-bold text-[#10231F]">
                03/10/2026 18:00
              </p>
            </div>
          ) : selectedNido.estado === "eclosionado" ? (
            <>
              <div className="mt-5 rounded-xl bg-[#EEF5F2] px-5 py-5">
                {/* FECHA ECLOSION */}
                <div className="flex items-start gap-4">
                  <CalendarDays className="mt-1 h-5 w-5 text-slate-500" />

                  <div>
                    <p className="text-sm text-slate-500">
                      Fecha y hora de Eclosion
                    </p>

                    <p className="mt-1 text-[15px] font-bold text-[#10231F]">
                      03/10/2026 18:00
                    </p>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="my-5 h-px bg-[#DCE7E2]" />

                {/* FECHA LIBERACION */}
                <div className="flex items-start gap-4">
                  <CalendarDays className="mt-1 h-5 w-5 text-slate-500" />

                  <div>
                    <p className="text-sm text-slate-500">
                      Fecha y hora de Liberacion
                    </p>

                    <p className="mt-1 text-[15px] font-bold text-[#10231F]">
                      03/10/2026 18:00
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 flex h-11 w-full items-center justify-center gap-3 rounded-xl bg-[#087A45] text-sm font-bold text-white hover:bg-[#06643A]"
              >
                <Package className="h-5 w-5" />
                Registrar Exhumacion
              </button>
            </>
          ) : selectedNido.estado === "ocupado" ? (
            <>
              {/* INFO CARD */}
              <div className="rounded-xl bg-[#EEF5F2] px-4 py-3">
                {/* HUEVOS */}
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Egg className="h-5 w-5" />

                    <span className="text-sm">Huevos</span>
                  </div>

                  <span className="text-sm font-bold text-[#10231F]">121</span>
                </div>

                {/* DIAS */}
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3 text-slate-500">
                    <CalendarDays className="h-5 w-5" />

                    <span className="text-sm">Días Incubando</span>
                  </div>

                  <span className="text-sm font-bold text-[#10231F]">29</span>
                </div>

                {/* TEMPERATURA */}
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Thermometer className="h-5 w-5" />

                    <span className="text-sm">Temperatura</span>
                  </div>

                  <span className="text-sm font-bold text-[#10231F]">
                    29.9°C
                  </span>
                </div>
              </div>

              {/* BOTON */}
              <button
                type="button"
                className="mt-4 flex h-9 w-full items-center justify-center gap-3 rounded-lg border border-[#CFE0DC] bg-[#F8FCFA] text-sm font-medium text-[#10231F] hover:bg-[#EEF5F2]"
              >
                <Thermometer className="h-5 w-5" />
                Registrar Temperatura
              </button>
            </>
          ) : selectedNido.estado === "proximo" ? (
            <>
              {/* INFO CARD */}
              <div className="rounded-xl bg-[#EEF5F2] px-4 py-3">
                {/* HUEVOS */}
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Egg className="h-5 w-5" />

                    <span className="text-sm">Huevos</span>
                  </div>

                  <span className="text-sm font-bold text-[#10231F]">121</span>
                </div>

                {/* DIAS */}
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3 text-slate-500">
                    <CalendarDays className="h-5 w-5" />

                    <span className="text-sm">Días Incubando</span>
                  </div>

                  <span className="text-sm font-bold text-[#10231F]">29</span>
                </div>

                {/* TEMPERATURA */}
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3 text-slate-500">
                    <Thermometer className="h-5 w-5" />

                    <span className="text-sm">Temperatura</span>
                  </div>

                  <span className="text-sm font-bold text-[#10231F]">
                    29.9°C
                  </span>
                </div>
              </div>

              {/* TEMPERATURA */}
              <button
                type="button"
                className="mt-4 flex h-9 w-full items-center justify-center gap-3 rounded-lg border border-[#CFE0DC] bg-[#F8FCFA] text-sm font-medium text-[#10231F] hover:bg-[#EEF5F2]"
              >
                <Thermometer className="h-5 w-5" />
                Registrar Temperatura
              </button>

              {/* NACIMIENTO */}
              <button
                type="button"
                className="mt-3 flex h-10 w-full items-center justify-center gap-3 rounded-lg bg-[#087A45] text-sm font-bold text-white hover:bg-[#06643A]"
              >
                <Egg className="h-5 w-5" />
                Registrar Nacimiento
              </button>
            </>
          ) : null}
        </div>
      )}
    </section>
  );
}

export default NidoDetails;
