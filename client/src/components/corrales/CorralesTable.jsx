import { Pencil, XCircle, FileSearch } from "lucide-react";
import StatusBadge from "./StatusBadge";

function CorralesTable({ corrales, onEdit, onDetail }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#D7E4E1] text-center">
            <th className="py-4 text-left">Codigo</th>
            <th>Ubicacion</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {corrales.map((c, i) => (
            <tr key={i} className="border-b border-[#D7E4E1]">
              <td className="py-4 font-semibold">{c.codigo}</td>
              <td className="text-center">{c.ubicacion}</td>
              <td className="text-center">{c.tipo}</td>
              <td className="text-center">
                <div className="flex justify-center">
                  <StatusBadge estado={c.estado} />
                </div>
              </td>
              <td className="text-center">{c.fecha}</td>

              <td>
                <div className="flex justify-center gap-3">
                  <button type="button" onClick={() => onEdit(c)}>
                    <Pencil size={18} className="text-orange-500" />
                  </button>

                  <button type="button">
                    <XCircle size={18} className="text-red-500" />
                  </button>

                  <button type="button" onClick={() => onDetail(c)}>
                    <FileSearch size={18} className="text-blue-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CorralesTable;