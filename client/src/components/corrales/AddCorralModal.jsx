import { useState } from "react";
import { X } from "lucide-react";

function AddCorralModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    codigo: "",
    ubicacion: "",
    tipo: "Corral Abierto",
    estado: "Activo",
    fecha: "",
    observaciones: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...form,
      fecha: form.fecha.replace("T", " "),
      creadoPor: "Juan Perez",
      fechaCreacion: new Date().toISOString().slice(0, 16).replace("T", " "),
    });

    setForm({
      codigo: "",
      ubicacion: "",
      tipo: "Corral Abierto",
      estado: "Activo",
      fecha: "",
      observaciones: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35">
      <div className="relative w-[511px] rounded-xl bg-[#F5FAF8] px-8 py-7 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-[#344B47] hover:text-black"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <h2 className="text-[18px] font-bold text-[#10231F]">
            Agregar Corral
          </h2>
          <p className="mt-1 text-[14px] text-slate-500">
            Ingresa los datos del nuevo corral
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            placeholder="Código del corral"
            required
            className="h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 text-[13px] outline-none"
          />

          <input
            name="ubicacion"
            value={form.ubicacion}
            onChange={handleChange}
            placeholder="Ubicación"
            required
            className="h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 text-[13px] outline-none"
          />

          <input
            name="fecha"
            type="datetime-local"
            value={form.fecha}
            onChange={handleChange}
            required
            className="h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 text-[13px] outline-none"
          />

          <div className="grid grid-cols-2 gap-7">
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="h-[43px] rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 text-[13px]"
            >
              <option>Corral Abierto</option>
              <option>Corral Cerrado</option>
            </select>

            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="h-[43px] rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 text-[13px]"
            >
              <option>Activo</option>
              <option>Cerrado</option>
              <option>En mantenimiento</option>
            </select>
          </div>

          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            placeholder="Observaciones..."
            className="h-[104px] w-full resize-none rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] p-4 text-[13px] outline-none"
          />

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="h-[38px] rounded-lg border border-[#CFE0DC] bg-white px-5 text-[13px]"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="h-[38px] rounded-lg bg-[#00683D] px-8 text-[13px] font-bold text-white hover:bg-[#68AD96]"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCorralModal;