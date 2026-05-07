const variants = {
  accept: {
    className: "bg-[#85B9A2] text-white hover:bg-[#75AA94]",
  },

  update: {
    className: "bg-[#85B9A2] text-white hover:bg-[#75AA94]",
  },

  add: {
    className: "bg-[#85B9A2] text-white hover:bg-[#75AA94]",
  },

  cancel: {
    className:
      "border border-[#D7E4E0] bg-white text-[#111827] hover:bg-[#F8FCFA]",
  },
};

const sizes = {
  sm: "h-[44px] px-5 text-sm rounded-xl",
  md: "h-[48px] px-7 text-base rounded-xl",
  lg: "h-[70px] px-10 text-2xl rounded-2xl",
};

export default function ModalButton({
  children,
  variant = "accept",
  size = "md",
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  const selectedVariant = variants[variant] || variants.accept;
  const selectedSize = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        font-semibold tracking-wide shadow-sm
        transition-all duration-200
        disabled:cursor-not-allowed disabled:opacity-60
        ${selectedSize}
        ${selectedVariant.className}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
