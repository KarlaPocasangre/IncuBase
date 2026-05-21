import { useEffect, useState } from "react";

import BaseModal from "../common/BaseModal";
import ModalActions from "../common/ModalActions";
import ModalButton from "../common/ModalButton";
import DateTimeInput from "../common/DateTimeInput";

function formatDateForInput(dateString) {
  if (!dateString) return "";
  return dateString.replace(" ", "T");
}

function getCurrentDateTimeLocal() {
  const now = new Date();

  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

  return now.toISOString().slice(0, 16);
}

const initialForm = {
  codigo: "",
  ubicacion: "",
  fechaInstalacion: "",
  tipo: "Corral Abierto",
  estado: "Activo",
  observaciones: "",
};

const inputClass =
  "h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 text-[13px] text-slate-600 outline-none shadow-sm transition focus:border-[#2F9A78] focus:ring-2 focus:ring-[#2F9A78]/20";

const textareaClass =
  "h-[104px] w-full resize-none rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] p-4 text-[13px] text-slate-600 outline-none shadow-sm transition placeholder:text-slate-400 focus:border-[#2F9A78] focus:ring-2 focus:ring-[#2F9A78]/20";

function CorralFormModal({ open, mode = "add", corral, onClose, onSave }) {
  const isEdit = mode === "edit";
  const [form, setForm] = useState(initialForm);
  const [errorFecha, setErrorFecha] = useState("");

  const currentDateTime = getCurrentDateTimeLocal();

  useEffect(() => {
    if (open && corral && isEdit) {
      setForm({
        codigo: corral.codigo || "",
        ubicacion: corral.ubicacion || "",
        fechaInstalacion: formatDateForInput(corral.fechaInstalacion),
        tipo: corral.tipo || "Corral Abierto",
        estado: corral.estado || "Activo",
        observaciones: corral.observaciones || "",
      });

      setErrorFecha("");
    }

    if (open && !isEdit) {
      setForm(initialForm);
      setErrorFecha("");
    }
  }, [open, corral, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fechaInstalacion") {
      const fechaSeleccionada = new Date(value);
      const ahora = new Date();

      if (value && fechaSeleccionada > ahora) {
        setErrorFecha("La fecha de instalación no puede ser futura.");
      } else {
        setErrorFecha("");
      }
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fechaInstalacion) {
      setErrorFecha("Debes ingresar la fecha de instalación.");
      return;
    }

    const fechaSeleccionada = new Date(form.fechaInstalacion);
    const ahora = new Date();

    if (fechaSeleccionada > ahora) {
      setErrorFecha("La fecha de instalación no puede ser futura.");
      return;
    }

    const payload = {
      ubicacion: form.ubicacion,
      fechaInstalacion: form.fechaInstalacion.replace("T", " "),
      tipo: form.tipo,
      observaciones: form.observaciones,
    };

    if (isEdit) {
      payload.codigo = form.codigo;
      payload.estado = form.estado;
    }

    onSave(payload);
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar Corral" : "Agregar Corral"}
      subtitle={
        isEdit
          ? "Edita los datos del corral"
          : "Ingresa los datos del nuevo corral"
      }
      maxWidth="max-w-[511px]"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {!isEdit && (
          <Field label="Código">
            <input
              type="text"
              value="Se generará automáticamente"
              disabled
              className="h-[43px] w-full cursor-not-allowed rounded-lg border border-[#D7E4E1] bg-[#EEF5F2] px-4 text-[13px] text-slate-500 outline-none shadow-sm"
            />
          </Field>
        )}

        <Field label="Ubicación">
          <input
            name="ubicacion"
            value={form.ubicacion}
            onChange={handleChange}
            placeholder="Zona sur de la playa"
            className={inputClass}
            required
          />
        </Field>

        <div>
          <DateTimeInput
            label="Fecha de instalación"
            name="fechaInstalacion"
            value={form.fechaInstalacion}
            onChange={handleChange}
            max={currentDateTime}
            required
          />

          {errorFecha && (
            <p className="mt-2 text-[12px] font-medium text-red-500">
              {errorFecha}
            </p>
          )}
        </div>

        <div
          className={`grid grid-cols-1 gap-7 ${isEdit ? "sm:grid-cols-2" : ""}`}
        >
          <Field label="Tipo de Corral">
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className={inputClass}
            >
              <option>Corral Abierto</option>
              <option>Corral Cerrado</option>
            </select>
          </Field>

          {isEdit && (
            <Field label="Estado del Corral">
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className={inputClass}
              >
                <option>Activo</option>
                <option>Cerrado</option>
                <option>En mantenimiento</option>
              </select>
            </Field>
          )}
        </div>

        <Field label="Observaciones">
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            placeholder="Comentarios sobre el corral..."
            className={textareaClass}
          />
        </Field>

        <ModalActions className="pt-3">
          <ModalButton variant="cancel" size="sm" onClick={onClose}>
            Cancelar
          </ModalButton>

          <ModalButton
            variant={isEdit ? "update" : "add"}
            size="sm"
            type="submit"
            disabled={Boolean(errorFecha)}
          >
            {isEdit ? "Modificar" : "Guardar"}
          </ModalButton>
        </ModalActions>
      </form>
    </BaseModal>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-semibold text-[#10231F]">
        {label}
      </span>

      {children}
    </label>
  );
}

export default CorralFormModal;
