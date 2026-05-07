import { useState } from "react";
import {
  Plus,
  Search,
  Egg,
  Calendar,
  Package,
  ClockAlert,
  Turtle,
  Ban,
  EggOff,
  Fence,
} from "lucide-react";

import NidoFormModal from "../../components/nidos/NidoFormModal";
import NidoDetails from "../../components/nidos/NidoDetails";

function CorralesNidosPage() {
  const [addOpen, setAddOpen] = useState(false);

  const [selectedNido, setSelectedNido] = useState({
    row: "C",
    col: "04",
    estado: "eclosionado",
  });

  const rows = ["A", "B", "C", "D", "E", "F"];
  const cols = ["01", "02", "03", "04", "05", "06", "07", "08"];

  const nidos = {
    "A-01": "ocupado",
    "A-02": "ocupado",
    "A-03": "ocupado",
    "A-04": "ocupado",
    "A-05": "ocupado",
    "A-06": "ocupado",
    "A-07": "exhumado",
    "A-08": "proximo",

    "B-01": "ocupado",
    "B-02": "proximo",
    "B-03": "ocupado",
    "B-04": "vacio",
    "B-05": "exhumado",
    "B-06": "ocupado",
    "B-07": "ocupado",
    "B-08": "ocupado",

    "C-01": "exhumado",
    "C-02": "ocupado",
    "C-03": "ocupado",
    "C-04": "eclosionado",
    "C-05": "ocupado",
    "C-06": "proximo",
    "C-07": "ocupado",
    "C-08": "ocupado",

    "D-01": "ocupado",
    "D-02": "ocupado",
    "D-03": "exhumado",
    "D-04": "ocupado",
    "D-05": "ocupado",
    "D-06": "vacio",
    "D-07": "ocupado",
    "D-08": "ocupado",

    "E-01": "proximo",
    "E-02": "ocupado",
    "E-03": "vacio",
    "E-04": "ocupado",
    "E-05": "proximo",
    "E-06": "exhumado",
    "E-07": "ocupado",
    "E-08": "vacio",

    "F-01": "ocupado",
    "F-02": "ocupado",
    "F-03": "ocupado",
    "F-04": "exhumado",
    "F-05": "ocupado",
    "F-06": "ocupado",
    "F-07": "ocupado",
    "F-08": "proximo",
  };

  const stateClasses = {
    ocupado: "bg-emerald-500 text-white",
    proximo: "bg-orange-400 text-white",
    eclosionado: "bg-blue-400 text-white",
    exhumado: "bg-red-500 text-white",
    vacio: "bg-[#E6ECE9] text-slate-400",
  };

  const stateIcons = {
    ocupado: <Egg className="h-7 w-7" />,
    proximo: <ClockAlert className="h-7 w-7" />,
    eclosionado: <Turtle className="h-7 w-7" />,
    exhumado: <EggOff className="h-7 w-7" />,
    vacio: <Ban className="h-7 w-7" />,
  };

  const handleSaveNido = () => {
    setAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#10231F]">Corrales y Nidos</h1>
        <p className="text-sm text-slate-500">Gestión de corrales y nidos</p>
      </div>

      <div className="grid grid-cols-5 gap-5">
        <div className="rounded-2xl border border-[#D7E4E1] bg-white p-5">
          <p className="text-sm text-slate-500">Total Corrales</p>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-3xl font-bold text-[#10231F]">384</span>
            <Fence className="text-[#7BBFA8]" />
          </div>
        </div>

        <div className="rounded-2xl border border-[#D7E4E1] bg-white p-5">
          <p className="text-sm text-slate-500">Total Nidos</p>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-3xl font-bold text-[#10231F]">384</span>
            <Egg className="text-[#7BBFA8]" />
          </div>
        </div>

        <div className="rounded-2xl border border-[#D7E4E1] bg-white p-5">
          <p className="text-sm text-slate-500">Incubando</p>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-3xl font-bold text-[#10231F]">102</span>
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
          </div>
        </div>

        <div className="rounded-2xl border border-[#D7E4E1] bg-white p-5">
          <p className="text-sm text-slate-500">Próximos a eclosión</p>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-3xl font-bold text-[#10231F]">80</span>
            <span className="h-3 w-3 rounded-full bg-orange-400" />
          </div>
        </div>

        <div className="rounded-2xl border border-[#D7E4E1] bg-white p-5">
          <p className="text-sm text-slate-500">Eclosionados</p>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-3xl font-bold text-[#10231F]">80</span>
            <span className="h-3 w-3 rounded-full bg-blue-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1.2fr_0.8fr] gap-6">
        <section className="rounded-2xl border border-[#D7E4E1] bg-white p-6 shadow-sm">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Fence className="h-5 w-5 text-[#0F6B3D]" />

                <h2 className="text-xl font-bold text-[#10231F]">
                  Vista del corral
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Haz click en un nido para ver sus detalles
              </p>
            </div>

            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-[#0F6B3D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0B5631]"
            >
              <Plus className="h-4 w-4" />
              Agregar Nido
            </button>
          </div>

          <div className="mb-5 flex items-center gap-3">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Buscar por código de nido..."
                className="h-12 w-full rounded-xl border border-[#D7E4E1] bg-white pl-12 pr-4 text-sm text-slate-600 outline-none focus:border-[#79B49E] focus:ring-2 focus:ring-[#79B49E]/20"
              />
            </div>

            <select className="h-12 rounded-xl border border-[#D7E4E1] bg-white px-4 text-sm text-slate-600 outline-none">
              <option>Estado</option>
              <option>Ocupado</option>
              <option>Próximo a eclosión</option>
              <option>Eclosionado</option>
              <option>Exhumado</option>
              <option>Vacío</option>
            </select>
          </div>

          <div className="mb-10 flex flex-wrap gap-x-10 gap-y-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 bg-emerald-500" />
              Ocupado
            </div>

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 bg-orange-400" />
              Próximo a eclosión
            </div>

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 bg-blue-400" />
              Eclosionado
            </div>

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 bg-red-500" />
              Exhumado
            </div>

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 bg-[#E6ECE9]" />
              Vacío
            </div>
          </div>

          <div className="mx-auto w-fit">
            <div className="mb-4 ml-10 grid grid-cols-8 gap-3 text-center text-sm font-bold text-[#6B5D55]">
              {cols.map((col) => (
                <span key={col}>{col}</span>
              ))}
            </div>

            <div className="space-y-3">
              {rows.map((row) => (
                <div key={row} className="flex items-center gap-4">
                  <span className="w-5 text-sm font-bold text-[#6B5D55]">
                    {row}
                  </span>

                  <div className="grid grid-cols-8 gap-3">
                    {cols.map((col) => {
                      const key = `${row}-${col}`;
                      const estado = nidos[key] || "ocupado";

                      const isSelected =
                        selectedNido.row === row && selectedNido.col === col;

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() =>
                            setSelectedNido({
                              row,
                              col,
                              estado,
                            })
                          }
                          className={`flex h-[58px] w-[58px] items-center justify-center rounded-md border-[5px] text-2xl font-bold shadow-sm transition hover:scale-105 ${
                            isSelected ? "border-[#0F6B3D]" : "border-[#DDF3EC]"
                          } ${stateClasses[estado]}`}
                        >
                          {stateIcons[estado]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <select className="h-[48px] w-[190px] rounded-xl border border-[#D7E4E1] bg-white px-4 text-sm text-slate-600 outline-none">
              <option>Corral BCU67-8C</option>
            </select>
          </div>
        </section>

        <NidoDetails selectedNido={selectedNido} />
      </div>

      <NidoFormModal
        open={addOpen}
        mode="add"
        onClose={() => setAddOpen(false)}
        onSave={handleSaveNido}
      />
    </div>
  );
}

export default CorralesNidosPage;
