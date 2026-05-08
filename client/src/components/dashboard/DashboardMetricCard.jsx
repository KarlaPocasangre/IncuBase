function DashboardMetricCard({
  title,
  value,
  description,
  icon: Icon,
  accent = "border-l-[#006C3A]",
  iconBg = "bg-[#E5F4EC]",
  iconColor = "text-[#006C3A]",
}) {
  return (
    <article
      className={`rounded-2xl border border-[#D6E1DE] border-l-4 ${accent} bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#344E49]">{title}</p>

          <h2 className="mt-5 text-3xl font-bold text-[#0B1715]">{value}</h2>

          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon size={20} className={iconColor} />
        </div>
      </div>
    </article>
  );
}

export default DashboardMetricCard;
