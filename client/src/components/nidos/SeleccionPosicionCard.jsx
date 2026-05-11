import { Check, Fence, Lock, MapPin } from "lucide-react";
import ClearButton from "../common/ClearButton";
import SaveButton from "../common/SaveButton";
import CorralGrid from "../corral/CorralGrid";

export default function SeleccionPosicionCard({
  form,
  onChange,
  onClear,
  onSave,
  resetGridKey,
  posicionesOcupadas = [],
}) {
  const handleSelect = (celda) => {
    onChange("posicion", celda);
  };

  const posicionSeleccionada = form.posicion
    ? `${form.posicion.fila}${String(form.posicion.col).padStart(2, "0")}`
    : "Sin seleccionar";

  return (
    <div className="rounded-2xl border border-[#BFD8D2] bg-white px-6 py-6 shadow-md">
      <div className="flex items-start gap-3">
        <MapPin className="mt-1 h-5 w-5 text-[#007A4D]" />

        <div>
          <h3 className="text-base font-bold text-[#111827]">
            Selección de posición
          </h3>

          <p className="mt-1 text-sm text-[#6B7280]">
            Primero selecciona casillas claras. Las alternas se habilitan cuando
            las claras estén completas.
          </p>
        </div>
      </div>

      <div className="mt-5 max-w-[260px]">
        <label className="mb-2 block text-sm font-semibold text-[#111827]">
          Corral
        </label>

        <div className="relative">
          <Fence className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <select
            value={form.corral}
            onChange={(event) => onChange("corral", event.target.value)}
            className="select-base input-icon-left"
          >
            <option value="" disabled>
              Selecciona el corral
            </option>
            <option value="BCU67-8C">Corral BCU67-8C</option>
            <option value="BCU67-9D">Corral BCU67-9D</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <CorralGrid
          key={resetGridKey}
          selected={form.posicion}
          onSelect={handleSelect}
          posicionesOcupadas={posicionesOcupadas}
        />
      </div>

      <LeyendaGrid />

      <div className="mt-5 rounded-2xl border border-[#D8E5DF] bg-[#F8FCFA] p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          Posición seleccionada
        </p>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-bold text-[#163832]">
            {posicionSeleccionada}
          </p>

          <span
            className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${
              form.posicion
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-gray-200 bg-gray-50 text-gray-500"
            }`}
          >
            {form.posicion ? "Disponible para registro" : "Pendiente"}
          </span>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Esta posición se asociará al nido al guardar el registro.
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-[#D8E5DF] bg-white p-4">
        <p className="mb-3 text-sm text-gray-500">
          Verifica los datos del nido y la posición seleccionada antes de
          guardar.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ClearButton
            variant="form"
            className="w-full sm:flex-1"
            onClick={onClear}
          >
            Limpiar formulario
          </ClearButton>

          <SaveButton
            type="button"
            className="w-full sm:flex-1"
            onClick={onSave}
          >
            Guardar registro
          </SaveButton>
        </div>
      </div>
    </div>
  );
}

function LeyendaGrid() {
  return (
    <div className="mt-5 grid grid-cols-1 gap-3 rounded-2xl border border-[#D8E5DF] bg-[#F8FCFA] p-4 sm:grid-cols-4">
      <LeyendaItem
        color="bg-white"
        border="border-[#D7E4E0]"
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
        label="Clara disponible"
      />

      <LeyendaItem
        color="bg-[#BFD8D2]"
        border="border-[#BFD8D2]"
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
        label="Casilla Alterna"
      />

      <div className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-md border border-[#0F6B3D] bg-[#0F6B3D]">
          <Check className="h-3 w-3 text-white" />
        </span>
        <span className="text-xs font-semibold text-gray-500">
          Seleccionada
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-md border border-amber-200 bg-amber-50">
          <Lock className="h-3 w-3 text-amber-600" />
        </span>
        <span className="text-xs font-semibold text-gray-500">
          Alterna bloqueada
        </span>
      </div>
    </div>
  );
}

function LeyendaItem({ color, border, iconBg, iconColor, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`relative h-5 w-5 rounded-md border ${color} ${border}`}>
        <span
          className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full ${iconBg} ring-1 ring-white`}
        />
      </span>

      <span className="text-xs font-semibold text-gray-500">{label}</span>
    </div>
  );
}
