import { useMemo, useState } from "react";
import { Activity, History, Thermometer } from "lucide-react";

import TemperaturaForm from "../../../components/temperatura/TemperaturaForm";
import MedicionesTemperaturaCard from "../../../components/temperatura/MedicionesTemperaturaCard";
import HistorialTemperatura from "../../../components/temperatura/HistorialTemperatura";
import TemperaturaDetailModal from "../../../components/temperatura/TemperaturaDetailModal";
import SaveButton from "../../../components/common/SaveButton";
import ClearButton from "../../../components/common/ClearButton";

import {
  temperaturaTabs,
  corralesOptions,
  sectoresOptions,
  temperaturaStats,
  registrosTemperaturaMock,
  getPromedioMediciones,
  getEstadoPorPromedio,
} from "./temperatura.config";

function TemperaturaPage() {
  const [activeTab, setActiveTab] = useState(temperaturaTabs.registro);
  const [selectedRegistro, setSelectedRegistro] = useState(null);

  const [formData, setFormData] = useState({
    idCorral: "",
    idSector: "",
    fechaHoraMedicion: "",
    observaciones: "",
  });

  const [mediciones, setMediciones] = useState([
    {
      id: crypto.randomUUID(),
      profundidad: "",
      temperatura: "",
      orden: "Primera medición",
    },
  ]);

  const sectoresFiltrados = useMemo(() => {
    if (!formData.idCorral) return [];

    return sectoresOptions.filter(
      (sector) => Number(sector.idCorral) === Number(formData.idCorral),
    );
  }, [formData.idCorral]);

  const promedio = useMemo(() => {
    const medicionesValidas = mediciones.filter(
      (item) =>
        item.temperatura !== "" && !Number.isNaN(Number(item.temperatura)),
    );

    return getPromedioMediciones(medicionesValidas);
  }, [mediciones]);

  const estadoPromedio = getEstadoPorPromedio(promedio);

  const handleChangeForm = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "idCorral" ? { idSector: "" } : {}),
    }));
  };

  const handleAddMedicion = () => {
    setMediciones((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        profundidad: "",
        temperatura: "",
        orden: "Control adicional",
      },
    ]);
  };

  const handleChangeMedicion = (id, field, value) => {
    setMediciones((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const handleRemoveMedicion = (id) => {
    if (mediciones.length === 1) return;

    setMediciones((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearForm = () => {
    setFormData({
      idCorral: "",
      idSector: "",
      fechaHoraMedicion: "",
      observaciones: "",
    });

    setMediciones([
      {
        id: crypto.randomUUID(),
        profundidad: "",
        temperatura: "",
        orden: "Primera medición",
      },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      ...formData,
      mediciones,
      promedio,
      estado: estadoPromedio,
    });

    // Más adelante aquí irá el POST al backend.
  };

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {temperaturaStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.title}
              className="rounded-2xl border border-[#D8E5DF] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-[#163832]">
                    {stat.value}
                  </h3>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}
                >
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>

              <p className="mt-3 text-xs text-gray-500">{stat.description}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-[#D8E5DF] bg-white shadow-sm">
        <div className="border-b border-[#D8E5DF] px-6 pt-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-[#0F6B3D]" />
                <h2 className="text-lg font-bold text-[#163832]">
                  Módulo de temperatura
                </h2>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Registra mediciones y consulta el historial de monitoreo.
              </p>
            </div>

            <div className="flex rounded-xl bg-[#EFF8F5] p-1">
              <button
                type="button"
                onClick={() => setActiveTab(temperaturaTabs.registro)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeTab === temperaturaTabs.registro
                    ? "bg-white text-[#0F6B3D] shadow-sm"
                    : "text-gray-500 hover:text-[#0F6B3D]"
                }`}
              >
                <Activity className="h-4 w-4" />
                Registrar temperatura
              </button>

              <button
                type="button"
                onClick={() => setActiveTab(temperaturaTabs.historial)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeTab === temperaturaTabs.historial
                    ? "bg-white text-[#0F6B3D] shadow-sm"
                    : "text-gray-500 hover:text-[#0F6B3D]"
                }`}
              >
                <History className="h-4 w-4" />
                Historial
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {activeTab === temperaturaTabs.registro ? (
            <form
              onSubmit={handleSubmit}
              className="grid gap-6 xl:grid-cols-[1fr_420px]"
            >
              <div className="space-y-6">
                <TemperaturaForm
                  formData={formData}
                  corralesOptions={corralesOptions}
                  sectoresFiltrados={sectoresFiltrados}
                  onChange={handleChangeForm}
                />

                <MedicionesTemperaturaCard
                  mediciones={mediciones}
                  promedio={promedio}
                  estadoPromedio={estadoPromedio}
                  onAddMedicion={handleAddMedicion}
                  onChangeMedicion={handleChangeMedicion}
                  onRemoveMedicion={handleRemoveMedicion}
                />
              </div>

              <aside className="h-fit rounded-2xl border border-[#D8E5DF] bg-[#F8FCFA] p-5">
                <h3 className="text-base font-bold text-[#163832]">
                  Resumen del registro
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Verifica los datos antes de guardar la medición.
                </p>

                <div className="mt-5 space-y-3">
                  <ResumenItem
                    label="Corral"
                    value={
                      corralesOptions.find(
                        (corral) =>
                          Number(corral.id) === Number(formData.idCorral),
                      )?.codigo || "Sin seleccionar"
                    }
                  />

                  <ResumenItem
                    label="Sector"
                    value={
                      sectoresOptions.find(
                        (sector) =>
                          Number(sector.id) === Number(formData.idSector),
                      )?.codigo || "Sin seleccionar"
                    }
                  />

                  <ResumenItem
                    label="Mediciones"
                    value={`${mediciones.length} registradas`}
                  />

                  <ResumenItem
                    label="Promedio"
                    value={promedio ? `${promedio} °C` : "Sin datos"}
                  />

                  <ResumenItem
                    label="Estado"
                    value={
                      estadoPromedio === "fuera_rango"
                        ? "Fuera de rango"
                        : "Normal"
                    }
                    valueClassName={
                      estadoPromedio === "fuera_rango"
                        ? "text-red-600"
                        : "text-emerald-600"
                    }
                  />
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <SaveButton type="submit">Guardar registro</SaveButton>

                  <ClearButton
                    onClick={handleClearForm}
                    variant="form"
                    className="w-full"
                  >
                    Limpiar formulario
                  </ClearButton>
                </div>
              </aside>
            </form>
          ) : (
            <HistorialTemperatura
              registros={registrosTemperaturaMock}
              onViewDetail={setSelectedRegistro}
            />
          )}
        </div>
      </section>

      {selectedRegistro && (
        <TemperaturaDetailModal
          registro={selectedRegistro}
          onClose={() => setSelectedRegistro(null)}
        />
      )}
    </div>
  );
}

function ResumenItem({ label, value, valueClassName = "text-[#163832]" }) {
  return (
    <div className="rounded-xl border border-[#D8E5DF] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className={`mt-1 text-sm font-bold ${valueClassName}`}>{value}</p>
    </div>
  );
}

export default TemperaturaPage;
