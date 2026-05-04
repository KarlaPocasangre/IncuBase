import ClearButton from "../common/ClearButton";
import CorralGrid from "../corral/CorralGrid";

export default function SeleccionPosicionCard() {
  const handleSelect = (celda) => {
    console.log("Seleccionado:", celda);
  };

  return (
    <div className="rounded-2xl border border-[#BFD8D2] bg-white px-6 py-6 shadow-md">
      {/* TITULO */}
      <h3 className="text-base font-semibold text-[#111827]">
        Seleccion de posición
      </h3>

      <p className="mt-1 text-sm text-[#6B7280]">
        Haz clic para seleccionar la posición del nido en el corral
      </p>

      {/* SELECT CORREGIDO */}
      <div className="relative mt-4 w-[196px]">
        <select
          className="h-[45px] w-full appearance-none rounded-lg border border-[#D7E4E0] bg-white px-4 pr-10 text-sm text-[#6B7280] shadow-sm outline-none transition focus:border-[#7BB9A0] focus:ring-4 focus:ring-[#7BB9A0]/20"
          defaultValue=""
        >
          <option value="" disabled>
            Selecciona el corral
          </option>
          <option value="BCU67-8C">Corral BCU67-8C</option>
          <option value="BCU67-9D">Corral BCU67-9D</option>
        </select>

        {/* ICONO */}
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm">
          ⌄
        </span>
      </div>

      {/* GRID */}
      <div className="mt-6">
        <CorralGrid onSelect={handleSelect} />
      </div>

      {/* BOTONES */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <ClearButton
          className="flex-1"
          onClick={() => console.log("Limpiar formulario")}
        />

        <button className="h-[42px] flex-1 rounded-lg bg-[#7BB9A0] text-sm font-semibold text-white transition hover:bg-[#6AA892]">
          Guardar Registro
        </button>
      </div>
    </div>
  );
}
