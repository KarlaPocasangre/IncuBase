import {
  Binoculars,
  CalendarDays,
  CircleDot,
  ClipboardList,
  Egg,
  Fence,
  Grid2X2,
  MapPin,
  Ruler,
  Turtle,
  User,
} from "lucide-react";

import BaseModal from "../common/BaseModal";
import DetailSection from "../common/DetailSection";
import DetailRow from "../common/DetailRow";
import ModalActions from "../common/ModalActions";
import ModalButton from "../common/ModalButton";

function NidoDetailModal({ open, nido, onClose }) {
  if (!open || !nido) return null;

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Detalles del Nido"
      subtitle="Información general del nido registrado"
      maxWidth="max-w-[520px]"
    >
      <DetailSection className="space-y-4">
        <DetailRow
          icon={ClipboardList}
          label="Código"
          value={nido.codigoNido}
        />

        <DetailRow icon={Turtle} label="Especie" value={nido.especie} />

        <DetailRow
          icon={Egg}
          label="Cantidad de huevos"
          value={nido.cantidadHuevos}
        />

        <DetailRow icon={CircleDot} label="Estado" value={nido.estado} />

        <DetailRow icon={Fence} label="Corral" value={nido.corral} />

        <DetailRow icon={Grid2X2} label="Sector" value={nido.sector} />

        <DetailRow icon={MapPin} label="Ubicación" value={nido.ubicacion} />

        <DetailRow
          icon={CalendarDays}
          label="Fecha y hora de desove"
          value={nido.fechaDesove}
        />

        <DetailRow
          icon={CalendarDays}
          label="Fecha y hora de siembra"
          value={nido.fechaSiembra}
        />

        <DetailRow
          icon={Ruler}
          label="Profundidad del nido"
          value={
            nido.profundidadNido
              ? `${nido.profundidadNido} cm`
              : "No registrada"
          }
        />

        <DetailRow
          icon={Ruler}
          label="Largo del caparazón"
          value={
            nido.largoCaparazon ? `${nido.largoCaparazon} cm` : "No registrado"
          }
        />

        <DetailRow
          icon={Ruler}
          label="Ancho del caparazón"
          value={
            nido.anchoCaparazon ? `${nido.anchoCaparazon} cm` : "No registrado"
          }
        />

        <DetailRow
          icon={User}
          label="Registrado por"
          value={nido.registradoPor}
        />

        <div className="flex items-start gap-3">
          <Binoculars className="mt-[2px] h-[17px] w-[17px] shrink-0 text-[#79B49E]" />

          <div className="text-sm">
            <p className="font-semibold text-[#263D38]">Procedencia exacta:</p>
            <p className="mt-1 leading-relaxed text-slate-500">
              {nido.procedenciaExacta || "Sin procedencia registrada."}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Binoculars className="mt-[2px] h-[17px] w-[17px] shrink-0 text-[#79B49E]" />

          <div className="text-sm">
            <p className="font-semibold text-[#263D38]">Observaciones:</p>
            <p className="mt-1 leading-relaxed text-slate-500">
              {nido.observaciones || "Sin observaciones registradas."}
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

export default NidoDetailModal;
