import { useState } from "react";

const filas = ["A", "B", "C", "D", "E", "F"];
const columnas = [1, 2, 3, 4, 5, 6, 7, 8];

export default function CorralGrid({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (fila, col) => {
    const celda = { fila, col };
    setSelected(celda);

    if (onSelect) onSelect(celda);
  };

  return (
    <div className="flex justify-center">
      <div className="space-y-2">
        {/* HEADER COLUMNAS */}
        <div className="grid grid-cols-[20px_repeat(8,40px)] gap-2 text-xs text-[#6B7280]">
          <div></div>
          {columnas.map((col) => (
            <div key={col} className="text-center">
              {String(col).padStart(2, "0")}
            </div>
          ))}
        </div>

        {/* GRID */}
        {filas.map((fila, filaIndex) => (
          <div
            key={fila}
            className="grid grid-cols-[20px_repeat(8,40px)] items-center gap-2"
          >
            {/* letra fila */}
            <span className="text-xs text-[#6B7280]">{fila}</span>

            {columnas.map((col, colIndex) => {
              const esClaro = (filaIndex + colIndex) % 2 === 0;

              const isSelected =
                selected?.fila === fila && selected?.col === col;

              return (
                <button
                  key={col}
                  onClick={() => handleClick(fila, col)}
                  className={`
                    h-10 w-10 rounded-md border transition
                    shadow-[0_2px_4px_rgba(0,0,0,0.05)]

                    ${
                      esClaro
                        ? "bg-[#F1F6F5] border-[#CADCD8]"
                        : "bg-[#CAE4DF] border-[#CADCD8]"
                    }

                    ${
                      isSelected
                        ? "ring-2 ring-[#007A4D] scale-105"
                        : "hover:bg-[#BFD8D2] hover:scale-105"
                    }
                  `}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
