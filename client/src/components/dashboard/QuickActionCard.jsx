function QuickActionCard({
  title,
  description,
  icon: Icon,
  path,
  className,
  iconBg,
  onNavigate,
}) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(path)}
      className={`group rounded-2xl border border-[#D6E1DE] p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${className}`}
    >
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <Icon size={22} />
        </div>

        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="mt-1 text-xs opacity-80">{description}</p>
        </div>
      </div>
    </button>
  );
}

export default QuickActionCard;
