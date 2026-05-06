function ResumenNidoCard({ nido }) {
  if (!nido) return null

  return (
    <div className="grid grid-cols-3 gap-3 rounded-xl bg-[#DFE9E7] px-5 py-4 shadow-md">
      <div className="flex flex-col items-center text-center">
        <p className="text-sm text-slate-500">Especie</p>
        <p className="mt-1 text-sm font-semibold text-slate-800">
          {nido.especie}
        </p>
      </div>

      <div className="flex flex-col items-center text-center">
        <p className="whitespace-nowrap text-sm text-slate-500">
          Huevos Iniciales
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-800">
          {nido.huevos}
        </p>
      </div>

      <div className="flex flex-col items-center text-center">
        <p className="whitespace-nowrap text-sm text-slate-500">
          Días Incubación
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-800">
          {nido.diasIncubacion}
        </p>
      </div>
    </div>
  )
}

export default ResumenNidoCard