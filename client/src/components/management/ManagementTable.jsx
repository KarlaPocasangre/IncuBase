import { FileSearch, Pencil, XCircle } from "lucide-react";

function ManagementTable({ columns, data, onEdit, onDetail }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[#D8E5DF] text-sm text-[#0B2B26]">
            {columns.map((column) => (
              <th key={column.key} className="px-2 pb-4 font-bold">
                {column.renderHeader ? column.renderHeader() : column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-[#E3ECE7] text-sm text-gray-500"
            >
              {columns.map((column, columnIndex) => (
                <td
                  key={column.key}
                  className={`px-2 py-7 ${
                    columnIndex === 0 ? "font-bold text-[#0B2B26]" : ""
                  }`}
                >
                  {column.key === "acciones" ? (
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => onEdit(row)}>
                        <Pencil className="h-5 w-5 text-[#E6A11D]" />
                      </button>

                      <button type="button">
                        <XCircle className="h-5 w-5 text-red-400" />
                      </button>

                      <button type="button" onClick={() => onDetail?.(row)}>
                        <FileSearch className="h-5 w-5 text-blue-400" />
                      </button>
                    </div>
                  ) : column.render ? (
                    column.render(row[column.key], row)
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagementTable;