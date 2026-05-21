import { CalendarDays } from "lucide-react";
import { useRef } from "react";

function DateTimeInput({
  label,
  name,
  value,
  onChange,
  required = false,
  max,
  min,
}) {
  const inputRef = useRef(null);

  const abrirCalendario = () => {
    if (!inputRef.current) return;

    if (typeof inputRef.current.showPicker === "function") {
      inputRef.current.showPicker();
    } else {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#111827]">
        {label}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="datetime-local"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          max={max}
          min={min}
          className="input-base pr-10"
        />

        <button
          type="button"
          onClick={abrirCalendario}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] transition hover:text-[#007A4D]"
          aria-label="Abrir selector de fecha y hora"
        >
          <CalendarDays size={17} />
        </button>
      </div>
    </div>
  );
}

export default DateTimeInput;
