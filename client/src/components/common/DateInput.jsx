import { CalendarDays } from "lucide-react";
import { useRef } from "react";

function DateInput({ label, name, value, onChange, required = false }) {
  const inputRef = useRef(null);

  const abrirCalendario = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
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
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="input-base pr-10"
        />

        <button
          type="button"
          onClick={abrirCalendario}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] transition hover:text-[#007A4D]"
          aria-label="Abrir calendario"
        >
          <CalendarDays size={17} />
        </button>
      </div>
    </div>
  );
}

export default DateInput;
