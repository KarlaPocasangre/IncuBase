import {
  Egg,
  Turtle,
  Skull,
  BarChart3,
  Wrench,
  Search,
  CalendarDays,
  Plus,
  RotateCcw,
  Pencil,
  FileSearch,
} from "lucide-react";

const stats = [
  {
    label: "Eclosiones",
    value: "200",
    icon: Egg,
  },
  {
    label: "Neonatos Vivos",
    value: "2000",
    icon: Turtle,
  },
  {
    label: "Neonatos muertos",
    value: "300",
    icon: Skull,
  },
  {
    label: "Tasa de supervivencia",
    value: "40%",
    icon: BarChart3,
  },
];

const births = [
  {
    nido: "C2HJJ-09",
    vivos: 80,
    muertos: 23,
    marea: "Marea Alta",
    fecha: "2023-10-02 15:04",
    responsable: "Jose Gilverto",
  },
  {
    nido: "C2HJJ-09",
    vivos: 100,
    muertos: 23,
    marea: "Marea Alta",
    fecha: "2023-10-02 15:04",
    responsable: "Ana Caceres",
  },
  {
    nido: "C2HJJ-09",
    vivos: 23,
    muertos: 43,
    marea: "Marea Baja",
    fecha: "2005-01-01 11:45",
    responsable: "Mario Tesorero",
  },
  {
    nido: "C2HJJ-09",
    vivos: 23,
    muertos: 32,
    marea: "Marea Baja",
    fecha: "2026-11-01 21:00",
    responsable: "Juan Ramon",
  },
];

function GestionNacimientosPage() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className="flex items-center justify-between rounded-2xl border border-[#D8E5DF] bg-white px-7 py-5 shadow-sm"
            >

              {/* muestra los datos de las tarjetas como, Eclosion, Neonatos vivos y muertos */ } 
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <h2 className="mt-1 text-2xl font-bold text-[#0B2B26]">
                  {item.value}
                </h2>
              </div>

              <Icon className="h-7 w-7 text-[#6FB39A]" strokeWidth={1.8} />
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-[#D8E5DF] bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-[#0F7A4F]" />
              <h2 className="text-lg font-bold text-[#0B2B26]">
                Gestion de Nacimientos
              </h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Administra los nacimientos del sistema IncuBase
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-[#0F6B3D] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#0B5631]">
            <Plus className="h-4 w-4" />
            Registrar Nacimiento
          </button>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_150px_120px_140px]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por codigo de nido..."
              className="h-12 w-full rounded-xl border border-[#D8E5DF] bg-white pl-12 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#0F6B3D]"
            />
          </div>

          <button className="flex h-12 items-center justify-between rounded-xl border border-[#D8E5DF] bg-white px-4 text-sm text-gray-700">
            Rango de fecha
            <CalendarDays className="h-4 w-4 text-gray-500" />
          </button>

          <select className="h-12 rounded-xl border border-[#D8E5DF] bg-white px-4 text-sm text-gray-700 outline-none">
            <option>Marea</option>
            <option>Marea Alta</option>
            <option>Marea Baja</option>
          </select>

          <select className="h-12 rounded-xl border border-[#D8E5DF] bg-white px-4 text-sm text-gray-700 outline-none">
            <option>Responsable</option>
            <option>Jose Gilverto</option>
            <option>Ana Caceres</option>
          </select>
        </div>

        <button className="mb-6 flex items-center gap-2 rounded-xl border border-[#D8E5DF] bg-[#F8FBFA] px-4 py-3 text-sm text-gray-500">
          <RotateCcw className="h-4 w-4" />
          Limpiar Filtros
        </button>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#D8E5DF] text-sm text-[#0B2B26]">
                <th className="pb-4 font-bold">Nido</th>
                <th className="pb-4 font-bold">Vivos</th>
                <th className="pb-4 font-bold">Muertos</th>
                <th className="pb-4 font-bold">Marea</th>
                <th className="pb-4 font-bold">Fecha de Eclosion</th>
                <th className="pb-4 font-bold">Responsable</th>
                <th className="pb-4 font-bold">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {births.map((birth, index) => (
                <tr
                  key={index}
                  className="border-b border-[#E3ECE7] text-sm text-gray-500"
                >
                  <td className="py-6 font-bold text-[#0B2B26]">
                    {birth.nido}
                  </td>
                  <td className="py-6">{birth.vivos}</td>
                  <td className="py-6">{birth.muertos}</td>
                  <td className="py-6">{birth.marea}</td>
                  <td className="py-6">{birth.fecha}</td>
                  <td className="py-6">{birth.responsable}</td>
                  <td className="py-6">
                    <div className="flex items-center gap-5">
                      <button>
                        <Pencil className="h-5 w-5 text-[#D99A22]" />
                      </button>
                      <button>
                        <FileSearch className="h-5 w-5 text-[#2E8BD6]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default GestionNacimientosPage;