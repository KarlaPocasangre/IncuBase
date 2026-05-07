import { useMemo, useState } from "react";
import RegistroExhumacionForm from "../../../components/exhumacion/RegistroExhumacionForm";
import ResumenExhumacionCard from "../../../components/exhumacion/ResumenExhumacionCard";
import SaveButton from "../../../components/common/SaveButton";
import ClearButton from "../../../components/common/ClearButton";

const initialForm = {
  nido: "",
  fechaExhumacion: "",
  totalSinEclosionar: "",
  cascarasVacias: "",
  huevosSinEmbrion: "",
  embrionesMuertos: "",
  huevosNoEclosionados: "",
  neonatosMuertosNido: "",
  evidenciaDepredacion: "",
  tipoDepredador: "",
  totalEclosiones: "",
  observaciones: "",
};

const nidos = [
  {
    id: "1",
    codigo: "A-01",
    label: "A-01 - Golfina (Eclosión: 2024-01-10)",
    especie: "Golfina",
    fechaEclosion: "2024-01-10",
    huevosIniciales: 98,
    liberadosVivos: 82,
  },
  {
    id: "2",
    codigo: "B-05",
    label: "B-05 - Carey (Eclosión: 2024-01-12)",
    especie: "Carey",
    fechaEclosion: "2024-01-12",
    huevosIniciales: 78,
    liberadosVivos: 65,
  },
  {
    id: "3",
    codigo: "C-03",
    label: "C-03 - Prieta (Eclosión: 2024-01-14)",
    especie: "Prieta",
    fechaEclosion: "2024-01-14",
    huevosIniciales: 100,
    liberadosVivos: 89,
  },
];

function ExhumacionPage() {
  const [form, setForm] = useState(initialForm);

  const nidoSeleccionado = nidos.find((nido) => nido.id === form.nido);

  const resumen = useMemo(() => {
    const huevosIniciales = nidoSeleccionado?.huevosIniciales || 0;
    const liberadosVivos = nidoSeleccionado?.liberadosVivos || 0;

    const sinEclosionar =
      form.totalSinEclosionar !== ""
        ? Number(form.totalSinEclosionar) || 0
        : nidoSeleccionado
          ? Math.max(huevosIniciales - liberadosVivos, 0)
          : 0;

    const etapas = [
      form.huevosSinEmbrion,
      form.embrionesMuertos,
      form.huevosNoEclosionados,
      form.neonatosMuertosNido,
    ];

    const hayDatosEtapa = etapas.some((valor) => valor !== "");

    const embrionesMuertos = hayDatosEtapa
      ? etapas.reduce((total, valor) => total + (Number(valor) || 0), 0)
      : sinEclosionar;

    return {
      huevosIniciales,
      liberadosVivos,
      sinEclosionar,
      embrionesMuertos,
    };
  }, [form, nidoSeleccionado]);

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const limpiarFormulario = () => {
    setForm(initialForm);
  };

  const guardarExhumacion = () => {
    if (!form.nido) {
      alert("Selecciona un nido antes de guardar");
      return;
    }

    console.log("Datos de exhumación:", {
      ...form,
      resumen,
    });

    alert("Registro de exhumación guardado correctamente");
  };

  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_390px]">
      <RegistroExhumacionForm
        form={form}
        nidos={nidos}
        onChange={handleChange}
      />

      <aside className="space-y-4">
        <ResumenExhumacionCard
          nidoSeleccionado={nidoSeleccionado}
          resumen={resumen}
        />

        <SaveButton disabled={!nidoSeleccionado} onClick={guardarExhumacion}>
          Guardar Exhumacion.
        </SaveButton>

        <ClearButton
          variant="form"
          className="w-full"
          onClick={limpiarFormulario}
        >
          Limpiar Formulario
        </ClearButton>
      </aside>
    </section>
  );
}

export default ExhumacionPage;
