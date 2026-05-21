import {
  CalendarDays,
  CircleDot,
  Mail,
  Phone,
  ShieldCheck,
  User,
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

function UsuarioDetailModal({ open, usuario, item, onClose }) {
  const currentUsuario = usuario || item;

  if (!open || !currentUsuario) return null;

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Detalles del Usuario"
      subtitle="Información general del usuario seleccionado"
      maxWidth="max-w-[480px]"
    >
      <DetailSection className="space-y-4">
        <DetailRow
          icon={User}
          label="Nombre"
          value={getValue(currentUsuario.nombreCompleto)}
        />

        <DetailRow
          icon={Mail}
          label="Correo"
          value={getValue(currentUsuario.email)}
        />

        <DetailRow
          icon={Phone}
          label="Teléfono"
          value={getValue(currentUsuario.telefono)}
        />

        <DetailRow
          icon={ShieldCheck}
          label="Rol"
          value={getValue(currentUsuario.rol)}
        />

        <DetailRow
          icon={CircleDot}
          label="Estado"
          value={getValue(currentUsuario.estado)}
        />

        <DetailRow
          icon={CalendarDays}
          label="Fecha de creación"
          value={getValue(currentUsuario.fechaCreacion)}
        />
      </DetailSection>

      <ModalActions align="center" className="mt-6">
        <ModalButton variant="accept" size="sm" onClick={onClose}>
          Aceptar
        </ModalButton>
      </ModalActions>
    </BaseModal>
  );
}

export default UsuarioDetailModal;
