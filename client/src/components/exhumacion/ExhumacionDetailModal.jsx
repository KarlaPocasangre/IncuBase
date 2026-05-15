import {
  AlertTriangle,
  CalendarDays,
  ClipboardList,
  FileText,
  Skull,
  User,
  BarChart3,
  CircleAlert,
} from "lucide-react";

import BaseModal from "../common/BaseModal";
import DetailSection from "../common/DetailSection";
import DetailRow from "../common/DetailRow";
import ModalActions from "../common/ModalActions";
import ModalButton from "../common/ModalButton";

function getValue(value, fallback = "No registrado") {
  return value !== undefined && value !== null && value !== ""
    ? value
    : fallback;
}

function ExhumacionDetailModal({ open, exhumacion, item, onClose }) {
  const currentExhumacion = exhumacion || item;

  if (!open || !currentExhumacion) return null;

  const evidenciaDepredacion =
    currentExhumacion.evidenciaDepredacion ??
    currentExhumacion.tieneDepredacion ??
    currentExhumacion.depredacion !== "Sin depredación";

  const tipoDepredador = evidenciaDepredacion
    ? getValue(
        currentExhumacion.tipoDepredador || currentExhumacion.depredacion,
      )
    : "Sin depredación";

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Detalles de Exhumación"
      subtitle="Información general de la exhumación"
      maxWidth="max-w-[540px]"
    >
      <div className="space-y-5">
        <DetailSection className="space-y-4">
          <DetailRow
            icon={ClipboardList}
            label="Nido"
            value={getValue(currentExhumacion.nido)}
          />

          <DetailRow
            icon={CalendarDays}
            label="Fecha de Exhumación"
            value={getValue(currentExhumacion.fechaExhumacion)}
          />

          <DetailRow
            icon={User}
            label="Responsable"
            value={getValue(currentExhumacion.responsable)}
          />
        </DetailSection>

        <DetailSection className="space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-[18px] w-[18px] text-[#79B49E]" />
            <h3 className="text-base font-bold text-[#10231F]">Resultados</h3>
          </div>

          <ResultRow
            label="Cascarones Eclosionados"
            value={getValue(currentExhumacion.eclosionados)}
          />

          <ResultRow
            label="Huevos sin embrión"
            value={getValue(currentExhumacion.huevosSinEmbrion)}
          />

          <ResultRow
            label="Embriones muertos"
            value={getValue(currentExhumacion.embrionesMuertos)}
          />

          <ResultRow
            label="Huevos no Eclosionados"
            value={getValue(currentExhumacion.noEclosionados)}
          />

          <ResultRow
            label="Neonatos muertos en nido"
            value={getValue(currentExhumacion.neonatosMuertosEnNido)}
          />
        </DetailSection>

        <DetailSection className="space-y-4">
          <DetailRow
            icon={AlertTriangle}
            label="Evidencia de Depredación"
            value={evidenciaDepredacion ? "Sí" : "No"}
          />

          <DetailRow
            icon={CircleAlert}
            label="Tipo de Depredador"
            value={tipoDepredador}
          />
        </DetailSection>

        <DetailSection className="space-y-4">
          <DetailRow
            icon={CalendarDays}
            label="Fecha del registro"
            value={getValue(currentExhumacion.fechaRegistro)}
          />

          <div className="flex items-start gap-3">
            <FileText className="mt-[2px] h-[17px] w-[17px] shrink-0 text-[#79B49E]" />

            <div className="text-sm">
              <p className="font-semibold text-[#263D38]">Observaciones:</p>
              <p className="mt-1 leading-relaxed text-slate-500">
                {currentExhumacion.observaciones ||
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

function ResultRow({ label, value }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-[#10231F]">•</span>
      <p className="font-semibold text-[#10231F]">
        {label}:{" "}
        <span className="ml-2 font-normal text-slate-500">{value}</span>
      </p>
    </div>
  );
}

export default ExhumacionDetailModal;
