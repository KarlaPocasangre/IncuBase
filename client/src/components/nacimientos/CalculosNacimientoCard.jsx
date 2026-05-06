import { Calculator, Save, RotateCcw } from "lucide-react"
import ResumenNidoCard from "./ResumenNidoCard"

function CalculosNacimientoCard({
  calculos,
  nidoSeleccionado,
  onGuardar,
  onLimpiar,
}) {
  return (
    <aside className="space-y-4">
      <ResumenNidoCard nido={nidoSeleccionado} />

      <div className="rounded-2xl border border-[#C9DDD8] bg-[#E9F5F1] p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Calculator className="text-[#00796B]" size={20} />
          <h3 className="text-lg font-bold text-slate-800">
            Cálculos Automáticos
          </h3>
        </div>

        <div className="space-y-3">
          <div className="rounded-lg bg-emerald-100 p-4 text-center">
            <p className="text-sm text-slate-700">Total Vivos</p>
            <p className="text-xl font-bold text-emerald-600">
              {calculos.totalVivos}
            </p>
          </div>

          <div className="rounded-lg bg-red-100 p-4 text-center">
            <p className="text-sm text-slate-700">Total Muertos</p>
            <p className="text-xl font-bold text-red-600">
              {calculos.totalMuertos}
            </p>
          </div>

          <div className="rounded-lg bg-blue-100 p-4 text-center">
            <p className="text-sm text-slate-700">Total Liberados</p>
            <p className="text-xl font-bold text-blue-500">
              {calculos.totalLiberados}
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 text-center shadow-sm">
            <p className="text-sm text-slate-700">Tasa de Supervivencia</p>
            <p className="text-xl font-bold text-slate-800">
              {calculos.tasaSupervivencia}%
            </p>
          </div>

          {nidoSeleccionado && (
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-700">Tasa de Eclosión</p>
              <p className="text-lg font-bold text-slate-800">
                {calculos.tasaEclosion}%
              </p>
              <p className="text-sm text-slate-500">
                {calculos.totalNacidos} de {calculos.huevos} huevos
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onGuardar}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#007A3D] text-sm font-bold text-white transition hover:bg-[#006B35]"
      >
        <Save size={19} />
        Guardar Registro
      </button>

      <button
        type="button"
        onClick={onLimpiar}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        <RotateCcw size={19} />
        Limpiar Formulario
      </button>
    </aside>
  )
}

export default CalculosNacimientoCard