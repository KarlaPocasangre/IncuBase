export default function DetailRow({
  icon: Icon,
  label,
  value,
  iconColor = "text-[#79B49E]",
  className = "",
}) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      {Icon && (
        <Icon className={`mt-[2px] h-[17px] w-[17px] shrink-0 ${iconColor}`} />
      )}

      <div className="flex gap-2 text-sm">
        <span className="font-semibold text-[#263D38]">{label}:</span>
        <span className="text-slate-500">{value || "—"}</span>
      </div>
    </div>
  );
}
