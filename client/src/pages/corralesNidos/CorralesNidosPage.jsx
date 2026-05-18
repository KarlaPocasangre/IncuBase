import {useEffect,useState } from "react";
import { Plus, Egg, ClockAlert, Turtle, EggOff, Fence } from "lucide-react";
import { crearCorral,obtenerCorrales } from "../../services/corrales.service";
import { obtenerNidosPorCorral } from "../../services/nidos.service";

import CorralFormModal from "../../components/corrales/CorralFormModal";
import NidoDetails from "../../components/nidos/NidoDetails";

function CorralesNidosPage() {
  const [addOpen, setAddOpen] = useState(false);

  const [corrales, setCorrales] = useState([]);
  const [selectedCorral, setSelectedCorral] = useState("");
  const [nidosBackend, setNidosBackend] = useState([]);


  const loadCorrales = async () => {
    try {
      const data = await obtenerCorrales();
      setCorrales(data);

      if (data.length > 0) {
        setSelectedCorral(String(data[0].id_corral));
      }
    } catch (error) {
      console.error("Error al obtener corrales:", error);
    }
  };

  const loadNidos = async (idCorral) => {
    try {
      const data = await obtenerNidosPorCorral(idCorral);
      setNidosBackend(data);
    } catch (error) {
      console.error("Error al obtener nidos:", error);
    }
  };

  useEffect(() => {
    loadCorrales();
  }, []);

  useEffect(() => {
  if (selectedCorral) {
    loadNidos(selectedCorral);
  }
  }, [selectedCorral]);

  const [selectedNido, setSelectedNido] = useState({
    row: "C",
    col: "04",
    estado: "eclosionado",
  });

  const rows = ["A", "B", "C", "D", "E", "F"];
  const cols = ["01", "02", "03", "04", "05", "06", "07", "08"];



  const stateClasses = {
    ocupado: "bg-emerald-500 text-white",
    proximo: "bg-orange-400 text-white",
    eclosionado: "bg-blue-400 text-white",
    exhumado: "bg-red-500 text-white",
    vacio: "bg-[#E6ECE9] text-transparent",
  };

  const stateIcons = {
    ocupado: <Egg size={20} />,
    proximo: <ClockAlert size={20} />,
    eclosionado: <Turtle size={20} />,
    exhumado: <EggOff size={20} />,
    vacio: null,
  };

  const getFilaLetra = (fila) => {
    const filas = {
      1: "A",
      2: "B",
      3: "C",
      4: "D",
      5: "E",
      6: "F",
    };

    return filas[fila] || fila;
  };

  const normalizeEstadoNido = (estado) => {
    const estadoLower = estado?.toLowerCase();

    if (estadoLower === "registrado") return "ocupado";
    if (estadoLower === "en incubación") return "ocupado";
    if (estadoLower === "próximo a eclosión") return "proximo";
    if (estadoLower === "eclosionado") return "eclosionado";
    if (estadoLower === "exhumado") return "exhumado";

    return "ocupado";
  };

  const nidosMap = {};

  nidosBackend.forEach((nido) => {
    const fila = getFilaLetra(nido.sector_corral?.fila);
    const columna = String(nido.sector_corral?.columna).padStart(2, "0");

    const key = `${fila}-${columna}`;
    const estado = normalizeEstadoNido(nido.estado_nido?.nombre);

    nidosMap[key] = {
      estado,
      data: nido,
    };
  });

  const stats = [
    {
      title: "Total Corrales",
      value: corrales.length,
      icon: Fence,
      iconColor: "text-[#7BBFA8]",
    },
   {
      title: "Total Nidos",
      value: nidosBackend.length,
      icon: Egg,
      iconColor: "text-[#7BBFA8]",
    },
    {
      title: "Incubando",
      value: nidosBackend.filter(
        (nido) => nido.estado_nido?.nombre?.toLowerCase() === "ocupado"
      ).length,
      dotColor: "bg-emerald-500",
    },
    {
      title: "Próximos a eclosión",
      value: nidosBackend.filter(
        (nido) => nido.estado_nido?.nombre?.toLowerCase() === "proximo"
      ).length,
      dotColor: "bg-orange-400",
    },
    {
      title: "Eclosionados",
      value: nidosBackend.filter(
        (nido) => nido.estado_nido?.nombre?.toLowerCase() === "eclosionado"
      ).length,
      dotColor: "bg-blue-400",
    },
  ];

  const legendItems = [
    {
      label: "Ocupado",
      color: "bg-emerald-500",
    },
    {
      label: "Próximo a eclosión",
      color: "bg-orange-400",
    },
    {
      label: "Eclosionado",
      color: "bg-blue-400",
    },
    {
      label: "Exhumado",
      color: "bg-red-500",
    },
    {
      label: "Vacío",
      color: "bg-[#E6ECE9]",
    },
  ];

  const handleCloseModal = () => {
    setAddOpen(false);
  };

  const handleSaveCorral = async (newCorral) => {
    try {
      await crearCorral({
        ubicacion: newCorral.ubicacion,
        fechaInstalacion: newCorral.fechaInstalacion,
        idTipoCorral: 1,
        idEstadoCorral: 1,
        observaciones: newCorral.observaciones,
        creadoPor: 1,
      });
      await loadCorrales();
      setAddOpen(false);
    } catch (error) {
      console.error("Error al crear corral:", error);
    }
  };

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.title}
              className="flex min-h-[110px] items-center justify-between rounded-2xl border border-[#D7E4E1] bg-white px-6 py-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="min-w-0">
                <p className="text-sm text-slate-500">{stat.title}</p>

                <h3 className="mt-2 text-3xl font-bold text-[#10231F]">
                  {stat.value}
                </h3>
              </div>

              {Icon ? (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F1F8F5]">
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              ) : (
                <span
                  className={`h-4 w-4 shrink-0 rounded-full ${stat.dotColor}`}
                />
              )}
            </article>
          );
        })}
      </section>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <section className="min-w-0 rounded-2xl border border-[#D7E4E1] bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
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
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0F6B3D] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B5631] sm:w-fit"
            >
              <Plus className="h-4 w-4" />
              Agregar Corral
            </button>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-3 text-sm text-slate-500 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {legendItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-xl border border-[#E3ECE7] bg-[#F8FCFA] px-3 py-2"
              >
                <span className={`h-4 w-4 shrink-0 rounded ${item.color}`} />
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto pb-3">
            <div className="mx-auto w-fit min-w-[620px]">
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
                        const estado = nidosMap[key]?.estado || "vacio";

                        const isSelected =
                          selectedNido.row === row && selectedNido.col === col;

                        return (
                          <button
                            key={key}
                            type="button"
                           onClick={() => {
                              const nidoData = nidosMap[key]?.data;
                              setSelectedNido({
                                row,
                                col,
                                estado,
                                data: nidoData || null,
                              });
                            }}
                            className={`flex h-[58px] w-[58px] items-center justify-center rounded-xl border-[4px] text-2xl font-bold shadow-sm transition hover:-translate-y-0.5 hover:scale-105 hover:shadow-md ${
                              isSelected
                                ? "border-[#0F6B3D] ring-4 ring-[#0F6B3D]/15"
                                : "border-[#DDF3EC]"
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
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-[#E3ECE7] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Corral seleccionado para monitoreo de nidos.
            </p>

            <select
              value={selectedCorral}
              onChange={(e) => setSelectedCorral(e.target.value)}
              className="h-[48px] w-full rounded-xl border border-[#D7E4E1] bg-white px-4 text-sm text-slate-600 outline-none transition focus:border-[#0F6B3D] focus:ring-4 focus:ring-[#0F6B3D]/10 sm:w-[210px]"
            >
              {corrales.length === 0 ? (
                <option value="">Sin corrales registrados</option>
              ) : (
                corrales.map((corral) => (
                <option key={String(corral.id_corral)} value={String(corral.id_corral)}>
                  {corral.codigo} - {corral.ubicacion}
                </option>
                ))
              )}
            </select>
          </div>
        </section>

        <div className="min-w-0">
          <NidoDetails selectedNido={selectedNido} />
        </div>
      </div>

      <CorralFormModal
        open={addOpen}
        mode="add"
        onClose={handleCloseModal}
        onSave={handleSaveCorral}
      />
    </div>
  );
}

export default CorralesNidosPage;