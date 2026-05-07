import { useMemo, useState } from "react";
import CalculosNacimientoCard from "../../../components/nacimientos/CalculosNacimientoCard";
import RegistroNacimientoForm from "../../../components/nacimientos/RegistroNacimientoForm";

function NacimientosPage() {
  const initialForm = {
    nido: "",
    fechaEclosion: "",
    fechaLiberacion: "",
    responsableLiberacion: "",
    vivosDentro: "",
    vivosFuera: "",
    muertosDentro: "",
    muertosFuera: "",
    condicionMarea: "",
    observaciones: "",
  };

  const [form, setForm] = useState(initialForm);

  const nidos = [
    {
      id: "1",
      label: "A-01 - Golfina (105 huevos)",
      huevos: 105,
      especie: "Golfina",
      diasIncubacion: 55,
    },
    {
      id: "2",
      label: "B-05 - Carey (78 huevos)",
      huevos: 78,
      especie: "Carey",
      diasIncubacion: 58,
    },
    {
      id: "3",
      label: "C-03 - Prieta (100 huevos)",
      huevos: 100,
      especie: "Prieta",
      diasIncubacion: 60,
    },
    {
      id: "4",
      label: "A-02 - Golfina (88 huevos)",
      huevos: 88,
      especie: "Golfina",
      diasIncubacion: 54,
    },
  ];

  const nidoSeleccionado = nidos.find((n) => n.id === form.nido);

  const calculos = useMemo(() => {
    const vivosDentro = Number(form.vivosDentro) || 0;
    const vivosFuera = Number(form.vivosFuera) || 0;
    const muertosDentro = Number(form.muertosDentro) || 0;
    const muertosFuera = Number(form.muertosFuera) || 0;

    const totalVivos = vivosDentro + vivosFuera;
    const totalMuertos = muertosDentro + muertosFuera;
    const totalLiberados = totalVivos;
    const totalNacidos = totalVivos + totalMuertos;
    const huevos = nidoSeleccionado?.huevos || 0;

    const tasaSupervivencia =
      totalNacidos > 0 ? ((totalVivos / totalNacidos) * 100).toFixed(1) : "0.0";

    const tasaEclosion =
      huevos > 0 ? ((totalNacidos / huevos) * 100).toFixed(1) : "0.0";

    return {
      totalVivos,
      totalMuertos,
      totalLiberados,
      totalNacidos,
      tasaSupervivencia,
      tasaEclosion,
      huevos,
    };
  }, [form, nidoSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const limpiarFormulario = () => {
    setForm(initialForm);
  };

  const guardar = (e) => {
    e?.preventDefault();

    console.log("Datos nacimiento:", form);
    alert("Registro guardado correctamente");
  };

  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
      <RegistroNacimientoForm
        form={form}
        nidos={nidos}
        onChange={handleChange}
        onSubmit={guardar}
      />

      <CalculosNacimientoCard
        calculos={calculos}
        nidoSeleccionado={nidoSeleccionado}
        onGuardar={guardar}
        onLimpiar={limpiarFormulario}
      />
    </section>
  );
}

export default NacimientosPage;
