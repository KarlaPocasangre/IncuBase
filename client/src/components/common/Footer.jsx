import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-tortugaSVG.svg";

import PrivacyModal from "../legal/PrivacyModal";
import TermsModal from "../legal/TermsModal";

function Footer() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <>
      <footer className="bg-white border-t border-[#D6E1DE] px-10 py-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr]">
          <div className="flex items-start gap-3">
            <img
              src={logo}
              alt="IncuBase"
              className="h-10 w-10 object-contain"
            />

            <div>
              <h3 className="text-sm font-semibold text-[#163832]">Incubase</h3>

              <p className="text-xs text-gray-500">
                Sistema de gestión y monitoreo de huevos de Tortugas Marinas
              </p>

              <p className="text-[10px] text-gray-400 mt-4">
                © 2026 Kaxierjo. Todos los derechos reservados.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-600 mb-2">Legal</h4>

            <button
              type="button"
              onClick={() => setShowPrivacyModal(true)}
              className="block text-xs text-gray-500 underline cursor-pointer transition-colors hover:text-[#163832]"
            >
              Política de Privacidad
            </button>

            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="mt-1 block text-xs text-gray-500 underline cursor-pointer transition-colors hover:text-[#163832]"
            >
              Términos y Condiciones
            </button>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-600 mb-2">
              Información
            </h4>

            <Link
              to="/guia-incubase"
              className="block text-xs text-gray-500 underline transition-colors hover:text-[#163832]"
            >
              Guía IncuBase
            </Link>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-600 mb-2">
              Soporte
            </h4>

            <p className="text-xs text-gray-500">kaxierjo@gmail.com</p>

            <p className="text-xs text-gray-500 underline mt-1">24208225</p>
          </div>
        </div>
      </footer>

      {showPrivacyModal && (
        <PrivacyModal onClose={() => setShowPrivacyModal(false)} />
      )}

      {showTermsModal && (
        <TermsModal onClose={() => setShowTermsModal(false)} />
      )}
    </>
  );
}

export default Footer;
