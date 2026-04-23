import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, Eye, EyeOff } from "lucide-react"
import AuthLayout from "../../layouts/AuthLayout"
import AuthCard from "../../components/auth/AuthCard"
import { resetPasswordRequest } from "../../services/auth.service"

function ResetPassword() {
  const navigate = useNavigate()

  const [nuevaPassword, setNuevaPassword] = useState("")
  const [confirmarPassword, setConfirmarPassword] = useState("")
  const [showNueva, setShowNueva] = useState(false)
  const [showConfirmar, setShowConfirmar] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [errorGeneral, setErrorGeneral] = useState("")
  const [mensajeExito, setMensajeExito] = useState("")
  const [loading, setLoading] = useState(false)

  const validar = () => {
    const nuevosErrores = {}

    if (!nuevaPassword.trim()) {
      nuevosErrores.nuevaPassword = "La nueva contraseña es obligatoria"
    } else if (nuevaPassword.length < 8) {
      nuevosErrores.nuevaPassword = "Debe tener al menos 8 caracteres"
    } else if (!/[A-Z]/.test(nuevaPassword)) {
      nuevosErrores.nuevaPassword = "Debe incluir al menos una mayúscula"
    } else if (!/[a-z]/.test(nuevaPassword)) {
      nuevosErrores.nuevaPassword = "Debe incluir al menos una minúscula"
    } else if (!/[0-9]/.test(nuevaPassword)) {
      nuevosErrores.nuevaPassword = "Debe incluir al menos un número"
    }

    if (!confirmarPassword.trim()) {
      nuevosErrores.confirmarPassword = "Debes confirmar la contraseña"
    } else if (nuevaPassword !== confirmarPassword) {
      nuevosErrores.confirmarPassword = "Las contraseñas no coinciden"
    }

    return nuevosErrores
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validar())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorGeneral("")
    setMensajeExito("")

    const nuevosErrores = validar()
    setErrors(nuevosErrores)
    setTouched({
      nuevaPassword: true,
      confirmarPassword: true,
    })

    if (Object.keys(nuevosErrores).length > 0) return

    try {
      setLoading(true)

      const email = localStorage.getItem("emailRecuperacion")
      const codigo = localStorage.getItem("codigoRecuperacion")

      const response = await resetPasswordRequest({
        email,
        codigo,
        nuevaPassword,
      })

      setMensajeExito(
        response.data.mensaje || "Contraseña actualizada correctamente"
      )

      localStorage.removeItem("emailRecuperacion")
      localStorage.removeItem("codigoRecuperacion")

      setTimeout(() => {
        navigate("/login")
      }, 1500)
    } catch (error) {
      if (error.response?.data?.mensaje) {
        setErrorGeneral(error.response.data.mensaje)
      } else {
        setErrorGeneral("Error al cambiar contraseña")
      }
    } finally {
      setLoading(false)
    }
  }

  const getInputClasses = (field) => {
    const base =
      "h-[40px] w-full rounded-[6px] border bg-[#ECEFF1] pl-10 pr-10 text-[12px] text-slate-700 outline-none transition placeholder:text-slate-400"

    if (!touched[field]) {
      return `${base} border-[#cfd8dc] focus:border-[#17bb9a]`
    }

    if (errors[field]) {
      return `${base} border-red-400 focus:border-red-500`
    }

    return `${base} border-[#17bb9a] focus:border-[#17bb9a]`
  }

  const getIconColor = (field) => {
    if (!touched[field]) return "text-slate-500"
    if (errors[field]) return "text-red-500"
    return "text-[#17bb9a]"
  }

  return (
    <AuthLayout>
      <AuthCard
        title="NUEVA CONTRASEÑA"
        subtitle="Ingresa tu nueva contraseña"
        alignTop={true}
      >
        <form
          className="flex w-full max-w-[300px] flex-col"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 w-full">
            <label className="mb-2 block text-[12px] font-medium text-white/90">
              Nueva contraseña:
            </label>

            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 ${getIconColor(
                  "nuevaPassword"
                )}`}
              />

              <input
                type={showNueva ? "text" : "password"}
                placeholder="••••••••"
                value={nuevaPassword}
                onChange={(e) => {
                  setNuevaPassword(e.target.value)
                  setErrorGeneral("")
                  setMensajeExito("")
                }}
                onBlur={() => handleBlur("nuevaPassword")}
                className={getInputClasses("nuevaPassword")}
              />

              <button
                type="button"
                onClick={() => setShowNueva(!showNueva)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showNueva ? (
                  <EyeOff className="h-[15px] w-[15px]" />
                ) : (
                  <Eye className="h-[15px] w-[15px]" />
                )}
              </button>
            </div>

            {touched.nuevaPassword && errors.nuevaPassword && (
              <p className="mt-1 text-[10px] text-red-300">
                {errors.nuevaPassword}
              </p>
            )}
          </div>

          <div className="mb-4 w-full">
            <label className="mb-2 block text-[12px] font-medium text-white/90">
              Confirmar contraseña:
            </label>

            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 ${getIconColor(
                  "confirmarPassword"
                )}`}
              />

              <input
                type={showConfirmar ? "text" : "password"}
                placeholder="••••••••"
                value={confirmarPassword}
                onChange={(e) => {
                  setConfirmarPassword(e.target.value)
                  setErrorGeneral("")
                  setMensajeExito("")
                }}
                onBlur={() => handleBlur("confirmarPassword")}
                className={getInputClasses("confirmarPassword")}
              />

              <button
                type="button"
                onClick={() => setShowConfirmar(!showConfirmar)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showConfirmar ? (
                  <EyeOff className="h-[15px] w-[15px]" />
                ) : (
                  <Eye className="h-[15px] w-[15px]" />
                )}
              </button>
            </div>

            {touched.confirmarPassword && errors.confirmarPassword && (
              <p className="mt-1 text-[10px] text-red-300">
                {errors.confirmarPassword}
              </p>
            )}
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
            {loading ? "RESTABLECIENDO..." : "RESTABLECER"}
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}

export default ResetPassword