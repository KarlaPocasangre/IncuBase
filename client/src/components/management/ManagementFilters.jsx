import { CalendarDays, Search } from "lucide-react";
import ClearButton from "../common/ClearButton";

function ManagementFilters({ placeholder, filters }) {
  return (
    <>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_170px_145px_145px]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

          <input
            type="text"
            placeholder={placeholder}
            className="h-12 w-full rounded-xl border border-[#D8E5DF] bg-white pl-12 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#0F6B3D]"
          />
        </div>

        {filters.map((filter, index) =>
          index === 0 ? (
            <button
              key={filter}
              type="button"
              className="flex h-12 items-center justify-between rounded-xl border border-[#D8E5DF] bg-white px-4 text-sm text-gray-700"
            >
              {filter}
              <CalendarDays className="h-4 w-4 text-gray-500" />
            </button>
          ) : (
            <select
              key={filter}
              className="h-12 rounded-xl border border-[#D8E5DF] bg-white px-4 text-sm text-gray-700 outline-none"
            >
              <option>{filter}</option>
            </select>
          ),
        )}
      </div>

      {/* 🔥 BOTÓN REUTILIZABLE */}
      <ClearButton
        className="mb-6"
        onClick={() => console.log("Limpiar filtros")}
      >
        Limpiar Filtros
      </ClearButton>
    </>
  );
}

export default ManagementFilters;
