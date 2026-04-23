function PrivacyModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
      <div className="w-full max-w-[550px] rounded-[12px] border border-white/20 bg-[rgba(255,255,255,0.08)] shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-[12px]">
        <div className="border-b border-white/10 px-6 py-4">
          <h2 className="text-center text-[16px] font-bold uppercase text-white">
            Política de Privacidad
          </h2>
        </div>

        <div className="max-h-[70vh] overflow-y-auto scroll-hidden px-6 py-5 text-[12px] leading-[1.8] text-white/90">
          <p className="mb-4 font-semibold">Sistema IncuBase</p>

          <h3 className="mb-2 font-semibold">1. Introducción</h3>
          <p className="mb-4">
            El sistema IncuBase se compromete a proteger la privacidad de los
            usuarios y garantizar la seguridad de la información registrada dentro
            de la plataforma.
          </p>

          <h3 className="mb-2 font-semibold">2. Información que se recopila</h3>
          <p className="mb-2">
            El sistema puede recopilar la siguiente información:
          </p>
          <ul className="mb-4 list-disc pl-5">
            <li>Datos de usuario como nombre, correo y rol.</li>
            <li>Información registrada sobre corrales, nidos y monitoreo.</li>
            <li>Datos ambientales como temperatura y observaciones.</li>
            <li>Registros de nacimientos, liberaciones y estadísticas.</li>
          </ul>

          <h3 className="mb-2 font-semibold">3. Uso de la información</h3>
          <p className="mb-2">
            La información recopilada será utilizada para:
          </p>
          <ul className="mb-4 list-disc pl-5">
            <li>Gestionar y monitorear el proceso de incubación.</li>
            <li>Generar reportes y estadísticas.</li>
            <li>Facilitar la administración del sistema.</li>
          </ul>

          <h3 className="mb-2 font-semibold">4. Protección de la información</h3>
          <p className="mb-4">
            Se implementarán medidas de seguridad para proteger los datos contra
            accesos no autorizados, alteración o pérdida de información.
          </p>

          <h3 className="mb-2 font-semibold">5. Acceso a la información</h3>
          <p className="mb-4">
            Solo el personal autorizado podrá acceder a la información según su rol
            dentro del sistema.
          </p>

          <h3 className="mb-2 font-semibold">6. Responsabilidad del usuario</h3>
          <ul className="mb-4 list-disc pl-5">
            <li>Proteger sus credenciales de acceso.</li>
            <li>Garantizar el uso adecuado del sistema.</li>
          </ul>

          <h3 className="mb-2 font-semibold">7. Compartición de datos</h3>
          <p className="mb-4">
            La información registrada no será compartida con terceros, salvo en los
            casos requeridos por la ley o para fines académicos o de investigación
            cuando aplique.
          </p>

          <h3 className="mb-2 font-semibold">8. Conservación de datos</h3>
          <p className="mb-4">
            Los datos serán almacenados durante el tiempo necesario para cumplir con
            los fines del sistema.
          </p>

          <h3 className="mb-2 font-semibold">9. Cambios en la política</h3>
          <p className="mb-4">
            Esta política puede actualizarse en cualquier momento. El uso continuo
            del sistema implica la aceptación de dichos cambios.
          </p>

          <h3 className="mb-2 font-semibold">10. Contacto</h3>
          <p className="mb-2">
            Para consultas sobre esta política, los usuarios pueden comunicarse con
            el equipo desarrollador del sistema.
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

export default PrivacyModal