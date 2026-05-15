import { Activity } from "lucide-react";

import { actividadReciente } from "../../../data/dashboardAdmin.data";

const toneStyles = {
  green: {
    bg: "bg-[#E4F7EE]",
    text: "text-[#0F7A4F]",
    border: "border-[#BFE5D3]",
  },
  blue: {
    bg: "bg-[#EAF2FF]",
    text: "text-[#2563EB]",
    border: "border-[#C8DAFF]",
  },
  orange: {
    bg: "bg-[#FFF3E5]",
    text: "text-[#F97316]",
    border: "border-[#FFD8A8]",
  },
  red: {
    bg: "bg-[#FFECEC]",
    text: "text-[#EF4444]",
    border: "border-[#FFCACA]",
  },
};

function AdminActivityPanel() {
  return (
    <section className="rounded-[18px] border border-[#C9DDD8] bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-[#DDEBE7] px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF5F1] text-[#0F7A4F]">
            <Activity size={18} strokeWidth={2.2} />
          </div>

          <div>
            <h3 className="text-[17px] font-bold text-[#0B2F2A]">
              Actividad reciente
            </h3>
            <p className="mt-1 text-[12px] text-slate-500">
              Últimos movimientos operativos registrados en el sistema.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-5 lg:grid-cols-2 xl:grid-cols-5">
        {actividadReciente.map((item) => {
          const Icon = item.icon;
          const tone = toneStyles[item.tone] || toneStyles.green;

          return (
            <article
              key={item.id}
              className="group rounded-2xl border border-[#D7E7E2] bg-[#F8FCFA] p-4 transition hover:-translate-y-0.5 hover:border-[#9FC8BB] hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${tone.bg} ${tone.text} ${tone.border}`}
                >
                  <Icon size={17} strokeWidth={2.3} />
                </div>

                <span className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-slate-400 ring-1 ring-[#E3EFEB]">
                  {item.time}
                </span>
              </div>

              <h4 className="mt-4 text-[13px] font-bold text-[#0B2F2A]">
                {item.title}
              </h4>

              <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-slate-500">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default AdminActivityPanel;
