import { Eraser } from "lucide-react";

export default function ClearButton({
  children = "Limpiar Formulario",
  onClick,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-[44px] items-center justify-center gap-3 rounded-lg border border-[#D7E4E0] bg-[#F8FCFA] px-5 text-sm text-[#6B7280] shadow-sm transition hover:bg-[#EEF7F4] hover:text-[#52645E] ${className}`}
    >
      <Eraser className="h-4 w-4 text-[#52645E]" />
      {children}
    </button>
  );
}
