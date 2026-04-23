function TermsModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
      <div className="w-full max-w-[550px] rounded-[12px] border border-white/20 bg-[rgba(255,255,255,0.08)] shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-[12px]">
        <div className="border-b border-white/10 px-6 py-4">
          <h2 className="text-center text-[16px] font-bold uppercase text-white">
            Términos y Condiciones
          </h2>
        </div>

        <div className="max-h-[70vh] overflow-y-auto scroll-hidden px-6 py-5 text-[12px] leading-[1.8] text-white/90">
          <p className="mb-4 font-semibold">Sistema IncuBase</p>

          <p className="mb-4">
            IncuBase es un sistema web diseñado para la gestión, registro y monitoreo
            de la incubación de huevos de tortugas marinas, permitiendo el registro
            de corrales, nidos biológicos, monitoreo de temperatura y condiciones
            ambientales, así como la generación de reportes y estadísticas.
          </p>

          <h3 className="mb-2 font-semibold">1. Aceptación de los términos</h3>
          <p className="mb-4">
            El uso de IncuBase implica la aceptación de estos términos. Si no estás
            de acuerdo, no debes utilizar la plataforma.
          </p>

          <h3 className="mb-2 font-semibold">2. Acceso</h3>
          <p className="mb-4">
            El sistema es solo para usuarios autorizados. Cada usuario es responsable
            del uso de su cuenta, contraseña y de mantener la confidencialidad de sus
            credenciales.
          </p>

          <h3 className="mb-2 font-semibold">3. Responsabilidades del usuario</h3>
          <ul className="mb-4 list-disc pl-5">
            <li>Ingresar información verídica y correcta.</li>
            <li>Usar el sistema de manera adecuada.</li>
            <li>No acceder a información sin autorización.</li>
          </ul>

          <h3 className="mb-2 font-semibold">4. Datos</h3>
          <p className="mb-4">
            La información registrada será utilizada únicamente para fines de gestión,
            monitoreo y análisis relacionados con el funcionamiento del sistema.
          </p>

          <h3 className="mb-2 font-semibold">5. Disponibilidad</h3>
          <p className="mb-4">
            El sistema puede no estar disponible temporalmente por mantenimiento o
            fallas técnicas.
          </p>

          <h3 className="mb-2 font-semibold">6. Responsabilidad</h3>
          <p className="mb-4">
            El equipo no se hace responsable por errores derivados de datos ingresados
            incorrectamente por el usuario o por problemas externos al sistema.
          </p>

          <h3 className="mb-2 font-semibold">7. Cambios</h3>
          <p className="mb-4">
            Estos términos pueden actualizarse en cualquier momento. El uso continuo
            del sistema implica la aceptación de dichos cambios.
          </p>

          <h3 className="mb-2 font-semibold">8. Suspensión de acceso</h3>
          <p className="mb-4">
            Se podrá bloquear el acceso a usuarios que hagan mal uso del sistema o
            incumplan estas condiciones.
          </p>

          <h3 className="mb-2 font-semibold">9. Legislación</h3>
          <p className="mb-2">
            Estos términos se rigen por las leyes aplicables de El Salvador.
          </p>

          <p className="mt-8 text-right text-[11px] text-white/70">
            Última fecha de actualización: 19/04/2026
          </p>
        </div>

        <div className="flex justify-center px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-[38px] w-[140px] rounded-[6px] border border-white/45 bg-[#22c7ad] text-[11px] font-semibold uppercase tracking-[0.04em] text-white shadow-[0_4px_15px_rgba(23,187,154,0.28)] transition hover:bg-[#14a386]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}

export default TermsModal