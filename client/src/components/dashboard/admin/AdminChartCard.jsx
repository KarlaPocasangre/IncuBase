function AdminChartCard({
  title,
  subtitle,
  icon: Icon,
  badge,
  children,
  className = "",
}) {
  return (
    <section
      className={`rounded-[18px] border border-[#C9DDD8] bg-white shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between gap-4 border-b border-[#DDEBE7] px-5 py-4">
        <div className="flex items-start gap-3">
          {Icon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF5F1] text-[#0F7A4F]">
              <Icon size={18} strokeWidth={2.2} />
            </div>
          )}

          <div>
            <h3 className="text-[17px] font-bold text-[#0B2F2A]">{title}</h3>
            {subtitle && (
              <p className="mt-1 text-[12px] text-slate-500">{subtitle}</p>
            )}
          </div>
        </div>

        {badge && (
          <span className="rounded-full border border-[#BFD8D2] bg-[#F2FAF7] px-3 py-1 text-[11px] font-semibold text-[#0F7A4F]">
            {badge}
          </span>
        )}
      </div>

      <div className="p-5">{children}</div>
    </section>
  );
}

export default AdminChartCard;
