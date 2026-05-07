import { useState } from "react";

function NoticeModal({ onClose, onOpenTerms, onOpenPrivacy, onConfirm }) {
  const [checks, setChecks] = useState({
    aviso: false,
    terminos: false,
    privacidad: false,
  });

  const handleCheck = (key) => {
    setChecks((prev) => {
      if (key === "aviso") {
        const newValue = !prev.aviso;

        return {
          aviso: newValue,
          terminos: newValue,
          privacidad: newValue,
        };
      }

      const updated = {
        ...prev,
        [key]: !prev[key],
      };

      updated.aviso = updated.terminos && updated.privacidad;

      return updated;
    });
  };

  const allChecked = checks.aviso && checks.terminos && checks.privacidad;

  const handleConfirm = () => {
    if (!allChecked) return;
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-[550px] rounded-[12px] border border-white/20 bg-[rgba(255,255,255,0.08)] shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-[12px]">
        <div className="px-6 pt-6 pb-4 text-white">
          <h2 className="text-center text-[18px] font-bold uppercase tracking-[0.02em]">
            Aviso
          </h2>

          <div className="mt-6 rounded-[10px] border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-[12px] leading-[1.8] text-white/90 text-justify">
              Antes de continuar, confirma que has leído y aceptado la
              información correspondiente al uso del sistema, así como los
              Términos y Condiciones y la Política de Privacidad. Solo podrás
              avanzar cuando marques las tres opciones de confirmación.
            </p>
          </div>

          <div className="mt-6 space-y-4 text-white/90">
            <label className="flex items-start gap-3 rounded-[10px] border border-white/10 bg-white/5 px-4 py-3">
              <input
                type="checkbox"
                checked={checks.aviso}
                onChange={() => handleCheck("aviso")}
                className="mt-1 h-4 w-4 accent-[#22c7ad]"
              />
              <span className="text-[12px] leading-[1.7] text-justify">
                He leído y acepto todo lo que se indica en este aviso.
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-[10px] border border-white/10 bg-white/5 px-4 py-3">
              <input
                type="checkbox"
                checked={checks.terminos}
                onChange={() => handleCheck("terminos")}
                className="mt-1 h-4 w-4 accent-[#22c7ad]"
              />
              <span className="text-[12px] leading-[1.7] text-justify">
                He leído y acepto los{" "}
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="font-semibold text-[#ffd54f] hover:underline"
                >
                  Términos y Condiciones
                </button>
                .
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-[10px] border border-white/10 bg-white/5 px-4 py-3">
              <input
                type="checkbox"
                checked={checks.privacidad}
                onChange={() => handleCheck("privacidad")}
                className="mt-1 h-4 w-4 accent-[#22c7ad]"
              />
              <span className="text-[12px] leading-[1.7] text-justify">
                He leído y acepto la{" "}
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="font-semibold text-[#ffd54f] hover:underline"
                >
                  Política de Privacidad
                </button>
                .
              </span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 px-6 pb-6 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="h-[38px] w-[140px] rounded-[6px] border border-white/35 bg-white/10 text-[11px] font-semibold uppercase tracking-[0.04em] text-white transition hover:bg-white/15"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!allChecked}
            className="h-[38px] w-[170px] rounded-[6px] border border-white/45 bg-[#22c7ad] text-[11px] font-semibold uppercase tracking-[0.04em] text-white shadow-[0_4px_15px_rgba(23,187,154,0.28)] transition hover:bg-[#14a386] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirmar y continuar
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoticeModal;