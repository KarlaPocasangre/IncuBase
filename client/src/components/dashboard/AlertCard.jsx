import { ChevronRight, Clock } from "lucide-react";

function AlertCard({
  title,
  description,
  level,
  time,
  color,
  dot,
  icon: Icon,
}) {
  return (
    <article className="group flex items-center justify-between gap-4 rounded-xl border border-[#D6E1DE] bg-[#FAFCFB] px-4 py-4 transition hover:border-[#9CCABD] hover:bg-[#F4F8F6]">
      <div className="flex items-center gap-4">
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#163832] shadow-sm">
          <Icon size={19} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#163832]">{title}</h3>
          <p className="mt-0.5 text-xs text-gray-500">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${color}`}
        >
          {level}
        </span>

        <div className="hidden items-center gap-1 text-xs text-gray-500 sm:flex">
          <Clock size={14} />
          {time}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-400 transition hover:bg-white hover:text-[#006C3A]"
          aria-label="Ver detalle de alerta"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </article>
  );
}

export default AlertCard;
