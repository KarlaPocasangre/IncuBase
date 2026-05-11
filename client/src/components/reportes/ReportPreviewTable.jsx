import { TableProperties } from "lucide-react";

function ReportPreviewTable({ report }) {
  return (
    <section className="rounded-2xl border border-[#D8E5DF] bg-white shadow-sm">
      <div className="border-b border-[#D8E5DF] px-5 py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TableProperties className="h-5 w-5 text-[#0F6B3D]" />
              <h3 className="text-base font-bold text-[#163832]">
                {report.title}
              </h3>
            </div>

            <p className="mt-1 text-sm text-gray-500">{report.subtitle}</p>
          </div>

          <span className="w-fit rounded-full border border-[#BFD8D2] bg-[#EFF8F5] px-4 py-1.5 text-xs font-semibold text-[#0F6B3D]">
            Vista previa
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 border-b border-[#D8E5DF] bg-[#F8FCFA] p-5 md:grid-cols-3">
        {report.indicators.map((indicator) => (
          <div
            key={indicator.label}
            className="rounded-xl border border-[#D8E5DF] bg-white p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              {indicator.label}
            </p>

            <p className="mt-1 text-xl font-bold text-[#163832]">
              {indicator.value}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead className="bg-[#F8FCFA]">
            <tr>
              {report.columns.map((column) => (
                <th
                  key={column}
                  className="border-b border-[#D8E5DF] px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E5ECE9]">
            {report.rows.map((row, rowIndex) => (
              <tr
                key={`${row[0]}-${rowIndex}`}
                className="transition hover:bg-[#F8FCFA]"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${cell}-${cellIndex}`}
                    className="px-5 py-4 text-sm text-[#163832]"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ReportPreviewTable;
