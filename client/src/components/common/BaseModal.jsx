import { X } from "lucide-react";

export default function BaseModal({
  open,
  title,
  subtitle,
  onClose,
  children,
  actions,
  maxWidth = "max-w-[560px]",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6">
      <div
        className={`
          relative w-full ${maxWidth}
          max-h-[92vh] overflow-y-auto rounded-2xl
          bg-[#F8FCFA] px-8 py-7
          shadow-[0_18px_50px_rgba(0,0,0,0.18)]
        `}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-1 text-[#4B5563] transition hover:bg-[#EAF3EF] hover:text-[#111827]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 pr-8">
          <h2 className="text-xl font-bold text-[#111827]">{title}</h2>

          {subtitle && (
            <p className="mt-1 text-base text-[#6B7280]">{subtitle}</p>
          )}
        </div>

        <div>{children}</div>

        {actions && <div className="mt-8">{actions}</div>}
      </div>
    </div>
  );
}
