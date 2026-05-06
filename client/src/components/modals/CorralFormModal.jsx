import { useEffect, useRef, useState } from "react";
import { X, Calendar } from "lucide-react";

function formatDateForInput(dateString) {
  if (!dateString) return "";
  return dateString.replace(" ", "T");
}

const initialForm = {
  codigo: "",
  ubicacion: "",
  fechaInstalacion: "",
  tipo: "Corral Abierto",
  estado: "Activo",
  observaciones: "",
};

function CorralFormModal({ open, mode = "add", corral, onClose, onSave }) {
  const inputRef = useRef(null);
  const isEdit = mode === "edit";

  const [form, setForm] = useState(initialForm);

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
    }

    if (open && !isEdit) {
      setForm(initialForm);
    }
  }, [open, corral, isEdit]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...form,
      fechaInstalacion: form.fechaInstalacion.replace("T", " "),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="relative w-full max-w-[511px] rounded-xl bg-[#F5FAF8] px-8 py-7 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-[#344B47] hover:text-black"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <h2 className="text-[18px] font-bold text-[#10231F]">
            {isEdit ? "Editar Corral" : "Agregar Corral"}
          </h2>
          <p className="mt-1 text-[14px] text-slate-500">
            {isEdit
              ? "Edita los datos del corral"
              : "Ingresa los datos del nuevo corral"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isEdit && (
            <div>
              <label className="mb-2 block text-[13px] font-semibold text-[#10231F]">
                Código
              </label>
              <input
                name="codigo"
                value={form.codigo}
                onChange={handleChange}
                placeholder="Ej: C2HJJ-09"
                className="h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 text-[13px] text-slate-600 outline-none shadow-sm focus:ring-2 focus:ring-[#2F9A78]/20"
                required
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#10231F]">
              Ubicación
            </label>
            <input
              name="ubicacion"
              value={form.ubicacion}
              onChange={handleChange}
              placeholder="Zona sur de la playa"
              className="h-[43px] w-full rounded-lg border border-[#2F9A78] bg-[#F8FCFA] px-4 text-[13px] text-slate-600 outline-none shadow-sm focus:ring-2 focus:ring-[#2F9A78]/20"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#10231F]">
              Fecha de instalación
            </label>

            <div className="relative">
              <input
                ref={inputRef}
                name="fechaInstalacion"
                type="datetime-local"
                value={form.fechaInstalacion}
                onChange={handleChange}
                className="h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 pr-10 text-[13px] text-slate-500 outline-none shadow-sm"
                required
              />

              <Calendar
                size={17}
                onClick={() => inputRef.current?.showPicker()}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 hover:text-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-7">
            <div>
              <label className="mb-2 block text-[13px] font-semibold text-[#10231F]">
                Tipo de Corral
              </label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 text-[13px] text-slate-600 outline-none shadow-sm"
              >
                <option>Corral Abierto</option>
                <option>Corral Cerrado</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-[13px] font-semibold text-[#10231F]">
                Estado del Corral
              </label>
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className="h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 text-[13px] text-slate-600 outline-none shadow-sm"
              >
                <option>Activo</option>
                <option>Cerrado</option>
                <option>Mantenimiento</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#10231F]">
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={form.observaciones}
              onChange={handleChange}
              placeholder="Comentarios sobre el corral..."
              className="h-[104px] w-full resize-none rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] p-4 text-[13px] text-slate-600 outline-none shadow-sm"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="h-[38px] rounded-lg border border-[#CFE0DC] bg-white px-5 text-[13px] text-[#344B47] hover:bg-slate-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="h-[38px] rounded-lg bg-[#00683D] px-8 text-[13px] font-bold text-white hover:bg-[#68AD96]"
            >
              {isEdit ? "Modificar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CorralFormModal;