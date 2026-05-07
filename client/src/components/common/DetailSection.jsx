export default function DetailSection({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-xl border border-[#D7E4E0] bg-white
        px-5 py-4 shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}
