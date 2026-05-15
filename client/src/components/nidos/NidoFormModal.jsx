import { useEffect, useState } from "react";

import BaseModal from "../common/BaseModal";
import ModalActions from "../common/ModalActions";
import ModalButton from "../common/ModalButton";
import DateTimeInput from "../common/DateTimeInput";

function formatDateForInput(dateString) {
  if (!dateString) return "";
  return dateString.replace(" ", "T");
}

function formatDateForTable(dateString) {
  if (!dateString) return "";
  return dateString.replace("T", " ");
}

const initialForm = {
  codigoNido: "",
  especie: "Golfina",
  corral: "C2HJJ-09",
  sector: "A-01",
  ubicacion: "C2HJJ-09 / A-01",
  cantidadHuevos: "",
  estado: "Registrado",
  fechaDesove: "",
  fechaSiembra: "",
  profundidadNido: "",
  largoCaparazon: "",
  anchoCaparazon: "",
  procedenciaExacta: "",
  registradoPor: "",
  observaciones: "",
};

const inputClass =
  "h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 text-[13px] text-slate-600 outline-none shadow-sm transition focus:border-[#2F9A78] focus:ring-2 focus:ring-[#2F9A78]/20";

const disabledInputClass =
  "cursor-not-allowed border-[#D7E4E1] bg-slate-100 text-slate-500 opacity-80";

const textareaClass =
  "h-[104px] w-full resize-none rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] p-4 text-[13px] text-slate-600 outline-none shadow-sm transition placeholder:text-slate-400 focus:border-[#2F9A78] focus:ring-2 focus:ring-[#2F9A78]/20";

function NidoFormModal({ open, mode = "add", nido, onClose, onSave }) {
  const isEdit = mode === "edit";
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (open && nido && isEdit) {
      setForm({
        codigoNido: nido.codigoNido || "",
        especie: nido.especie || "Golfina",
        corral: nido.corral || "C2HJJ-09",
        sector: nido.sector || "A-01",
        ubicacion:
          nido.ubicacion || `${nido.corral || ""} / ${nido.sector || ""}`,
        cantidadHuevos: nido.cantidadHuevos || "",
        estado: nido.estado || "Registrado",
        fechaDesove: formatDateForInput(nido.fechaDesove),
        fechaSiembra: formatDateForInput(nido.fechaSiembra),
        profundidadNido: nido.profundidadNido || "",
        largoCaparazon: nido.largoCaparazon || "",
        anchoCaparazon: nido.anchoCaparazon || "",
        procedenciaExacta: nido.procedenciaExacta || "",
        registradoPor: nido.registradoPor || "",
        observaciones: nido.observaciones || "",
      });
    }

    if (open && !isEdit) {
      setForm(initialForm);
    }
  }, [open, nido, isEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => {
      const nextForm = {
        ...prev,
        [name]: value,
      };

      if (name === "corral" || name === "sector") {
        nextForm.ubicacion = `${nextForm.corral} / ${nextForm.sector}`;
      }

      return nextForm;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave({
      ...nido,
      ...form,
      id: nido?.id || Date.now(),
      ubicacion: `${form.corral} / ${form.sector}`,
      cantidadHuevos: Number(form.cantidadHuevos),
      profundidadNido: Number(form.profundidadNido),
      largoCaparazon: form.largoCaparazon ? Number(form.largoCaparazon) : "",
      anchoCaparazon: form.anchoCaparazon ? Number(form.anchoCaparazon) : "",
      fechaDesove: formatDateForTable(form.fechaDesove),
      fechaSiembra: formatDateForTable(form.fechaSiembra),
    });
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar Nido" : "Agregar Nido"}
      subtitle={
        isEdit
          ? "Edita los datos generales del nido"
          : "Ingresa los datos del nuevo nido"
      }
      maxWidth="max-w-[680px]"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Código del nido">
            <input
              name="codigoNido"
              value={form.codigoNido}
              onChange={handleChange}
              placeholder="Ej: NID-001"
              className={`${inputClass} ${isEdit ? disabledInputClass : ""}`}
              disabled={isEdit}
              required
            />
          </Field>

          <Field label="Especie">
            <select
              name="especie"
              value={form.especie}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option>Golfina</option>
              <option>Carey</option>
              <option>Baula</option>
              <option>Prieta</option>
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Field label="Corral">
            <select
              name="corral"
              value={form.corral}
              onChange={handleChange}
              className={`${inputClass} ${isEdit ? disabledInputClass : ""}`}
              disabled={isEdit}
              required
            >
              <option>C2HJJ-09</option>
              <option>C2HJJ-10</option>
              <option>C2HJJ-11</option>
              <option>C2HJJ-12</option>
            </select>
          </Field>

          <Field label="Sector">
            <input
              name="sector"
              value={form.sector}
              onChange={handleChange}
              placeholder="Ej: A-03"
              className={`${inputClass} ${isEdit ? disabledInputClass : ""}`}
              disabled={isEdit}
              required
            />
          </Field>

          <Field label="Cantidad de huevos">
            <input
              type="number"
              min="1"
              name="cantidadHuevos"
              value={form.cantidadHuevos}
              onChange={handleChange}
              placeholder="Ej: 85"
              className={inputClass}
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <DateTimeInput
            label="Fecha y hora de desove"
            name="fechaDesove"
            value={form.fechaDesove}
            onChange={handleChange}
            required
          />

          <DateTimeInput
            label="Fecha y hora de siembra"
            name="fechaSiembra"
            value={form.fechaSiembra}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
          <Field label="Estado">
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option>Registrado</option>
              <option>En incubación</option>
              <option>Próximo a eclosión</option>
              <option>Eclosionado</option>
              <option>Exhumado</option>
            </select>
          </Field>

          <Field label="Profundidad">
            <input
              type="number"
              min="1"
              step="0.01"
              name="profundidadNido"
              value={form.profundidadNido}
              onChange={handleChange}
              placeholder="cm"
              className={inputClass}
              required
            />
          </Field>

          <Field label="Largo caparazón">
            <input
              type="number"
              min="1"
              step="0.01"
              name="largoCaparazon"
              value={form.largoCaparazon}
              onChange={handleChange}
              placeholder="cm"
              className={inputClass}
            />
          </Field>

          <Field label="Ancho caparazón">
            <input
              type="number"
              min="1"
              step="0.01"
              name="anchoCaparazon"
              value={form.anchoCaparazon}
              onChange={handleChange}
              placeholder="cm"
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Registrado por">
          <input
            name="registradoPor"
            value={form.registradoPor}
            placeholder="Usuario en sesión"
            className={`${inputClass} ${disabledInputClass}`}
            disabled
          />
        </Field>

        <Field label="Procedencia exacta">
          <textarea
            name="procedenciaExacta"
            value={form.procedenciaExacta}
            onChange={handleChange}
            placeholder="Describe el punto exacto de procedencia del nido..."
            className={textareaClass}
          />
        </Field>

        <Field label="Observaciones">
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            placeholder="Comentarios adicionales sobre el nido..."
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

export default NidoFormModal;
