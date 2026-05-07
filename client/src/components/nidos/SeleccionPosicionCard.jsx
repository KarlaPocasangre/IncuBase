import ClearButton from "../common/ClearButton";
import SaveButton from "../common/SaveButton";
import CorralGrid from "../corral/CorralGrid";

export default function SeleccionPosicionCard({
  form,
  onChange,
  onClear,
  onSave,
  resetGridKey,
}) {
  const handleSelect = (celda) => {
    onChange("posicion", celda);
    console.log("Seleccionado:", celda);
  };

  return (
    <div className="rounded-2xl border border-[#BFD8D2] bg-white px-6 py-6 shadow-md">
      <h3 className="text-base font-semibold text-[#111827]">
        Seleccion de posición
      </h3>

      <p className="mt-1 text-sm text-[#6B7280]">
        Haz clic para seleccionar la posición del nido en el corral
      </p>

      <div className="relative mt-4 w-[196px]">
        <select
          value={form.corral}
          onChange={(e) => onChange("corral", e.target.value)}
          className="h-[45px] w-full appearance-none rounded-lg border border-[#D7E4E0] bg-white px-4 pr-10 text-sm text-[#6B7280] shadow-sm outline-none transition focus:border-[#7BB9A0] focus:ring-4 focus:ring-[#7BB9A0]/20"
        >
          <option value="" disabled>
            Selecciona el corral
          </option>
          <option value="BCU67-8C">Corral BCU67-8C</option>
          <option value="BCU67-9D">Corral BCU67-9D</option>
        </select>

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#9CA3AF]">
          ⌄
        </span>
      </div>

      <div className="mt-6">
        <CorralGrid
          key={resetGridKey}
          selected={form.posicion}
          onSelect={handleSelect}
        />
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <ClearButton variant="form" className="flex-1" onClick={onClear}>
          Limpiar Formulario
        </ClearButton>

        <SaveButton
          className="flex-1 bg-[#7BB9A0] hover:bg-[#6AA892]"
          onClick={onSave}
        >
          Guardar Registro
        </SaveButton>
      </div>
    </div>
  );
}
