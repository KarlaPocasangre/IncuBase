import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthLayout from "../../layouts/AuthLayout"
import AuthCard from "../../components/auth/AuthCard"
import {
  verifyCodeRequest,
  forgotPasswordRequest,
} from "../../services/auth.service"

function VerifyCode() {
  const navigate = useNavigate()

  const [codigo, setCodigo] = useState(["", "", "", "", "", ""])
  const [errorGeneral, setErrorGeneral] = useState("")
  const [mensajeExito, setMensajeExito] = useState("")
  const [loading, setLoading] = useState(false)
  const [reenviando, setReenviando] = useState(false)

  const inputRefs = useRef([])

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return

    const nuevoCodigo = [...codigo]
    nuevoCodigo[index] = value
    setCodigo(nuevoCodigo)
    setErrorGeneral("")
    setMensajeExito("")

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()

    const texto = e.clipboardData.getData("text").trim()

    if (!/^\d{6}$/.test(texto)) return

    const nuevoCodigo = texto.split("")
    setCodigo(nuevoCodigo)
    inputRefs.current[5]?.focus()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrorGeneral("")
    setMensajeExito("")

    const codigoCompleto = codigo.join("")

    if (codigoCompleto.length !== 6) {
      setErrorGeneral("El código debe tener 6 dígitos")
      return
    }

    try {
      setLoading(true)

      const email = localStorage.getItem("emailRecuperacion")

      const response = await verifyCodeRequest({
        email,
        codigo: codigoCompleto,
      })

      setMensajeExito(response.data.mensaje || "Código válido")

      localStorage.setItem(
        "codigoRecuperacion",
        codigoCompleto
      )

      setTimeout(() => {
        navigate("/reset-password")
      }, 1200)
    } catch (error) {
      if (error.response?.data?.mensaje) {
        setErrorGeneral(error.response.data.mensaje)
      } else {
        setErrorGeneral("Error al verificar el código")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleReenviarCodigo = async () => {
    try {
      setReenviando(true)
      setErrorGeneral("")
      setMensajeExito("")

      const email = localStorage.getItem("emailRecuperacion")

      if (!email) {
        setErrorGeneral("No se encontró el correo")
        return
      }

      const response = await forgotPasswordRequest({ email })

      setMensajeExito(
        response.data.mensaje || "Código reenviado correctamente"
      )
    } catch (error) {
      if (error.response?.data?.mensaje) {
        setErrorGeneral(error.response.data.mensaje)
      } else {
        setErrorGeneral("No se pudo reenviar el código")
      }
    } finally {
      setReenviando(false)
    }
  }

  const inputClass = errorGeneral
    ? "h-[36px] w-[36px] rounded-[6px] border border-red-400 bg-[#ECEFF1] text-center text-[13px] font-semibold text-slate-700 outline-none transition focus:border-red-500"
    : "h-[36px] w-[36px] rounded-[6px] border border-[#cfd8dc] bg-[#ECEFF1] text-center text-[13px] font-semibold text-slate-700 outline-none transition focus:border-[#17bb9a]"

  return (
    <AuthLayout>
      <AuthCard
        title="VERIFICAR CÓDIGO"
        subtitle="Ingresa el código enviado"
        alignTop={true}
      >
        <form
          className="flex w-full max-w-[300px] flex-col pt-1"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 w-full">
            <div
              className="mt-2 flex w-fit gap-1.5"
              onPaste={handlePaste}
            >
              {codigo.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) =>
                    (inputRefs.current[index] = el)
                  }
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, index)
                  }
                  className={inputClass}
                />
              ))}
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

          <p className="mb-3 text-center text-[10px] text-white/80">
            Introduce el código de 6 dígitos que te enviamos
          </p>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-[38px] w-[240px] self-center rounded-[6px] border border-white/45 bg-[#22c7ad] text-[11px] font-semibold uppercase tracking-[0.04em] text-white shadow-[0_4px_15px_rgba(23,187,154,0.28)] transition hover:bg-[#14a386] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "VERIFICANDO..." : "VERIFICAR"}
          </button>

          <p className="mt-5 text-center text-[12px] text-white">
            ¿No recibiste el código?{" "}
            <span
              onClick={handleReenviarCodigo}
              className="cursor-pointer font-medium hover:text-white/90 hover:underline"
            >
              {reenviando ? "Reenviando..." : "Reenviar"}
            </span>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}

export default VerifyCode