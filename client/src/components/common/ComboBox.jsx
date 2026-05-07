import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

function ComboBox({ options = [], value, onChange, placeholder = "Seleccionar..." }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  return (
    <div className="relative w-[170px]">
      <div className="relative">
        <input
          value={open ? search : value}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setSearch("");
            setOpen(true);
          }}
          placeholder={placeholder}
          className="h-9 w-full rounded-lg border border-[#D7E4E1] bg-white px-3 pr-8 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-[#7BBFA8]/30"
        />

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
        >
          <ChevronDown size={16} />
        </button>
      </div>

      {open && (
        <div className="absolute bottom-full left-0 z-50 mb-2 max-h-44 w-full overflow-y-auto rounded-lg border border-[#D7E4E1] bg-white shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setSearch("");
                  setOpen(false);
                }}
                className="block w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-[#E8F1EE]"
              >
                {option}
              </button>
            ))
          ) : (
            <p className="px-3 py-2 text-sm text-slate-400">
              Sin resultados
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ComboBox;