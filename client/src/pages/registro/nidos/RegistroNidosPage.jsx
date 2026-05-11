import { useState } from "react";
import {
  CalendarDays,
  ClipboardCheck,
  Egg,
  Fence,
  MapPin,
  Hash,
  Shell,
} from "lucide-react";

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

  /*
    Luego estos datos deberían venir del backend.
    Son las posiciones que ya tienen nido registrado.
  */
  const posicionesOcupadas = [
    // Ejemplo:
    // { fila: "A", col: 1 },
    // { fila: "A", col: 3 },
    // { fila: "B", col: 2 },
  ];

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "corral" ? { posicion: null } : {}),
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
    <section className="space-y-5">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_1fr]">
        <RegistroNidoForm form={form} onChange={handleChange} />

        <SeleccionPosicionCard
          form={form}
          onChange={handleChange}
          onClear={limpiarFormulario}
          onSave={guardarRegistro}
          resetGridKey={resetGridKey}
          posicionesOcupadas={posicionesOcupadas}
        />
      </div>

      <ResumenRegistroNido form={form} />

      <ProtocoloCorral />
    </section>
  );
}

function ResumenRegistroNido({ form }) {
  const posicionSeleccionada = form.posicion
    ? `${form.posicion.fila}${String(form.posicion.col).padStart(2, "0")}`
    : "Sin seleccionar";

  return (
    <section className="rounded-2xl border border-[#C9DDD8] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <ClipboardCheck className="mt-1 h-5 w-5 text-[#0F6B3D]" />

        <div>
          <h2 className="text-base font-bold text-[#163832]">
            Resumen del registro
          </h2>
          <p className="text-sm text-gray-500">
            Vista rápida de los datos principales antes de guardar.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        <ResumenItem
          icon={Shell}
          label="Especie"
          value={form.especie || "Sin seleccionar"}
        />

        <ResumenItem
          icon={Hash}
          label="Huevos"
          value={form.cantidadHuevos || "Sin dato"}
        />

        <ResumenItem
          icon={Fence}
          label="Corral"
          value={form.corral || "Sin seleccionar"}
        />

        <ResumenItem
          icon={MapPin}
          label="Posición"
          value={posicionSeleccionada}
        />

        <ResumenItem
          icon={CalendarDays}
          label="Fecha siembra"
          value={form.fechaSiembra || "Sin fecha"}
        />
      </div>
    </section>
  );
}

function ResumenItem({ icon: Icon, label, value }) {
  return (
    <article className="rounded-xl border border-[#D8E5DF] bg-[#F8FCFA] p-4">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#0F6B3D]" />
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {label}
        </p>
      </div>

      <p className="truncate text-sm font-bold text-[#163832]">{value}</p>
    </article>
  );
}
