import {
  CalendarArrowDown,
  CalendarArrowUp,
  FileSearch,
  Pencil,
  XCircle,
} from "lucide-react";

const defaultActions = [
  {
    key: "edit",
    label: "Editar",
    icon: Pencil,
    color: "text-[#E6A11D]",
    hover: "hover:bg-orange-50",
  },
  {
    key: "delete",
    label: "Eliminar",
    icon: XCircle,
    color: "text-red-400",
    hover: "hover:bg-red-50",
  },
  {
    key: "detail",
    label: "Ver detalle",
    icon: FileSearch,
    color: "text-blue-400",
    hover: "hover:bg-blue-50",
  },
];

function ManagementTable({
  columns = [],
  data = [],
  actions,
  onEdit,
  onDelete,
  onDetail,
  onAction,
  onSort,
  sortConfig,
  emptyTitle = "No hay registros disponibles",
  emptyDescription = "Cuando existan datos registrados, aparecerán en esta tabla.",
}) {
  const tableActions = actions?.length ? actions : defaultActions;

  const handleAction = (actionKey, row) => {
    if (onAction) {
      onAction(actionKey, row);
      return;
    }

    if (actionKey === "edit") {
      onEdit?.(row);
      return;
    }

    if (actionKey === "delete") {
      onDelete?.(row);
      return;
    }

    if (actionKey === "detail") {
      onDetail?.(row);
    }
  };

  const shouldShowAction = (action, row) => {
    if (action.hiddenWhen?.(row)) return false;
    if (action.show && !action.show(row)) return false;

    return true;
  };

  const renderSortIndicator = (column) => {
    if (!column.sortable) return null;

    const isActive = sortConfig?.key === column.key;
    const direction = isActive
      ? sortConfig.direction
      : column.defaultSortDirection || "asc";

    const iconClassName = isActive
      ? "text-[#0F6B3D] border-[#C9DDD8] bg-[#F1F8F5]"
      : "text-slate-500 border-transparent bg-[#F5F6F7]";

    if (column.sortType === "date") {
      const DateIcon =
        direction === "desc" ? CalendarArrowDown : CalendarArrowUp;

      return (
        <span
          className={`ml-2 inline-flex h-7 w-7 items-center justify-center rounded-lg border transition ${iconClassName}`}
        >
          <DateIcon className="h-4 w-4" strokeWidth={2} />
        </span>
      );
    }

    return (
      <span
        className={`ml-2 inline-flex h-7 min-w-7 items-center justify-center rounded-lg border px-1.5 text-[13px] font-bold leading-none transition ${iconClassName}`}
      >
        A{direction === "desc" ? "↓" : "↑"}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#D8E5DF] text-sm text-[#0B2B26]">
            {columns.map((column) => {
              const headerContent = column.renderHeader
                ? column.renderHeader()
                : column.header || column.label;

              return (
                <th key={column.key} className="px-2 pb-4 font-bold">
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => onSort?.(column)}
                      className="inline-flex items-center rounded-md text-left font-bold transition hover:text-[#0F6B3D]"
                    >
                      {headerContent}
                      {renderSortIndicator(column)}
                    </button>
                  ) : (
                    headerContent
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-2 py-12">
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#C9DDD8] bg-[#F8FCFA] px-6 py-10 text-center">
                  <p className="text-base font-bold text-[#0B2B26]">
                    {emptyTitle}
                  </p>
                  <p className="mt-1 max-w-md text-sm text-gray-500">
                    {emptyDescription}
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              const rowKey =
                row.id ||
                row.codigo ||
                row.codigoNido ||
                row.nido ||
                row.email ||
                rowIndex;

              return (
                <tr
                  key={rowKey}
                  className="border-b border-[#E3ECE7] text-sm text-gray-500 transition-colors duration-200 hover:bg-[#F8FCFA]"
                >
                  {columns.map((column, columnIndex) => (
                    <td
                      key={column.key}
                      className={`px-2 py-7 align-middle ${
                        columnIndex === 0 ? "font-bold text-[#0B2B26]" : ""
                      }`}
                    >
                      {column.key === "acciones" ? (
                        <div className="flex items-center gap-2">
                          {tableActions
                            .filter((action) => shouldShowAction(action, row))
                            .map((action) => {
                              const Icon = action.icon;

                              return (
                                <button
                                  key={action.key}
                                  type="button"
                                  title={action.label}
                                  aria-label={action.label}
                                  onClick={() => handleAction(action.key, row)}
                                  className={`rounded-lg p-1.5 transition-all duration-200 ${
                                    action.hover || "hover:bg-gray-100"
                                  }`}
                                >
                                  <Icon
                                    className={`h-5 w-5 ${
                                      action.color || "text-gray-500"
                                    }`}
                                    strokeWidth={1.9}
                                  />
                                </button>
                              );
                            })}
                        </div>
                      ) : column.render ? (
                        column.render(row[column.key], row)
                      ) : (
                        row[column.key]
                      )}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManagementTable;
