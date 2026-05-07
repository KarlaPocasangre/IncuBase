import { ClipboardList } from "lucide-react";
import DateTimeInput from "../common/DateTimeInput";

const inputClass =
  "h-[45px] w-full rounded-lg border border-[#D7E4E0] bg-white px-4 text-sm text-[#111827] shadow-sm outline-none placeholder:text-[#7B8494] transition focus:border-[#7BB9A0] focus:ring-4 focus:ring-[#7BB9A0]/20";

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
            className={inputClass}
            value={form.especie}
            onChange={(e) => onChange("especie", e.target.value)}
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
            className={inputClass}
            value={form.procedencia}
            onChange={(e) => onChange("procedencia", e.target.value)}
            placeholder="Lugar donde fueron encontrados los huevos"
          />
        </Field>
      </div>

      <h3 className="mt-7 text-base font-medium text-[#111827]">
        Medidas del caparazón de la tortuga anidadora (cm)
      </h3>

      <div className="mt-5 grid grid-cols-1 gap-7 md:grid-cols-2">
        <Field label="Largo curvo (LCC)">
          <input
            className={inputClass}
            value={form.largoCurvo}
            onChange={(e) => onChange("largoCurvo", e.target.value)}
            placeholder="ej: 65.4"
          />
        </Field>

        <Field label="Ancho curvo (LCC)">
          <input
            className={inputClass}
            value={form.anchoCurvo}
            onChange={(e) => onChange("anchoCurvo", e.target.value)}
            placeholder="ej: 58.2"
          />
        </Field>
      </div>

      <h3 className="mt-8 text-base font-medium text-[#111827]">
        Datos del nido
      </h3>

      <div className="mt-5 grid grid-cols-1 gap-7 md:grid-cols-2">
        <Field label="Cantidad de Huevos">
          <input
            className={inputClass}
            value={form.cantidadHuevos}
            onChange={(e) => onChange("cantidadHuevos", e.target.value)}
            placeholder="ej: 60"
          />
        </Field>

        <Field label="Profundidad del nido (cm)">
          <input
            className={inputClass}
            value={form.profundidadNido}
            onChange={(e) => onChange("profundidadNido", e.target.value)}
            placeholder="ej: 60"
          />
        </Field>

        <DateTimeInput
          label="Fecha y hora del desove"
          name="fechaDesove"
          value={form.fechaDesove}
          onChange={(e) => onChange("fechaDesove", e.target.value)}
        />

        <DateTimeInput
          label="Fecha y hora de siembra"
          name="fechaSiembra"
          value={form.fechaSiembra}
          onChange={(e) => onChange("fechaSiembra", e.target.value)}
        />
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
