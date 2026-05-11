function ReportTypeCard({ report, active, onSelect }) {
  const Icon = report.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        active
          ? "border-[#0F6B3D] bg-[#EFF8F5]"
          : "border-[#D8E5DF] bg-white hover:border-[#B6D5CC]"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${report.bgColor}`}
        >
          <Icon className={`h-6 w-6 ${report.color}`} />
        </div>

        <div>
          <h4 className="text-sm font-bold text-[#163832]">{report.title}</h4>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            {report.description}
          </p>

          {active && (
            <span className="mt-3 inline-flex rounded-full bg-[#0F6B3D] px-3 py-1 text-[11px] font-semibold text-white">
              Seleccionado
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default ReportTypeCard;
