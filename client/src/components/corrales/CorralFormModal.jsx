import { useEffect, useState } from "react";

import BaseModal from "../common/BaseModal";
import ModalActions from "../common/ModalActions";
import ModalButton from "../common/ModalButton";
import DateTimeInput from "../common/DateTimeInput";

function formatDateForInput(dateString) {
  if (!dateString) return "";

  if (dateString.includes("T")) {
    return dateString.slice(0, 16);
  }

  return dateString.replace(" ", "T").slice(0, 16);
}

const initialForm = {
  id: "",
  codigo: "",
  ubicacion: "",
  fechaInstalacion: "",
  idTipoCorral: "",
  idEstadoCorral: "",
  observaciones: "",
};

const inputClass =
  "h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 text-[13px] text-slate-600 outline-none shadow-sm transition focus:border-[#2F9A78] focus:ring-2 focus:ring-[#2F9A78]/20";

const textareaClass =
  "h-[104px] w-full resize-none rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] p-4 text-[13px] text-slate-600 outline-none shadow-sm transition placeholder:text-slate-400 focus:border-[#2F9A78] focus:ring-2 focus:ring-[#2F9A78]/20";

function CorralFormModal({
  open,
  mode = "add",
  corral,
  catalogos,
  onClose,
  onSave,
}) {
  const isEdit = mode === "edit";
  const [form, setForm] = useState(initialForm);

  const tiposCorral = catalogos?.tiposCorral || [];
  const estadosCorral = catalogos?.estadosCorral || [];

  useEffect(() => {
    if (open && corral && isEdit) {
      setForm({
        id: corral.id || "",
        codigo: corral.codigo || "",
        ubicacion: corral.ubicacion || "",
        fechaInstalacion: formatDateForInput(corral.fechaInstalacion),
        idTipoCorral: corral.idTipoCorral || "",
        idEstadoCorral: corral.idEstadoCorral || "",
        observaciones: corral.observaciones || "",
      });
      return;
    }

    if (open && !isEdit) {
      setForm({
        ...initialForm,
        idTipoCorral: tiposCorral[0]?.id_tipo_corral || "",
        idEstadoCorral: estadosCorral[0]?.id_estado_corral || "",
      });
    }
  }, [open, corral, isEdit, tiposCorral, estadosCorral]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: form.id,
      ubicacion: form.ubicacion,
      fechaInstalacion: form.fechaInstalacion,
      idTipoCorral: Number(form.idTipoCorral),
      idEstadoCorral: Number(form.idEstadoCorral),
      observaciones: form.observaciones,
    };

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
        <Field label="Código">
          <input
            type="text"
            value={isEdit ? form.codigo : "Se generará automáticamente"}
            disabled
            className="h-[43px] w-full cursor-not-allowed rounded-lg border border-[#D7E4E1] bg-[#EEF5F2] px-4 text-[13px] text-slate-500 outline-none shadow-sm"
          />
        </Field>

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

        <DateTimeInput
          label="Fecha de instalación"
          name="fechaInstalacion"
          value={form.fechaInstalacion}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          <Field label="Tipo de Corral">
            <select
              name="idTipoCorral"
              value={form.idTipoCorral}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Seleccione</option>

              {tiposCorral.map((tipo) => (
                <option key={tipo.id_tipo_corral} value={tipo.id_tipo_corral}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Estado del Corral">
            <select
              name="idEstadoCorral"
              value={form.idEstadoCorral}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Seleccione</option>

              {estadosCorral.map((estado) => (
                <option
                  key={estado.id_estado_corral}
                  value={estado.id_estado_corral}
                >
                  {estado.nombre}
                </option>
              ))}
            </select>
          </Field>
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