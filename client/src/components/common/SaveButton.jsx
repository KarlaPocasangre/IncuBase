import { Save } from "lucide-react";

export default function SaveButton({
  children = "Guardar Registro",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex h-[44px] w-full items-center justify-center gap-3
        rounded-lg px-5 text-sm font-bold text-white
        shadow-sm transition-all duration-200
        ${
          disabled
            ? "cursor-not-allowed bg-[#8AB79F]"
            : "bg-[#006B35] hover:-translate-y-[1px] hover:bg-[#005A2C] hover:shadow-md"
        }
        ${className}
      `}
    >
      <Save className="h-5 w-5 text-white" />
      {children}
    </button>
  );
}
