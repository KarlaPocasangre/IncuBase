export default function ProtocoloCorral() {
  return (
    <div className="rounded-2xl border border-[#BFD8D2] bg-[#EAF3F0] px-6 py-5">
      <h3 className="text-sm font-semibold text-[#111827]">
        Protocolo de llenado del corral
      </h3>

      <div className="mt-4 flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex items-start gap-3">
          <div className="h-6 w-6 rounded bg-white border border-[#D7E4E0]" />
          <p className="text-sm text-[#374151]">
            <span className="font-semibold text-[#007A4D]">Primero:</span> Se
            llenan todas las casillas claras siguiendo el patrón alterno desde
            la esquina opuesta a la puerta
          </p>
        </div>

        <div className="flex items-start gap-3">
          <div className="h-6 w-6 rounded bg-[#BFD8D2]" />
          <p className="text-sm text-[#374151]">
            <span className="font-semibold text-[#007A4D]">Luego:</span> Una vez
            completadas las claras, se continúa con las casillas oscuras
            alternas
          </p>
        </div>
      </div>
    </div>
  );
}
