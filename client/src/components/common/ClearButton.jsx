import { Eraser, RotateCcw } from "lucide-react";

const variants = {
  filters: {
    icon: Eraser,
    className:
      "border-[#D7E4E0] bg-[#F8FCFA] text-[#6B7280] hover:bg-[#EEF7F4] hover:text-[#52645E]",
    iconClassName: "text-[#52645E]",
  },

  form: {
    icon: RotateCcw,
    className:
      "border-[#D7E4E0] bg-white text-[#1F2937] hover:bg-[#F8FCFA] hover:text-[#111827]",
    iconClassName: "text-[#111827]",
  },
};

export default function ClearButton({
  children = "Limpiar Formulario",
  onClick,
  className = "",
  variant = "form",
  disabled = false,
}) {
  const selectedVariant = variants[variant] || variants.form;
  const Icon = selectedVariant.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex h-[44px] items-center justify-center gap-3 rounded-lg
        border px-5 text-sm font-medium shadow-sm transition-all duration-200
        disabled:cursor-not-allowed disabled:opacity-60
        ${selectedVariant.className}
        ${className}
      `}
    >
      <Icon className={`h-4 w-4 ${selectedVariant.iconClassName}`} />
      {children}
    </button>
  );
}
