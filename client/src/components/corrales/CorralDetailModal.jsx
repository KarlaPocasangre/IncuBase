import {
  ClipboardList,
  MapPin,
  CircleDot,
  Fence,
  CalendarDays,
  User,
  Binoculars,
} from "lucide-react";

import BaseModal from "../common/BaseModal";
import DetailSection from "../common/DetailSection";
import DetailRow from "../common/DetailRow";
import ModalActions from "../common/ModalActions";
import ModalButton from "../common/ModalButton";

function CorralDetailModal({ open, corral, onClose }) {
  if (!open || !corral) return null;

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Detalles del Corral"
      subtitle="Información general del corral"
      maxWidth="max-w-[460px]"
    >
      <DetailSection className="space-y-4">
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
          <Binoculars className="mt-[2px] h-[17px] w-[17px] shrink-0 text-[#79B49E]" />

          <div className="text-sm">
            <p className="font-semibold text-[#263D38]">Observaciones:</p>
            <p className="mt-1 leading-relaxed text-slate-500">
              {corral.observaciones || "Sin observaciones registradas."}
            </p>
          </div>
        </div>
      </DetailSection>

      <ModalActions align="center" className="mt-6">
        <ModalButton variant="accept" size="sm" onClick={onClose}>
          Aceptar
        </ModalButton>
      </ModalActions>
    </BaseModal>
  );
}

export default CorralDetailModal;
