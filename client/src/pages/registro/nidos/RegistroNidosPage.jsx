import { useState } from "react";
import RegistroNidoForm from "../../../components/nidos/RegistroNidoForm";
import SeleccionPosicionCard from "../../../components/nidos/SeleccionPosicionCard";
import ProtocoloCorral from "../../../components/nidos/ProtocoloCorral";

const initialForm = {
  especie: "",
  procedencia: "",
  largoCurvo: "",
  anchoCurvo: "",
  cantidadHuevos: "",
  profundidadNido: "",
  fechaDesove: "",
  fechaSiembra: "",
  corral: "",
  posicion: null,
};

export default function RegistroNidosPage() {
  const [form, setForm] = useState(initialForm);
  const [resetGridKey, setResetGridKey] = useState(0);

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const limpiarFormulario = () => {
    setForm(initialForm);
    setResetGridKey((prev) => prev + 1);
  };

  const guardarRegistro = () => {
    console.log("Datos del nido:", form);
  };

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_1fr]">
        <RegistroNidoForm form={form} onChange={handleChange} />

        <SeleccionPosicionCard
          form={form}
          onChange={handleChange}
          onClear={limpiarFormulario}
          onSave={guardarRegistro}
          resetGridKey={resetGridKey}
        />
      </div>

      <ProtocoloCorral />
    </section>
  );
}
