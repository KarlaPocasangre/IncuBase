import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  ShieldCheck,
  FileText,
  BookOpen,
  ExternalLink,
} from "lucide-react";

import logo from "../../assets/logo-tortugaSVG.svg";

import PrivacyModal from "../legal/PrivacyModal";
import TermsModal from "../legal/TermsModal";

function Footer() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <>
      <footer className="shrink-0 border-t border-[#D6E1DE] bg-white px-8 py-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E9F5F1]">
              <img
                src={logo}
                alt="IncuBase"
                className="h-8 w-8 object-contain"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-bold text-[#163832]">IncuBase</h3>

              <p className="mt-1 max-w-[420px] text-xs leading-relaxed text-slate-500">
                Sistema de gestión y monitoreo de huevos de Tortugas Marinas.
              </p>

              <p className="mt-4 text-[11px] text-slate-400">
                © 2026 Kaxierjo. Todos los derechos reservados.
              </p>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#163832]">
              Legal
            </h4>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="group inline-flex w-fit items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-[#0F6B3D]"
              >
                <ShieldCheck size={14} className="text-[#7BB9A0]" />
                Política de Privacidad
              </button>

              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="group inline-flex w-fit items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-[#0F6B3D]"
              >
                <FileText size={14} className="text-[#7BB9A0]" />
                Términos y Condiciones
              </button>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#163832]">
              Información
            </h4>

            <Link
              to="/guia-incubase"
              className="inline-flex w-fit items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-[#0F6B3D]"
            >
              <BookOpen size={14} className="text-[#7BB9A0]" />
              Guía IncuBase
              <ExternalLink size={12} className="opacity-60" />
            </Link>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#163832]">
              Soporte
            </h4>

            <div className="flex flex-col gap-2">
              <a
                href="mailto:kaxierjo@gmail.com"
                className="inline-flex w-fit items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-[#0F6B3D]"
              >
                <Mail size={14} className="text-[#7BB9A0]" />
                kaxierjo@gmail.com
              </a>

              <a
                href="tel:24208225"
                className="inline-flex w-fit items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-[#0F6B3D]"
              >
                <Phone size={14} className="text-[#7BB9A0]" />
                24208225
              </a>
            </div>
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
