import { useState } from "react";
import { CalendarDays, ChevronDown, Search, X } from "lucide-react";
import ClearButton from "../common/ClearButton";

function normalizeFilter(filter) {
  if (typeof filter === "string") {
    const label = filter.toLowerCase();

    const isDateFilter =
      label.includes("fecha") ||
      label.includes("rango") ||
      label.includes("date");

    return {
      key: filter,
      label: filter,
      type: isDateFilter ? "date" : "select",
      options: [],
    };
  }

  return {
    key: filter.key || filter.value || filter.label,
    label: filter.label || filter.value || "Filtro",
    type: filter.type || "select",
    options: filter.options || [],
    icon: filter.icon,
  };
}

function formatDate(value) {
  if (!value) return "";

  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function formatDateRangeLabel(value, defaultLabel) {
  if (!value?.from && !value?.to) return defaultLabel;

  if (value.from && value.to) {
    return `${formatDate(value.from)} - ${formatDate(value.to)}`;
  }

  if (value.from) {
    return `Desde ${formatDate(value.from)}`;
  }

  return `Hasta ${formatDate(value.to)}`;
}

function DatePickerButton({ label, value, onChange }) {
  const handleOpenPicker = (event) => {
    const input = event.currentTarget.querySelector("input");

    if (input?.showPicker) {
      input.showPicker();
    } else {
      input?.focus();
      input?.click();
    }
  };

  return (
    <button
      type="button"
      onClick={handleOpenPicker}
      className="relative flex h-11 w-full items-center justify-between rounded-xl border border-[#D8E5DF] bg-white px-3 text-left text-sm text-slate-600 transition hover:border-[#AFCBC1] hover:bg-[#F8FCFA] focus:border-[#0F6B3D] focus:outline-none focus:ring-4 focus:ring-[#0F6B3D]/10"
    >
      <span className={value ? "text-slate-700" : "text-slate-400"}>
        {value ? formatDate(value) : label}
      </span>

      <CalendarDays className="h-4 w-4 text-slate-500" />

      <input
        type="date"
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        tabIndex={-1}
      />
    </button>
  );
}

function ManagementFilters({
  placeholder,
  filters = [],
  searchValue = "",
  filterValues = {},
  onSearchChange,
  onFilterChange,
  onClearFilters,
}) {
  const [openDateFilter, setOpenDateFilter] = useState(null);

  const normalizedFilters = filters.map(normalizeFilter);

  const handleDateChange = (key, field, value) => {
    const currentValue = filterValues[key] || {};

    onFilterChange?.(key, {
      ...currentValue,
      [field]: value,
    });
  };

  const handleClearDateFilter = (key) => {
    onFilterChange?.(key, {
      from: "",
      to: "",
    });
  };

  return (
    <>
      <div className="mb-4 flex flex-col gap-4 xl:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder={placeholder}
            className="h-12 w-full rounded-xl border border-[#D8E5DF] bg-white pl-12 pr-4 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-[#AFCBC1] hover:bg-[#F8FCFA] focus:border-[#0F6B3D] focus:ring-4 focus:ring-[#0F6B3D]/10"
          />
        </div>

        {normalizedFilters.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:flex">
            {normalizedFilters.map((filter) => {
              const FilterIcon = filter.icon;
              const currentValue = filterValues[filter.key];

              if (filter.type === "date") {
                const isOpen = openDateFilter === filter.key;

                return (
                  <div key={filter.key} className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDateFilter((prev) =>
                          prev === filter.key ? null : filter.key,
                        )
                      }
                      className="flex h-12 min-w-[170px] items-center justify-between gap-3 rounded-xl border border-[#D8E5DF] bg-white px-4 text-sm text-gray-700 transition-all duration-200 hover:border-[#AFCBC1] hover:bg-[#F8FCFA] focus:border-[#0F6B3D] focus:outline-none focus:ring-4 focus:ring-[#0F6B3D]/10"
                    >
                      <span className="truncate">
                        {formatDateRangeLabel(currentValue, filter.label)}
                      </span>

                      {FilterIcon ? (
                        <FilterIcon className="h-4 w-4 shrink-0 text-gray-500" />
                      ) : (
                        <CalendarDays className="h-4 w-4 shrink-0 text-gray-500" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="absolute right-0 z-30 mt-2 w-[300px] rounded-2xl border border-[#D8E5DF] bg-white p-4 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-[#0B2B26]">
                              Rango de fecha
                            </p>
                            <p className="mt-0.5 text-xs text-slate-400">
                              Selecciona las fechas desde el calendario
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setOpenDateFilter(null)}
                            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                              Desde
                            </span>

                            <DatePickerButton
                              label="Seleccionar fecha inicial"
                              value={currentValue?.from || ""}
                              onChange={(value) =>
                                handleDateChange(filter.key, "from", value)
                              }
                            />
                          </div>

                          <div>
                            <span className="mb-1.5 block text-xs font-semibold text-slate-500">
                              Hasta
                            </span>

                            <DatePickerButton
                              label="Seleccionar fecha final"
                              value={currentValue?.to || ""}
                              onChange={(value) =>
                                handleDateChange(filter.key, "to", value)
                              }
                            />
                          </div>
                        </div>

                        <div className="mt-4 flex justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => handleClearDateFilter(filter.key)}
                            className="rounded-xl border border-[#D8E5DF] px-4 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-50"
                          >
                            Limpiar
                          </button>

                          <button
                            type="button"
                            onClick={() => setOpenDateFilter(null)}
                            className="rounded-xl bg-[#0F6B3D] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#0B5631]"
                          >
                            Aplicar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={filter.key} className="relative">
                  <select
                    value={filterValues[filter.key] || ""}
                    onChange={(event) =>
                      onFilterChange?.(filter.key, event.target.value)
                    }
                    className="h-12 min-w-[145px] appearance-none rounded-xl border border-[#D8E5DF] bg-white px-4 pr-10 text-sm text-gray-700 outline-none transition-all duration-200 hover:border-[#AFCBC1] hover:bg-[#F8FCFA] focus:border-[#0F6B3D] focus:ring-4 focus:ring-[#0F6B3D]/10"
                  >
                    <option value="">{filter.label}</option>

                    {filter.options.map((option) => {
                      const value =
                        typeof option === "string" ? option : option.value;
                      const label =
                        typeof option === "string" ? option : option.label;

                      return (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      );
                    })}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ClearButton variant="filters" className="mb-6" onClick={onClearFilters}>
        Limpiar Filtros
      </ClearButton>
    </>
  );
}

export default ManagementFilters;
