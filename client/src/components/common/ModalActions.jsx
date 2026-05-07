export default function ModalActions({
  children,
  align = "right",
  className = "",
}) {
  const alignClass = {
    right: "justify-end",
    center: "justify-center",
    between: "justify-between",
  };

  return (
    <div
      className={`
        flex flex-wrap items-center gap-3
        ${alignClass[align] || alignClass.right}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
