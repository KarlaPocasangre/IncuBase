import logo from "../../assets/incubase-logo-sin-fondo.png"
import playa from "../../assets/fondo_login.jpeg"

function AuthCard({
  children,
  title,
  subtitle,
  alignTop = false,
}) {
  const tituloLargo = title.length > 18

  return (
    <div className="w-full max-w-[400px] overflow-hidden rounded-[12px] border border-white/20 bg-[rgba(255,255,255,0.08)] shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-[12px] lg:max-w-[550px]">
      <div className="grid min-h-[100px] lg:grid-cols-[1.15fr_0.85fr]">
        <div
          className={`flex flex-col px-6 py-7 text-white sm:px-7 md:px-8 ${
            alignTop ? "justify-start pt-8" : "justify-center"
          }`}
        >
          <div className="relative flex items-center justify-center">
            <img
              src={logo}
              alt="Logo"
              className="absolute -left-3 h-[58px] w-[58px] object-contain opacity-95"
            />

            <div className="ml-3 flex flex-col items-center text-center">
              <h2
                className={`font-bold uppercase tracking-[0.01em] ${
                  tituloLargo
                    ? "text-[12px] leading-[1.15]"
                    : "text-[15px] leading-[1.1]"
                }`}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {title}
              </h2>

              <p className="mt-3 max-w-[260px] text-[12px] leading-[1.5] text-white/75">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="mt-8">
            {children}
          </div>
        </div>

        <div className="hidden h-full lg:block">
          <img
            src={playa}
            alt="Playa"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default AuthCard