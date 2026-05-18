import { Check, Lock } from "lucide-react";

const filas = ["A", "B", "C", "D", "E", "F"];
const columnas = [1, 2, 3, 4, 5, 6, 7, 8];

const getCellKey = (fila, col) => `${fila}-${Number(col)}`;

export default function CorralGrid({
  selected,
  onSelect,
  posicionesOcupadas = [],
}) {
  const posicionesOcupadasKeys = posicionesOcupadas.map((posicion) =>
    getCellKey(posicion.fila, posicion.col)
  );

  const celdasClaras = [];

  filas.forEach((fila, filaIndex) => {
    columnas.forEach((col, colIndex) => {
      const esClara = (filaIndex + colIndex) % 2 === 0;

      if (esClara) {
        celdasClaras.push(getCellKey(fila, col));
      }
    });
  });

  const clarasCompletas = celdasClaras.every((key) =>
    posicionesOcupadasKeys.includes(key)
  );

  const totalCeldas = filas.length * columnas.length;
  const corralLleno = posicionesOcupadasKeys.length >= totalCeldas;

  const handleClick = ({ fila, col, isDisabled }) => {
    if (isDisabled) return;
    onSelect?.({ fila, col });
  };

  return (
    <div className="flex justify-center">
      <div className="space-y-2">
        <div className="grid grid-cols-[20px_repeat(8,40px)] gap-2 text-xs font-medium text-[#6B7280]">
          <div />

          {columnas.map((col) => (
            <div key={col} className="text-center">
              {String(col).padStart(2, "0")}
            </div>
          ))}
        </div>

        {filas.map((fila, filaIndex) => (
          <div
            key={fila}
            className="grid grid-cols-[20px_repeat(8,40px)] items-center gap-2"
          >
            <span className="text-xs font-medium text-[#6B7280]">{fila}</span>

            {columnas.map((col, colIndex) => {
              const esClara = (filaIndex + colIndex) % 2 === 0;
              const cellKey = getCellKey(fila, col);

              const isOccupied = posicionesOcupadasKeys.includes(cellKey);
              const isSelected =
                selected?.fila === fila && selected?.col === col;

              const isAlternaBloqueada = !esClara && !clarasCompletas;
              const isDisabled =
                corralLleno || isOccupied || isAlternaBloqueada;

              const baseClass =
                "relative flex h-10 w-10 items-center justify-center rounded-md border shadow-[0_2px_4px_rgba(0,0,0,0.05)] transition-all duration-200";

              const colorClass = esClara
                ? "border-[#CADCD8] bg-[#F1F6F5]"
                : "border-[#CADCD8] bg-[#CAE4DF]";

              const selectedClass =
                "scale-105 border-[#0F6B3D] bg-[#0F6B3D] text-white shadow-md ring-4 ring-[#0F6B3D]/20";

              const occupiedClass =
                "cursor-not-allowed border-red-300 bg-red-100 text-red-600 opacity-95";

              const lockedClass = "cursor-not-allowed opacity-95";

              const hoverClass =
                "hover:scale-105 hover:border-[#7BB9A0] hover:bg-[#BFD8D2] hover:shadow-md";

              let finalClass = `${baseClass} ${colorClass} ${hoverClass}`;

              if (isSelected) {
                finalClass = `${baseClass} ${selectedClass}`;
              } else if (isOccupied) {
                finalClass = `${baseClass} ${occupiedClass}`;
              } else if (isAlternaBloqueada || corralLleno) {
                finalClass = `${baseClass} ${colorClass} ${lockedClass}`;
              }

              return (
                <button
                  key={cellKey}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleClick({ fila, col, isDisabled })}
                  className={finalClass}
                  aria-label={`Seleccionar posición ${fila}${String(
                    col
                  ).padStart(2, "0")}`}
                  title={
                    corralLleno
                      ? "Este corral ya está lleno"
                      : isOccupied
                        ? "Posición ocupada"
                        : isAlternaBloqueada
                          ? "Disponible cuando se completen las casillas claras"
                          : `Posición ${fila}${String(col).padStart(2, "0")}`
                  }
                >
                  {isSelected && <Check className="h-5 w-5" />}

                  {!isSelected && (isAlternaBloqueada || isOccupied) && (
                    <Lock
                      className={`h-4 w-4 ${
                        isOccupied ? "text-red-500" : "text-[#6B7280]/55"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}