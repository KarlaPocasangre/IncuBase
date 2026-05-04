function ManagementTable({ columns, data }) {
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
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
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
