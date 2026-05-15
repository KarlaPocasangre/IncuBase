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
  fechaEclosion: "",
  fechaLiberacion: "",
  responsable: "",
  marea: "Marea Alta",
  vivosFueraArena: "",
  muertosFueraArena: "",
  vivosDentroArena: "",
  muertosDentroArena: "",
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

function NacimientoFormModal({
  open,
  mode = "add",
  nacimiento,
  item,
  onClose,
  onSave,
}) {
  const currentNacimiento = nacimiento || item;
  const isEdit = mode === "edit";

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (open && currentNacimiento && isEdit) {
      setForm({
        nido: currentNacimiento.nido || "",
        fechaEclosion: formatDateForInput(currentNacimiento.fechaEclosion),
        fechaLiberacion: formatDateForInput(currentNacimiento.fechaLiberacion),
        responsable:
          currentNacimiento.responsableLiberacion ||
          currentNacimiento.responsable ||
          "",
        marea: currentNacimiento.marea || "Marea Alta",
        vivosFueraArena:
          currentNacimiento.vivosFueraArena ??
          currentNacimiento.neonatosVivosFueraArena ??
          "",
        muertosFueraArena:
          currentNacimiento.muertosFueraArena ??
          currentNacimiento.neonatosMuertosFueraArena ??
          "",
        vivosDentroArena:
          currentNacimiento.vivosDentroArena ??
          currentNacimiento.neonatosVivosDentroArena ??
          "",
        muertosDentroArena:
          currentNacimiento.muertosDentroArena ??
          currentNacimiento.neonatosMuertosDentroArena ??
          "",
        observaciones: currentNacimiento.observaciones || "",
      });
    }

    if (open && !isEdit) {
      setForm(initialForm);
    }
  }, [open, currentNacimiento, isEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    const vivos =
      Number(form.vivosFueraArena || 0) + Number(form.vivosDentroArena || 0);

    const muertos =
      Number(form.muertosFueraArena || 0) +
      Number(form.muertosDentroArena || 0);

    onSave({
      ...currentNacimiento,
      ...form,
      id: currentNacimiento?.id || Date.now(),
      nido: form.nido,
      fechaEclosion: formatDateForTable(form.fechaEclosion),
      fechaLiberacion: formatDateForTable(form.fechaLiberacion),
      responsable: form.responsable,
      responsableLiberacion: form.responsable,
      marea: form.marea,

      vivos,
      muertos,

      vivosFueraArena: Number(form.vivosFueraArena || 0),
      muertosFueraArena: Number(form.muertosFueraArena || 0),
      vivosDentroArena: Number(form.vivosDentroArena || 0),
      muertosDentroArena: Number(form.muertosDentroArena || 0),

      neonatosVivosFueraArena: Number(form.vivosFueraArena || 0),
      neonatosMuertosFueraArena: Number(form.muertosFueraArena || 0),
      neonatosVivosDentroArena: Number(form.vivosDentroArena || 0),
      neonatosMuertosDentroArena: Number(form.muertosDentroArena || 0),
    });
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar Nacimiento" : "Registrar Nacimiento"}
      subtitle={
        isEdit
          ? "Editar los datos del nacimiento"
          : "Ingresa los datos del nacimiento"
      }
      maxWidth="max-w-[540px]"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DateTimeInput
            label="Fecha de eclosión"
            name="fechaEclosion"
            value={form.fechaEclosion}
            onChange={handleChange}
            required
          />

          <DateTimeInput
            label="Fecha de liberación"
            name="fechaLiberacion"
            value={form.fechaLiberacion}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_170px]">
          <Field label="Responsable de liberación">
            <input
              name="responsable"
              value={form.responsable}
              onChange={handleChange}
              placeholder="Nombre del responsable"
              className={inputClass}
              required
            />
          </Field>

          <Field label="Condición de marea">
            <select
              name="marea"
              value={form.marea}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option>Marea Alta</option>
              <option>Marea Media</option>
              <option>Marea Baja</option>
            </select>
          </Field>
        </div>

        {isEdit && (
          <Field label="Nido">
            <input
              name="nido"
              value={form.nido}
              className={`${inputClass} ${disabledInputClass}`}
              disabled
            />
          </Field>
        )}

        {!isEdit && (
          <Field label="Nido">
            <input
              name="nido"
              value={form.nido}
              onChange={handleChange}
              placeholder="Código del nido"
              className={inputClass}
              required
            />
          </Field>
        )}

        <section className="rounded-xl border border-[#DDEBE7] bg-[#F8FCFA] p-4">
          <NumberRow
            label="Neonatos vivos fuera de la arena:"
            name="vivosFueraArena"
            value={form.vivosFueraArena}
            onChange={handleNumberChange}
          />

          <NumberRow
            label="Neonatos muertos fuera de la arena:"
            name="muertosFueraArena"
            value={form.muertosFueraArena}
            onChange={handleNumberChange}
          />

          <NumberRow
            label="Neonatos vivos dentro de la arena:"
            name="vivosDentroArena"
            value={form.vivosDentroArena}
            onChange={handleNumberChange}
          />

          <NumberRow
            label="Neonatos muertos dentro de la arena:"
            name="muertosDentroArena"
            value={form.muertosDentroArena}
            onChange={handleNumberChange}
          />
        </section>

        <Field label="Observaciones">
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            placeholder="Comentarios adicionales sobre el nacimiento..."
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

export default NacimientoFormModal;
