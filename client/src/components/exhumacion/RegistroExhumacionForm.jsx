import { Bug, Egg, EggOff, FileText, Search, Skull } from "lucide-react";

import DateTimeInput from "../common/DateTimeInput";
import ExhumacionSectionTitle from "./ExhumacionSectionTitle";

const inputClass =
  "h-[45px] w-full rounded-lg border border-[#D7E4E0] bg-white px-4 text-sm text-[#111827] shadow-sm outline-none placeholder:text-[#7B8494] transition focus:border-[#7BB9A0] focus:ring-4 focus:ring-[#7BB9A0]/20";

const disabledInputClass =
  "h-[45px] w-full rounded-lg border border-[#D7E4E0] bg-[#F5F7F6] px-4 text-sm text-[#9CA3AF] shadow-sm outline-none";

export default function RegistroExhumacionForm({ form, nidos, onChange }) {
  const tieneDepredacion = form.evidenciaDepredacion === "si";

  return (
    <div className="rounded-2xl border border-[#BFD8D2] bg-white px-8 py-6 shadow-md">
      <div className="mb-6 flex items-start gap-3">
        <Search className="mt-1 h-6 w-6 text-[#007A4D]" />

        <div>
          <h2 className="text-lg font-bold text-[#111827]">
            Registro de Exhumación
          </h2>
          <p className="text-sm text-[#6B7280]">
            Datos científicos post-eclosión
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
        <Field label="Nido">
          <select
            className={inputClass}
            value={form.nido}
            onChange={(e) => onChange("nido", e.target.value)}
          >
            <option value="" disabled>
              Selecciona el nido
            </option>

            {nidos.map((nido) => (
              <option key={nido.id} value={nido.id}>
                {nido.label}
              </option>
            ))}
          </select>
        </Field>

        <DateTimeInput
          label="Fecha y Hora de Exhumación"
          name="fechaExhumacion"
          value={form.fechaExhumacion}
          onChange={(e) => onChange("fechaExhumacion", e.target.value)}
        />
      </div>

      <ExhumacionSectionTitle
        icon={EggOff}
        title="Huevos No Eclosionados"
        color="text-[#EA7A1A]"
        className="mt-7"
      />

      <div className="mt-4 grid grid-cols-1 gap-7 md:grid-cols-2">
        <Field label="Total sin Eclosionar">
          <input
            type="number"
            min="0"
            className={inputClass}
            value={form.totalSinEclosionar}
            onChange={(e) => onChange("totalSinEclosionar", e.target.value)}
            placeholder="0"
          />
        </Field>

        <Field label="Cascaras Vacias">
          <input
            type="number"
            min="0"
            className={inputClass}
            value={form.cascarasVacias}
            onChange={(e) => onChange("cascarasVacias", e.target.value)}
            placeholder="0"
          />
          <p className="mt-1 text-xs text-[#7B8494]">
            Eclosiones exitosas confirmadas
          </p>
        </Field>
      </div>

      <ExhumacionSectionTitle
        icon={Skull}
        title="Embriones Muertos por Etapa de Desarrollo"
        color="text-[#EF4444]"
        className="mt-7"
      />

      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <NumberField
          label="Huevos sin Embrion"
          helper="0-25%"
          value={form.huevosSinEmbrion}
          onChange={(value) => onChange("huevosSinEmbrion", value)}
        />

        <NumberField
          label="Embriones Muertos"
          helper="25-50%"
          value={form.embrionesMuertos}
          onChange={(value) => onChange("embrionesMuertos", value)}
        />

        <NumberField
          label="Huevos no Eclosionados"
          helper="50-75%"
          value={form.huevosNoEclosionados}
          onChange={(value) => onChange("huevosNoEclosionados", value)}
        />

        <NumberField
          label="Neonatos muertos en Nido"
          helper="75-100%"
          value={form.neonatosMuertosNido}
          onChange={(value) => onChange("neonatosMuertosNido", value)}
        />
      </div>

      <div className="mt-7">
        <div className="flex flex-wrap items-center gap-4">
          <ExhumacionSectionTitle
            icon={Bug}
            title="Evidencia de Depredación"
            color="text-[#F97316]"
          />

          <div className="flex items-center gap-3">
            <OptionButton
              label="Si"
              active={form.evidenciaDepredacion === "si"}
              onClick={() => onChange("evidenciaDepredacion", "si")}
            />

            <OptionButton
              label="No"
              active={form.evidenciaDepredacion === "no"}
              onClick={() => {
                onChange("evidenciaDepredacion", "no");
                onChange("tipoDepredador", "");
              }}
            />
          </div>
        </div>

        <div className="mt-4 max-w-[260px]">
          <select
            disabled={!tieneDepredacion}
            className={tieneDepredacion ? inputClass : disabledInputClass}
            value={form.tipoDepredador}
            onChange={(e) => onChange("tipoDepredador", e.target.value)}
          >
            <option value="">Tipo de depredador</option>
            <option value="Cangrejo">Cangrejo</option>
            <option value="Ave">Ave</option>
            <option value="Perro">Perro</option>
            <option value="Mapache">Mapache</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      <ExhumacionSectionTitle
        icon={Egg}
        title="Cascarones Eclosionados"
        color="text-[#F59E0B]"
        className="mt-7"
      />

      <div className="mt-4 max-w-[360px]">
        <Field label="Total de Eclosiones">
          <input
            type="number"
            min="0"
            className={inputClass}
            value={form.totalEclosiones}
            onChange={(e) => onChange("totalEclosiones", e.target.value)}
            placeholder="0"
          />
        </Field>
      </div>

      <ExhumacionSectionTitle
        icon={FileText}
        title="Observaciones Adicionales"
        color="text-[#3B82F6]"
        className="mt-7"
      />

      <div className="mt-4">
        <textarea
          className="min-h-[70px] w-full resize-none rounded-lg border border-[#D7E4E0] bg-white px-4 py-3 text-sm text-[#111827] shadow-sm outline-none placeholder:text-[#7B8494] transition focus:border-[#7BB9A0] focus:ring-4 focus:ring-[#7BB9A0]/20"
          value={form.observaciones}
          onChange={(e) => onChange("observaciones", e.target.value)}
          placeholder="Notas sobre condiciones del nido, posibles causas de mortalidad, recomendaciones, etc."
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

function NumberField({ label, helper, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-[#111827]">
        {label}
      </label>

      <input
        type="number"
        min="0"
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
      />

      <p className="mt-1 text-xs text-[#7B8494]">{helper}</p>
    </div>
  );
}

function OptionButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex h-[34px] min-w-[70px] items-center justify-center gap-2
        rounded-lg border px-3 text-sm transition
        ${
          active
            ? "border-[#7BB9A0] bg-[#EEF7F4] text-[#007A4D]"
            : "border-[#D7E4E0] bg-white text-[#111827] hover:bg-[#F8FCFA]"
        }
      `}
    >
      <span
        className={`
          h-4 w-4 rounded border
          ${
            active
              ? "border-[#007A4D] bg-[#007A4D]"
              : "border-[#D7E4E0] bg-white"
          }
        `}
      />
      {label}
    </button>
  );
}
