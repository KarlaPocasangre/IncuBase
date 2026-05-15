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
  nido: "",
  fechaExhumacion: "",
  responsable: "",
  eclosionados: "",
  huevosSinEmbrion: "",
  embrionesMuertos: "",
  noEclosionados: "",
  neonatosMuertosEnNido: "",
  evidenciaDepredacion: false,
  tipoDepredador: "Sin depredación",
  observaciones: "",
};

const inputClass =
  "h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 text-[13px] text-slate-600 outline-none shadow-sm transition focus:border-[#2F9A78] focus:ring-2 focus:ring-[#2F9A78]/20";

const disabledInputClass =
  "cursor-not-allowed border-[#D7E4E1] bg-slate-100 text-slate-500 opacity-80";

const numberInputClass =
  "h-12 w-[58px] rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-2 text-center text-[13px] text-slate-600 outline-none shadow-sm transition focus:border-[#2F9A78] focus:ring-2 focus:ring-[#2F9A78]/20";

const textareaClass =
  "h-[118px] w-full resize-none rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] p-4 text-[13px] text-slate-600 outline-none shadow-sm transition placeholder:text-slate-400 focus:border-[#2F9A78] focus:ring-2 focus:ring-[#2F9A78]/20";

function ExhumacionFormModal({
  open,
  mode = "add",
  exhumacion,
  item,
  onClose,
  onSave,
}) {
  const currentExhumacion = exhumacion || item;
  const isEdit = mode === "edit";

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (open && currentExhumacion && isEdit) {
      const depredacion =
        currentExhumacion.depredacion ||
        currentExhumacion.tipoDepredador ||
        "Sin depredación";

      setForm({
        nido: currentExhumacion.nido || "",
        fechaExhumacion: formatDateForInput(currentExhumacion.fechaExhumacion),
        responsable: currentExhumacion.responsable || "",
        eclosionados: currentExhumacion.eclosionados || "",
        huevosSinEmbrion: currentExhumacion.huevosSinEmbrion || "",
        embrionesMuertos: currentExhumacion.embrionesMuertos || "",
        noEclosionados: currentExhumacion.noEclosionados || "",
        neonatosMuertosEnNido: currentExhumacion.neonatosMuertosEnNido || "",
        evidenciaDepredacion:
          currentExhumacion.evidenciaDepredacion ??
          depredacion !== "Sin depredación",
        tipoDepredador: depredacion,
        observaciones: currentExhumacion.observaciones || "",
      });
    }

    if (open && !isEdit) {
      setForm(initialForm);
    }
  }, [open, currentExhumacion, isEdit]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => {
      const nextForm = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "evidenciaDepredacion" && !checked) {
        nextForm.tipoDepredador = "Sin depredación";
      }

      if (name === "tipoDepredador" && value !== "Sin depredación") {
        nextForm.evidenciaDepredacion = true;
      }

      if (name === "tipoDepredador" && value === "Sin depredación") {
        nextForm.evidenciaDepredacion = false;
      }

      return nextForm;
    });
  };

  const handleNumberChange = (event) => {
    const { name, value } = event.target;

    if (Number(value) < 0) return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const tipoDepredador = form.evidenciaDepredacion
      ? form.tipoDepredador
      : "Sin depredación";

    onSave({
      ...currentExhumacion,
      ...form,
      id: currentExhumacion?.id || Date.now(),
      nido: form.nido,
      fechaExhumacion: formatDateForTable(form.fechaExhumacion),
      responsable: form.responsable,

      eclosionados: Number(form.eclosionados || 0),
      huevosSinEmbrion: Number(form.huevosSinEmbrion || 0),
      embrionesMuertos: Number(form.embrionesMuertos || 0),
      noEclosionados: Number(form.noEclosionados || 0),
      neonatosMuertosEnNido: Number(form.neonatosMuertosEnNido || 0),

      evidenciaDepredacion: form.evidenciaDepredacion,
      tipoDepredador,
      depredacion: tipoDepredador,
    });
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar Exhumación" : "Registrar Exhumación"}
      subtitle={
        isEdit
          ? "Edita los datos generales de la exhumación"
          : "Ingresa los datos de la exhumación"
      }
      maxWidth="max-w-[560px]"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nido">
            <input
              name="nido"
              value={form.nido}
              onChange={handleChange}
              placeholder="Código del nido"
              className={`${inputClass} ${isEdit ? disabledInputClass : ""}`}
              disabled={isEdit}
              required
            />
          </Field>

          <DateTimeInput
            label="Fecha de exhumación"
            name="fechaExhumacion"
            value={form.fechaExhumacion}
            onChange={handleChange}
            required
          />
        </div>

        <Field label="Responsable">
          <input
            name="responsable"
            value={form.responsable}
            onChange={handleChange}
            placeholder="Nombre del responsable"
            className={inputClass}
            required
          />
        </Field>

        <section className="rounded-xl border border-[#DDEBE7] bg-[#F8FCFA] p-4">
          <NumberRow
            label="Cascarones eclosionados:"
            name="eclosionados"
            value={form.eclosionados}
            onChange={handleNumberChange}
          />

          <NumberRow
            label="Huevos sin embrión:"
            name="huevosSinEmbrion"
            value={form.huevosSinEmbrion}
            onChange={handleNumberChange}
          />

          <NumberRow
            label="Embriones muertos:"
            name="embrionesMuertos"
            value={form.embrionesMuertos}
            onChange={handleNumberChange}
          />

          <NumberRow
            label="Huevos no eclosionados:"
            name="noEclosionados"
            value={form.noEclosionados}
            onChange={handleNumberChange}
          />

          <NumberRow
            label="Neonatos muertos en nido:"
            name="neonatosMuertosEnNido"
            value={form.neonatosMuertosEnNido}
            onChange={handleNumberChange}
          />
        </section>

        <section className="rounded-xl border border-[#DDEBE7] bg-[#F8FCFA] p-4">
          <label className="flex items-center justify-between gap-4">
            <span className="text-[13px] font-semibold text-[#10231F]">
              Evidencia de depredación
            </span>

            <input
              type="checkbox"
              name="evidenciaDepredacion"
              checked={form.evidenciaDepredacion}
              onChange={handleChange}
              className="h-4 w-4 accent-[#0F6B3D]"
            />
          </label>

          <div className="mt-4">
            <Field label="Tipo de depredador">
              <select
                name="tipoDepredador"
                value={form.tipoDepredador}
                onChange={handleChange}
                className={inputClass}
                disabled={!form.evidenciaDepredacion}
              >
                <option>Sin depredación</option>
                <option>Cangrejo</option>
                <option>Perro</option>
                <option>Hormigas</option>
                <option>Larvas</option>
                <option>Aves</option>
              </select>
            </Field>
          </div>
        </section>

        <Field label="Observaciones">
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            placeholder="Comentarios adicionales sobre la exhumación..."
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
            {isEdit ? "Actualizar Registro" : "Guardar Registro"}
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

function NumberRow({ label, name, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-[13px] font-semibold text-[#10231F]">{label}</span>

      <input
        type="number"
        min="0"
        name={name}
        value={value}
        onChange={onChange}
        className={numberInputClass}
        required
      />
    </div>
  );
}

export default ExhumacionFormModal;
