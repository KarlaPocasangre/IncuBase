import { Wrench, Home, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Maintenance() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EEF3F0] px-4 py-8">
      <section className="relative w-full max-w-[560px] overflow-hidden rounded-[28px] border border-white/70 bg-white px-8 py-10 text-center shadow-[0_24px_70px_rgba(22,56,50,0.18)]">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#163832]/10" />
        <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#163832]/10" />

        <div className="relative z-10">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <Wrench size={42} strokeWidth={2.2} />
          </div>

          <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.28em] text-amber-600/80">
            Mantenimiento
          </p>

          <h1 className="text-[54px] font-black leading-none text-[#163832] sm:text-[66px]">
            Pausa técnica
          </h1>

          <h2 className="mt-4 text-[24px] font-bold text-[#163832]">
            Sistema en mantenimiento
          </h2>

          <p className="mx-auto mt-3 max-w-[410px] text-[14px] leading-6 text-gray-500">
            Estamos realizando ajustes para mejorar el sistema. Intenta ingresar
            nuevamente más tarde.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#163832] px-5 py-3 text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(22,56,50,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0f2925] sm:w-auto"
            >
              <RefreshCw size={18} />
              Intentar nuevamente
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex w-full items-center justify-center gap-2 rounded-[14px] border border-[#163832]/20 bg-white px-5 py-3 text-[14px] font-semibold text-[#163832] transition hover:-translate-y-0.5 hover:bg-[#163832]/5 sm:w-auto"
            >
              <Home size={18} />
              Ir al login
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Maintenance;
