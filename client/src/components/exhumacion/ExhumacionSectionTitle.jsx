export default function ExhumacionSectionTitle({
  icon: Icon,
  title,
  color = "text-[#007A4D]",
  className = "",
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Icon && <Icon className={`h-5 w-5 ${color}`} />}
      <h3 className="text-lg font-bold text-[#111827]">{title}</h3>
    </div>
  );
}
