import { useEffect,useState } from "react";
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
import { obtenerCorrales } from "../../../services/corrales.service";
import { crearNido } from "../../../services/nidos.service";
import { buildNidoPayload } from "../../../utils/nidos.helpers";
import { obtenerNidosPorCorral } from "../../../services/nidos.service";

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
  const [corrales, setCorrales] = useState([]);
  const [nidosCorral, setNidosCorral] = useState([]);

  useEffect(() => {
   const loadCorrales = async () => {
      try {
        const data = await obtenerCorrales();
        setCorrales(data);
      } catch (error) {
        console.error("Error al cargar corrales:", error);
      }
    };

    loadCorrales();
  }, []);

  useEffect(() => {
  const loadNidosCorral = async () => {
    if (!form.corral) {
      setNidosCorral([]);
      return;
    }

    try {
      const data = await obtenerNidosPorCorral(form.corral);
      setNidosCorral(data);
    } catch (error) {
      console.error("Error al cargar nidos del corral:", error);
    }
  };

  loadNidosCorral();
}, [form.corral]);

  /*
    Luego estos datos deberían venir del backend.
    Son las posiciones que ya tienen nido registrado.
  */
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

  const posicionesOcupadas = nidosCorral.map((nido) => ({
    fila: getFilaLetra(nido.sector_corral?.fila),
    col: Number(nido.sector_corral?.columna),
  }));

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

 const guardarRegistro = async () => {
  try {
    if (!form.corral || !form.posicion) {
      console.error("Selecciona un corral y una posición");
      return;
    }

    const payload = buildNidoPayload(form);

    await crearNido(payload);

    limpiarFormulario();
  } catch (error) {
    console.error("Error al registrar nido:", error);
  }
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
          corrales={corrales}
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
