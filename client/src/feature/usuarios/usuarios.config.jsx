import {
  FileSearch,
  Pencil,
  ShieldCheck,
  UserCog,
  UserRoundPlus,
  UserRoundX,
  Users,
} from "lucide-react";

import UsuarioFormModal from "../../components/usuarios/UsuarioFormModal";
import UsuarioDetailModal from "../../components/usuarios/UsuarioDetailModal";

const roleStyles = {
  Administrador: "border-red-300 bg-red-50 text-red-500",
  Tecnico: "border-blue-300 bg-blue-50 text-blue-500",
  Técnico: "border-blue-300 bg-blue-50 text-blue-500",
};

const estadoStyles = {
  Activo: "text-emerald-500",
  Inactivo: "text-slate-500",
};

export const usuariosConfig = {
  pageTitle: "Usuarios",
  pageSubtitle: "Gestión de Usuarios",

  cardTitle: "Gestión de Usuarios",
  cardDescription: "Administra los usuarios del sistema IncuBase",
  cardIcon: UserCog,
  cardIconColor: "text-[#0F7A4F]",

  buttonText: "Agregar Usuario",
  buttonIcon: UserRoundPlus,

  FormModal: UsuarioFormModal,
  DetailModal: UsuarioDetailModal,

  searchPlaceholder: "Buscar por nombre o correo...",

  searchKeys: ["nombreCompleto", "email", "telefono", "rol", "estado"],

  defaultSort: {
    key: "nombreCompleto",
    direction: "asc",
    type: "text",
  },

  stats: [
    {
      title: "Total de Usuarios",
      value: 110,
      icon: Users,
      iconColor: "text-[#7BB9A0]",
    },
    {
      title: "Administradores",
      value: 8,
      icon: ShieldCheck,
      iconColor: "text-red-300",
    },
    {
      title: "Técnicos de Campo",
      value: 102,
      icon: UserRoundPlus,
      iconColor: "text-blue-300",
    },
    {
      title: "Activos",
      value: 80,
      dotColor: "bg-emerald-500",
    },
  ],

  filters: [
    {
      type: "select",
      key: "rol",
      label: "Roles",
      options: ["Administrador", "Tecnico"],
    },
    {
      type: "select",
      key: "estado",
      label: "Estado",
      options: ["Activo", "Inactivo"],
    },
  ],

  columns: [
    {
      key: "nombreCompleto",
      header: "Usuario",
      sortable: true,
      sortType: "text",
      defaultSortDirection: "asc",
      render: (_, row) => (
        <div>
          <p className="font-bold text-[#0B2B26]">{row.nombreCompleto}</p>
          <p className="text-sm font-semibold text-slate-500 underline">
            {row.email}
          </p>
        </div>
      ),
    },
    {
      key: "rol",
      header: "Rol",
      render: (value) => (
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${
            roleStyles[value] || "border-slate-300 bg-slate-50 text-slate-500"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "estado",
      header: "Estado",
      render: (value) => (
        <span
          className={`inline-flex items-center gap-2 font-semibold ${
            estadoStyles[value] || "text-gray-500"
          }`}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
          {value}
        </span>
      ),
    },
    {
      key: "fechaCreacion",
      header: "Fecha de creación",
      sortable: true,
      sortType: "date",
      defaultSortDirection: "asc",
    },
    {
      key: "acciones",
      header: "Acciones",
    },
  ],

  actions: [
    {
      key: "edit",
      label: "Editar",
      icon: Pencil,
      color: "text-[#E6A11D]",
      hover: "hover:bg-orange-50",
    },
    {
      key: "delete",
      label: "Desactivar usuario",
      icon: UserRoundX,
      color: "text-red-400",
      hover: "hover:bg-red-50",
    },
    {
      key: "detail",
      label: "Ver detalle",
      icon: FileSearch,
      color: "text-blue-400",
      hover: "hover:bg-blue-50",
    },
  ],

  emptyTitle: "No hay usuarios registrados",
  emptyDescription: "Agrega usuarios para administrar los accesos del sistema.",

  data: [
    {
      id: 1,
      nombres: "Karla",
      apellidos: "Pocasangre",
      nombreCompleto: "Karla Pocasangre",
      email: "karla29hernandez89@gmail.com",
      telefono: "6117-9198",
      rol: "Administrador",
      estado: "Activo",
      fechaCreacion: "2023-06-01 18:43",
      fechaActualizacion: "2026-05-14 16:20",
    },
    {
      id: 2,
      nombres: "Josue",
      apellidos: "Sanchez",
      nombreCompleto: "Josue Sanchez",
      email: "josue.chanchez.23@gmail.com",
      telefono: "7123-4567",
      rol: "Tecnico",
      estado: "Activo",
      fechaCreacion: "2023-10-02 15:04",
      fechaActualizacion: "2026-05-10 09:15",
    },
    {
      id: 3,
      nombres: "Carlos",
      apellidos: "Martinez",
      nombreCompleto: "Carlos Martinez",
      email: "carlitouwu.89.23@gmail.com",
      telefono: "7988-1200",
      rol: "Tecnico",
      estado: "Inactivo",
      fechaCreacion: "2005-01-01 11:45",
      fechaActualizacion: "2026-04-28 14:35",
    },
    {
      id: 4,
      nombres: "Mario",
      apellidos: "Castro",
      nombreCompleto: "Mario Castro",
      email: "castro.marios.21345@gmail.com",
      telefono: "7456-9087",
      rol: "Tecnico",
      estado: "Activo",
      fechaCreacion: "2026-11-01 21:00",
      fechaActualizacion: "2026-11-02 08:10",
    },
  ],
};
