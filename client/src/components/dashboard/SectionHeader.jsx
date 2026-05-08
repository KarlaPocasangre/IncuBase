function SectionHeader({
  icon: Icon,
  title,
  description,
  iconColor = "text-[#006C3A]",
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={20} className={iconColor} />}
        <h2 className="text-lg font-bold text-[#163832]">{title}</h2>
      </div>

      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}

export default SectionHeader;
