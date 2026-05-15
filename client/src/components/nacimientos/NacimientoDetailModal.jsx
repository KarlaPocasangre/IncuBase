import {
  Baby,
  CalendarDays,
  ClipboardList,
  Skull,
  User,
  Waves,
} from "lucide-react";

import BaseModal from "../common/BaseModal";
import DetailSection from "../common/DetailSection";
import DetailRow from "../common/DetailRow";
import ModalActions from "../common/ModalActions";
import ModalButton from "../common/ModalButton";

function getValue(...values) {
  return values.find(
    (value) => value !== undefined && value !== null && value !== "",
  );
}

function NacimientoDetailModal({ open, nacimiento, item, onClose }) {
  const currentNacimiento = nacimiento || item;

  if (!open || !currentNacimiento) return null;

  const vivosFueraArena = getValue(
    currentNacimiento.vivosFueraArena,
    currentNacimiento.neonatosVivosFueraArena,
    0,
  );

  const muertosFueraArena = getValue(
    currentNacimiento.muertosFueraArena,
    currentNacimiento.neonatosMuertosFueraArena,
    0,
  );

  const vivosDentroArena = getValue(
    currentNacimiento.vivosDentroArena,
    currentNacimiento.neonatosVivosDentroArena,
    0,
  );

  const muertosDentroArena = getValue(
    currentNacimiento.muertosDentroArena,
    currentNacimiento.neonatosMuertosDentroArena,
    0,
  );

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Detalles del Nacimiento"
      subtitle="Información general del nacimiento"
      maxWidth="max-w-[540px]"
    >
      <div className="space-y-5">
        <DetailSection className="space-y-4">
          <DetailRow
            icon={ClipboardList}
            label="Nido"
            value={currentNacimiento.nido}
          />

          <DetailRow
            icon={CalendarDays}
            label="Fecha de eclosión"
            value={currentNacimiento.fechaEclosion}
          />

          <DetailRow
            icon={Waves}
            label="Condición de marea"
            value={currentNacimiento.marea}
          />
        </DetailSection>

        <DetailSection className="space-y-4">
          <DetailRow
            icon={Baby}
            label="Neonatos vivos fuera de arena"
            value={vivosFueraArena}
          />

          <DetailRow
            icon={Skull}
            label="Neonatos muertos fuera de arena"
            value={muertosFueraArena}
          />

          <DetailRow
            icon={Baby}
            label="Neonatos vivos dentro de arena"
            value={vivosDentroArena}
          />

          <DetailRow
            icon={Skull}
            label="Neonatos muertos dentro de arena"
            value={muertosDentroArena}
          />
        </DetailSection>

        <DetailSection className="space-y-4">
          <DetailRow
            icon={CalendarDays}
            label="Fecha y hora de liberación"
            value={currentNacimiento.fechaLiberacion}
          />

          <DetailRow
            icon={User}
            label="Responsable de liberación"
            value={
              currentNacimiento.responsableLiberacion ||
              currentNacimiento.responsable
            }
          />
        </DetailSection>

        <DetailSection className="space-y-4">
          <DetailRow
            icon={User}
            label="Registrado por"
            value={currentNacimiento.registradoPor}
          />

          <DetailRow
            icon={CalendarDays}
            label="Fecha del registro"
            value={currentNacimiento.fechaRegistro}
          />

          <div className="flex items-start gap-3">
            <ClipboardList className="mt-[2px] h-[17px] w-[17px] shrink-0 text-[#79B49E]" />

            <div className="text-sm">
              <p className="font-semibold text-[#263D38]">Observaciones:</p>
              <p className="mt-1 leading-relaxed text-slate-500">
                {currentNacimiento.observaciones ||
                  "Sin observaciones registradas."}
              </p>
            </div>
          </div>
        </DetailSection>
      </div>

      <ModalActions align="center" className="mt-7">
        <ModalButton variant="accept" size="sm" onClick={onClose}>
          Aceptar
        </ModalButton>
      </ModalActions>
    </BaseModal>
  );
}

export default NacimientoDetailModal;
