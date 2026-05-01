import { useRef } from "react";
import { X, Calendar } from "lucide-react";

function formatDateForInput(dateString) {
  if (!dateString) return "";

  const [date, time] = dateString.split(" ");
  return `${date}T${time}`;
}

function EditCorralModal({ open, corral, onClose, onSave }) {
    const inputRef = useRef();
  if (!open || !corral) return null;

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
            Editar Corral
          </h2>
          <p className="mt-1 text-[14px] text-slate-500">
            Edita los datos del corral
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#10231F]">
              Ubicacion
            </label>
            <input
              defaultValue="Zona sur de la playa"
              className="h-[43px] w-full rounded-lg border border-[#2F9A78] bg-[#F8FCFA] px-4 text-[13px] text-slate-600 outline-none shadow-sm focus:ring-2 focus:ring-[#2F9A78]/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#10231F]">
              Fecha de instalacion
            </label>

            <div className="relative">
                <input
                    ref={inputRef}
                    type="datetime-local"
                    defaultValue={formatDateForInput(corral.fecha)}
                    className="h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 pr-10 text-[13px] text-slate-500 outline-none shadow-sm"
                />

                <Calendar
                    size={17}
                    onClick={() => inputRef.current.showPicker()}
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
                defaultValue="Corral Abierto"
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
                defaultValue="En mantenimiento"
                className="h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 text-[13px] text-slate-600 outline-none shadow-sm"
              >
                <option>Activo</option>
                <option>Cerrado</option>
                <option>En mantenimiento</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-semibold text-[#10231F]">
              Observaciones
            </label>
            <textarea
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
              className="h-[38px] rounded-lg bg-[#7BBFA8] px-8 text-[13px] font-bold text-white hover:bg-[#68AD96]"
            >
              Modificar
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
}

export default EditCorralModal;