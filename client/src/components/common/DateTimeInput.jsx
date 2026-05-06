import { CalendarDays } from "lucide-react"
import { useRef } from "react"

function DateTimeInput({
  label,
  name,
  value,
  onChange,
  required = false,
}) {
  const inputRef = useRef(null)

  const abrirCalendario = () => {
    if (inputRef.current) {
      inputRef.current.showPicker()
    }
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-800">
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
          className="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-700 shadow-sm outline-none transition focus:border-[#00796B] focus:ring-2 focus:ring-[#00796B]/15"
        />

        <button
          type="button"
          onClick={abrirCalendario}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#00796B]"
        >
          <CalendarDays size={17} />
        </button>
      </div>
    </div>
  )
}

export default DateTimeInput