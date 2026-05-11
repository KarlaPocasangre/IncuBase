import { ClipboardList } from "lucide-react";
import DateTimeInput from "../common/DateTimeInput";

export default function RegistroNidoForm({ form, onChange }) {
  return (
    <div className="rounded-2xl border border-[#BFD8D2] bg-white px-8 py-6 shadow-md">
      <div className="mb-6 flex items-start gap-3">
        <ClipboardList className="mt-1 h-5 w-5 text-[#007A4D]" />

        <div>
          <h2 className="text-lg font-bold text-[#111827]">Registro de nido</h2>
          <p className="text-sm text-[#6B7280]">
            Ingresa los datos de la nueva nidada
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Especie">
          <select
            className="select-base"
            value={form.especie}
            onChange={(event) => onChange("especie", event.target.value)}
          >
            <option value="" disabled>
              Selecciona la especie
            </option>
            <option value="Golfina">Golfina</option>
            <option value="Carey">Carey</option>
            <option value="Prieta">Prieta</option>
          </select>
        </Field>

        <Field label="Procedencia exacta">
          <input
            className="input-base"
            value={form.procedencia}
            onChange={(event) => onChange("procedencia", event.target.value)}
            placeholder="Lugar donde fueron encontrados los huevos"
          />
        </Field>
      </div>

      <div className="mt-8 rounded-2xl border border-[#D8E5DF] bg-[#F8FCFA] p-5">
        <h3 className="text-base font-bold text-[#163832]">
          Medidas del caparazón de la tortuga anidadora
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Registra las medidas en centímetros, si están disponibles.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Largo curvo (LCC)">
            <input
              type="number"
              min="0"
              step="0.1"
              className="input-base"
              value={form.largoCurvo}
              onChange={(event) => onChange("largoCurvo", event.target.value)}
              placeholder="ej: 65.4"
            />
          </Field>

          <Field label="Ancho curvo (LCC)">
            <input
              type="number"
              min="0"
              step="0.1"
              className="input-base"
              value={form.anchoCurvo}
              onChange={(event) => onChange("anchoCurvo", event.target.value)}
              placeholder="ej: 58.2"
            />
          </Field>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[#D8E5DF] bg-[#F8FCFA] p-5">
        <h3 className="text-base font-bold text-[#163832]">Datos del nido</h3>

        <p className="mt-1 text-sm text-gray-500">
          Información principal para el seguimiento del nido.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Cantidad de huevos">
            <input
              type="number"
              min="1"
              className="input-base"
              value={form.cantidadHuevos}
              onChange={(event) =>
                onChange("cantidadHuevos", event.target.value)
              }
              placeholder="ej: 60"
            />
          </Field>

          <Field label="Profundidad del nido (cm)">
            <input
              type="number"
              min="1"
              step="0.1"
              className="input-base"
              value={form.profundidadNido}
              onChange={(event) =>
                onChange("profundidadNido", event.target.value)
              }
              placeholder="ej: 60"
            />
          </Field>

          <DateTimeInput
            label="Fecha y hora del desove"
            name="fechaDesove"
            value={form.fechaDesove}
            onChange={(event) => onChange("fechaDesove", event.target.value)}
          />

          <DateTimeInput
            label="Fecha y hora de siembra"
            name="fechaSiembra"
            value={form.fechaSiembra}
            onChange={(event) => onChange("fechaSiembra", event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#111827]">
        {label}
      </span>
      {children}
    </label>
  );
}
