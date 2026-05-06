import {
  X,
  ClipboardList,
  MapPin,
  CircleDot,
  Fence,
  CalendarDays,
  User,
  Binoculars,
} from "lucide-react";

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={17} className="mt-[2px] shrink-0 text-[#79B49E]" />
      <div className="flex gap-2 text-sm">
        <span className="font-semibold text-[#263D38]">{label}:</span>
        <span className="text-slate-500">{value || "—"}</span>
      </div>
    </div>
  );
}

function CorralDetailModal({ open, corral, onClose }) {
  if (!open || !corral) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
      <div className="w-full max-w-[460px] rounded-xl bg-[#F5FAF8] p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold text-[#10231F]">
              Detalles del Corral
            </h2>
            <p className="text-sm text-slate-500">
              Información general del corral
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 rounded-lg border border-[#D6E1DE] bg-[#F8FCFA] p-4 shadow-sm">
          <div className="space-y-4">
            <DetailRow icon={ClipboardList} label="Código" value={corral.codigo} />
            <DetailRow icon={MapPin} label="Ubicación" value={corral.ubicacion} />
            <DetailRow icon={CircleDot} label="Estado" value={corral.estado} />
            <DetailRow icon={Fence} label="Tipo de corral" value={corral.tipo} />
            <DetailRow
              icon={CalendarDays}
              label="Fecha de instalación"
              value={corral.fechaInstalacion}
            />
            <DetailRow icon={User} label="Creado por" value={corral.creadoPor} />
            <DetailRow
              icon={CalendarDays}
              label="Fecha de creación"
              value={corral.fechaCreacion}
            />

            <div className="flex items-start gap-3">
              <Binoculars size={17} className="mt-[2px] shrink-0 text-[#79B49E]" />
              <div className="text-sm">
                <p className="font-semibold text-[#263D38]">Observaciones:</p>
                <p className="mt-1 leading-relaxed text-slate-500">
                  {corral.observaciones || "Sin observaciones registradas."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#00683D] px-5 py-2 text-sm font-semibold text-white hover:bg-[#6AA88F]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CorralDetailModal;