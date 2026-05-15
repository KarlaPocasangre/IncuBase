import {
  adminSummary,
  estadoOperativo,
} from "../../../data/dashboardAdmin.data";

const toneStyles = {
  green: {
    iconBg: "bg-[#E4F7EE]",
    iconText: "text-[#0F7A4F]",
    dot: "bg-[#10B981]",
  },
  blue: {
    iconBg: "bg-[#EAF2FF]",
    iconText: "text-[#2563EB]",
    dot: "bg-[#3B82F6]",
  },
  orange: {
    iconBg: "bg-[#FFF3E5]",
    iconText: "text-[#F97316]",
    dot: "bg-[#F59E0B]",
  },
  red: {
    iconBg: "bg-[#FFECEC]",
    iconText: "text-[#EF4444]",
    dot: "bg-[#EF4444]",
  },
};

function AdminSummaryBar() {
  return (
    <section className="rounded-[18px] border border-[#C9DDD8] bg-white shadow-sm">
      <div className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0F7A4F]" />
            <h2 className="text-[17px] font-bold text-[#0B2F2A]">
              {adminSummary.temporada}
            </h2>
          </div>

          <p className="mt-1 text-[12px] text-slate-500">
            {adminSummary.descripcion}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {estadoOperativo.map((item) => {
            const Icon = item.icon;
            const tone = toneStyles[item.tone] || toneStyles.green;

            return (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-full border border-[#D7E7E2] bg-[#F7FBFA] px-3 py-2"
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${tone.iconBg} ${tone.iconText}`}
                >
                  <Icon size={15} strokeWidth={2.3} />
                </span>

                <div className="leading-tight">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    {item.label}
                  </p>
                  <p className="text-[12px] font-bold text-[#0B2F2A]">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[#DDEBE7] px-5 py-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {adminSummary.items.map((item) => {
            const Icon = item.icon;
            const tone = toneStyles[item.tone] || toneStyles.green;

            return (
              <article
                key={item.label}
                className="group flex items-center justify-between rounded-2xl border border-[#D7E7E2] bg-[#F8FCFA] px-4 py-3 transition hover:-translate-y-0.5 hover:border-[#9FC8BB] hover:bg-white hover:shadow-sm"
              >
                <div>
                  <p className="text-[11px] font-medium text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[22px] font-extrabold text-[#071F1B]">
                    {item.value}
                  </p>
                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone.iconBg} ${tone.iconText}`}
                >
                  <Icon size={19} strokeWidth={2.3} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AdminSummaryBar;
