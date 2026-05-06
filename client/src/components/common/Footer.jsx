import logo from "../../assets/logo-tortugaSVG.svg";
function Footer() {
  return (
    <footer className="bg-white border-t border-[#D6E1DE] px-10 py-5">
      {" "}
      <div className="flex items-start justify-between gap-8">
        {" "}
        <div className="flex items-start gap-3">
          {" "}
          <img
            src={logo}
            alt="IncuBase"
            className="h-10 w-10 object-contain"
          />{" "}
          <div>
            {" "}
            <h3 className="text-sm font-semibold text-[#163832]">
              Incubase
            </h3>{" "}
            <p className="text-xs text-gray-500">
              {" "}
              Sistema de gestión y monitoreo de huevos de Tortugas Marinas{" "}
            </p>{" "}
            <p className="text-[10px] text-gray-400 mt-4">
              {" "}
              © 2026 Kaxierjo. Todos los derechos reservados.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div>
          {" "}
          <h4 className="text-xs font-semibold text-gray-600 mb-2">
            Legal
          </h4>{" "}
          <p className="text-xs text-gray-500 underline cursor-pointer">
            {" "}
            Política de Privacidad{" "}
          </p>{" "}
          <p className="text-xs text-gray-500 underline cursor-pointer mt-1">
            {" "}
            Términos y Condiciones{" "}
          </p>{" "}
        </div>{" "}
        <div>
          {" "}
          <h4 className="text-xs font-semibold text-gray-600 mb-2">
            Soporte
          </h4>{" "}
          <p className="text-xs text-gray-500">kaxierjo@gmail.com</p>{" "}
          <p className="text-xs text-gray-500 underline mt-1">24208225</p>{" "}
        </div>{" "}
      </div>{" "}
    </footer>
  );
}
export default Footer;
