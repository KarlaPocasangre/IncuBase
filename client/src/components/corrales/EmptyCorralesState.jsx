import { Fence } from "lucide-react";

function EmptyCorralesState({
  title = "No hay corrales registrados",
  description = "Registra un corral antes de seleccionar una posición para el nido.",
}) {
  return (
    <section className="flex min-h-[520px] flex-col rounded-2xl border border-[#C9DDD8] bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-base font-bold text-[#163832]">
          Selección de posición
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          No hay corrales disponibles para seleccionar.
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#F4F8F6] text-[#7A8A86]">
          <Fence size={46} strokeWidth={1.6} />
        </div>

        <h3 className="text-[18px] font-medium text-[#6B7C77]">{title}</h3>

        <p className="mt-2 max-w-[360px] text-sm text-[#8B9A96]">
          {description}
        </p>
      </div>
    </section>
  );
}

export default EmptyCorralesState;
