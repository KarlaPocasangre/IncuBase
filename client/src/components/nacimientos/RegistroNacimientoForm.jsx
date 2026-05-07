import { Search, Heart, Skull, Waves } from "lucide-react"
import DateTimeInput from "../common/DateTimeInput"

const inputClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#00796B] focus:ring-2 focus:ring-[#00796B]/15"

function RegistroNacimientoForm({ form, nidos, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#C9DDD8] bg-white p-5 shadow-sm"
    >
      {/* HEADER */}
      <div className="mb-5 flex items-start gap-3">
        <Search className="mt-1 text-[#00796B]" size={24} />

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Registro de Nacimientos
          </h2>

          <p className="text-sm text-slate-500">
            Ingreso de los datos de eclosión
          </p>
        </div>
      </div>

      {/* FILA 1 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Nido*">
          <select
            name="nido"
            value={form.nido}
            onChange={onChange}
            className={inputClass}
            required
          >
            <option value="">Seleccione el nido</option>

            {nidos.map((nido) => (
              <option key={nido.id} value={nido.id}>
                {nido.label}
              </option>
            ))}
          </select>
        </Field>

        <DateTimeInput
          label="Fecha y Hora de Eclosión*"
          name="fechaEclosion"
          value={form.fechaEclosion}
          onChange={onChange}
          required
        />

        <DateTimeInput
          label="Fecha y Hora de Liberación"
          name="fechaLiberacion"
          value={form.fechaLiberacion}
          onChange={onChange}
        />

        <Field label="Responsable de Liberación*">
          <input
            type="text"
            name="responsableLiberacion"
            value={form.responsableLiberacion}
            onChange={onChange}
            placeholder="ej: Karla Martínez"
            className={inputClass}
            required
          />
        </Field>
      </div>

      {/* NEONATOS VIVOS */}
      <section className="mt-4">
        <div className="mb-3 flex items-center gap-2">
          <Heart className="text-emerald-500" size={20} />

          <h3 className="text-base font-semibold text-slate-800">
            Neonatos Vivos
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Dentro de la Arena">
            <input
              type="number"
              min="0"
              name="vivosDentro"
              value={form.vivosDentro}
              onChange={onChange}
              placeholder="ej: 95"
              className={inputClass}
            />
          </Field>

          <Field label="Fuera de la Arena">
            <input
              type="number"
              min="0"
              name="vivosFuera"
              value={form.vivosFuera}
              onChange={onChange}
              placeholder="ej: 5"
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      {/* NEONATOS MUERTOS */}
      <section className="mt-4">
        <div className="mb-3 flex items-center gap-2">
          <Skull className="text-red-500" size={20} />

          <h3 className="text-base font-semibold text-slate-800">
            Neonatos Muertos
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Dentro de la Arena">
            <input
              type="number"
              min="0"
              name="muertosDentro"
              value={form.muertosDentro}
              onChange={onChange}
              placeholder="ej: 5"
              className={inputClass}
            />
          </Field>

          <Field label="Fuera de la Arena">
            <input
              type="number"
              min="0"
              name="muertosFuera"
              value={form.muertosFuera}
              onChange={onChange}
              placeholder="ej: 0"
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      {/* ESTADO AMBIENTAL */}
      <section className="mt-4">
        <div className="mb-3 flex items-center gap-2">
          <Waves className="text-blue-500" size={20} />

          <h3 className="text-base font-semibold text-slate-800">
            Estado Ambiental
          </h3>
        </div>

        <div className="max-w-[260px]">
          <Field label="Condición de la marea">
            <select
              name="condicionMarea"
              value={form.condicionMarea}
              onChange={onChange}
              className={inputClass}
            >
              <option value="">Seleccione la condición</option>
              <option value="Marea alta">Marea alta</option>
              <option value="Marea media">Marea media</option>
              <option value="Marea baja">Marea baja</option>
            </select>
          </Field>
        </div>
      </section>

      {/* OBSERVACIONES */}
      <div className="mt-4">
        <Field label="Observaciones Adicionales">
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={onChange}
            placeholder="Agregue notas relevantes sobre el proceso de eclosión, incidencias durante la liberación."
            className="min-h-[62px] w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#00796B] focus:ring-2 focus:ring-[#00796B]/15"
          />
        </Field>
      </div>
    </form>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </span>

      {children}
    </label>
  )
}

export default RegistroNacimientoForm