import {
  CalendarPlus,
  Circle,
  FileSearch,
  Pencil,
  Plus,
  ShieldUser,
  UserRoundCog,
  UserRoundX,
  UsersRound,
} from "lucide-react";

const rolStyles = {
  Administrador: "bg-red-50 text-red-500 border border-red-400",
  Tecnico: "bg-blue-50 text-blue-500 border border-blue-400",
};

const estadoStyles = {
  Activo: "text-emerald-500",
  Inactivo: "text-[#52645E]",
};

export const usuariosConfig = {
  pageTitle: "Usuarios",
  pageSubtitle: "Gestion de Usuarios",

  cardTitle: "Gestion de Usuarios",
  cardDescription: "Administra los usuarios del sistema IncuBase",
  buttonText: "Agregar Usuario",
  buttonIcon: Plus,

  searchPlaceholder: "Buscar por nombre o correo...",
  filters: ["Roles", "Estado"],

  stats: [
    {
      title: "Total de Usuarios",
      value: 110,
      icon: UsersRound,
      iconColor: "text-[#7BB9A0]",
    },
    {
      title: "Administradores",
      value: 8,
      icon: ShieldUser,
      iconColor: "text-red-300",
    },
    {
      title: "Tecnicos de Campo",
      value: 102,
      icon: UserRoundCog,
      iconColor: "text-blue-300",
    },
    {
      title: "Activos",
      value: 80,
      dotColor: "bg-emerald-500",
    },
  ],

  columns: [
    {
      header: "Usuario",
      key: "usuario",
      renderHeader: () => (
        <span className="flex items-center gap-2">
          Usuario
          <span className="text-[#52645E]">A↟</span>
        </span>
      ),
      render: (_, row) => (
        <div>
          <p className="font-semibold text-[#111827]">{row.nombre}</p>
          <p className="text-sm text-[#6B7280] underline">{row.correo}</p>
        </div>
      ),
    },
    {
      header: "Rol",
      key: "rol",
      render: (value) => (
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
            rolStyles[value] || "bg-gray-100 text-gray-500"
          }`}
        >
          <UserRoundCog className="h-4 w-4" />
          {value}
        </span>
      ),
    },
    {
      header: "Estado",
      key: "estado",
      render: (value) => (
        <span
          className={`flex items-center gap-3 font-semibold ${
            estadoStyles[value] || "text-gray-500"
          }`}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
          {value}
        </span>
      ),
    },
    {
      header: "Fecha de creacion",
      key: "fechaCreacion",
      renderHeader: () => (
        <span className="flex items-center gap-2">
          Fecha de creacion
          <CalendarPlus className="h-5 w-5 text-[#52645E]" />
        </span>
      ),
    },
    {
      header: "Acciones",
      key: "acciones",
      render: () => (
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="rounded-md p-1 hover:bg-[#E6A11D]/10"
          >
            <Pencil className="h-5 w-5 text-[#E6A11D]" />
          </button>

          <button type="button" className="rounded-md p-1 hover:bg-red-100">
            <UserRoundX className="h-5 w-5 text-red-400" />
          </button>
        </div>
      ),
    },
  ],

  data: [
    {
      nombre: "Karla Pocasangre",
      correo: "karla29hernandez89@gmail.com",
      rol: "Administrador",
      estado: "Activo",
      fechaCreacion: "2023-06-01 18:43",
    },
    {
      nombre: "Josue Sanchez",
      correo: "josue.chanchez.23@gmail.com",
      rol: "Tecnico",
      estado: "Activo",
      fechaCreacion: "2023-10-02 15:04",
    },
    {
      nombre: "Carlos Martinez",
      correo: "carlitouwu.89.23@gmail.com",
      rol: "Tecnico",
      estado: "Inactivo",
      fechaCreacion: "2005-01-01 11:45",
    },
    {
      nombre: "Mario Castro",
      correo: "castro.marios.21345@gmail.com",
      rol: "Tecnico",
      estado: "Activo",
      fechaCreacion: "2026-11-01 21:00",
    },
  ],
};
