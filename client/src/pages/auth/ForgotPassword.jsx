import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail } from "lucide-react"
import AuthLayout from "../../layouts/AuthLayout"
import AuthCard from "../../components/auth/AuthCard"
import { forgotPasswordRequest } from "../../services/auth.service"

function ForgotPassword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [errorGeneral, setErrorGeneral] = useState("")
  const [mensajeExito, setMensajeExito] = useState("")
  const [loading, setLoading] = useState(false)

  const validarCorreo = () => {
    if (!email.trim()) {
      return "El correo es obligatorio"
    }

    const regexCorreo = /\S+@\S+\.\S+/
    if (!regexCorreo.test(email)) {
      return "Correo inválido"
    }

    return ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorGeneral("")
    setMensajeExito("")

    const errorCorreo = validarCorreo()
    if (errorCorreo) {
      setErrorGeneral(errorCorreo)
      return
    }

    try {
      setLoading(true)

      const response = await forgotPasswordRequest({ email })

      localStorage.setItem("emailRecuperacion", email)

      setMensajeExito(response.data.mensaje || "Código enviado al correo")

      setTimeout(() => {
        navigate("/verify-code")
      }, 1200)
    } catch (error) {
      if (error.response?.data?.mensaje) {
        setErrorGeneral(error.response.data.mensaje)
      } else {
        setErrorGeneral("Error al enviar el código")
      }
    } finally {
      setLoading(false)
    }
  }

  const inputClasses = errorGeneral
    ? "h-[40px] w-full rounded-[6px] border border-red-400 bg-[#ECEFF1] pl-10 pr-4 text-[12px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-red-500"
    : "h-[40px] w-full rounded-[6px] border border-[#cfd8dc] bg-[#ECEFF1] pl-10 pr-4 text-[12px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#17bb9a]"

  return (
    <AuthLayout>
      <AuthCard
        title="RECUPERAR ACCESO"
        subtitle="Ingresa tu correo"
        alignTop={true}
      >
        <form
          className="flex w-full max-w-[300px] flex-col"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 w-full">
            <label className="mb-2 block text-[12px] font-medium text-white/90">
              Correo electrónico:
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-slate-500" />

              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setErrorGeneral("")
                  setMensajeExito("")
                }}
                className={inputClasses}
              />
            </div>
          </div>

          {errorGeneral && (
            <p className="mb-3 w-full text-center text-[10px] text-red-300">
              {errorGeneral}
            </p>
          )}

          {mensajeExito && (
            <p className="mb-3 w-full text-center text-[10px] text-emerald-300">
              {mensajeExito}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-[40px] w-full rounded-[6px] border border-white/45 bg-[#22c7ad] text-[11px] font-semibold uppercase tracking-[0.04em] text-white shadow-[0_4px_15px_rgba(23,187,154,0.28)] transition hover:bg-[#14a386] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "ENVIANDO..." : "ENVIAR CÓDIGO"}
          </button>

          <p
            onClick={() => navigate("/login")}
            className="mt-5 cursor-pointer text-center text-[12px] text-white hover:text-white/90 hover:underline"
          >
            Volver al inicio de sesión
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}

export default ForgotPassword