import { Calendar, Search, SlidersHorizontal } from "lucide-react";

function CorralesFilters() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_160px_120px_120px] gap-4 mb-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Buscar por codigo de corral..."
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-[#D7E4E1] outline-none text-sm focus:ring-2 focus:ring-emerald-600/20"
          />
        </div>

        <button className="h-12 rounded-xl border border-[#D7E4E1] text-sm text-slate-600 flex items-center justify-center gap-2">
          Rango de fecha
          <Calendar size={16} />
        </button>

        <select className="h-12 rounded-xl border border-[#D7E4E1] px-4 text-sm text-slate-600 outline-none">
          <option>Tipo</option>
          <option>Corral Abierto</option>
          <option>Corral Cerrado</option>
        </select>

        <select className="h-12 rounded-xl border border-[#D7E4E1] px-4 text-sm text-slate-600 outline-none">
          <option>Estado</option>
          <option>Activo</option>
          <option>Cerrado</option>
          <option>Mantenimiento</option>
        </select>
      </div>

      <button className="mb-4 h-11 px-5 rounded-lg border border-[#D7E4E1] text-sm text-slate-500 flex items-center gap-2 hover:bg-slate-50">
        <SlidersHorizontal size={16} />
        Limpiar Filtros
      </button>
    </>
  );
}

export default CorralesFilters;