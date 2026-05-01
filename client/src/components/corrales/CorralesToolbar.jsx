import { Plus, Wrench } from "lucide-react";

function CorralesToolbar({ onAdd }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-lg font-bold text-[#10231F]">
          Listado de Corrales
        </h2>
        <p className="text-sm text-slate-500">
          Administra los corrales registrados
        </p>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="rounded-lg bg-[#00683D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#68AD96]"
      >
        + Agregar Corral
      </button>
    </div>
  );
}

export default CorralesToolbar;