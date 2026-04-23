import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import AuthLayout from "../../layouts/AuthLayout"
import AuthCard from "../../components/auth/AuthCard"
import NoticeModal from "../../components/modals/NoticeModal"
import TermsModal from "../../components/modals/TermsModal"
import PrivacyModal from "../../components/modals/PrivacyModal"
import { loginRequest } from "../../services/auth.service"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [errorGeneral, setErrorGeneral] = useState("")
  const [loading, setLoading] = useState(false)

  const [mostrarAviso, setMostrarAviso] = useState(false)
  const [mostrarTerminos, setMostrarTerminos] = useState(false)
  const [mostrarPrivacidad, setMostrarPrivacidad] = useState(false)

  const [checks, setChecks] = useState({
    aviso: false,
    terminos: false,
    privacidad: false,
  })

  const [pendingToken, setPendingToken] = useState("")
  const [pendingUser, setPendingUser] = useState(null)

  const navigate = useNavigate()

  const validar = () => {
    const nuevosErrores = {}

    if (!email.trim()) {
      nuevosErrores.email = "El correo es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nuevosErrores.email = "Correo inválido"
    }

    if (!password.trim()) {
      nuevosErrores.password = "La contraseña es obligatoria"
    }

    return nuevosErrores
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validar())
  }

  const toggleCheck = (key) => {
    setChecks((prev) => {
      if (key === "aviso") {
        const newValue = !prev.aviso

        return {
          aviso: newValue,
          terminos: newValue,
          privacidad: newValue,
        }
      }

      const updated = {
        ...prev,
        [key]: !prev[key],
      }

      updated.aviso = updated.terminos && updated.privacidad

      return updated
    })
  }

  const marcarTerminosAceptados = () => {
    setChecks((prev) => {
      const updated = {
        ...prev,
        terminos: true,
      }

      updated.aviso = updated.terminos && updated.privacidad
      return updated
    })
  }

  const marcarPrivacidadAceptada = () => {
    setChecks((prev) => {
      const updated = {
        ...prev,
        privacidad: true,
      }

      updated.aviso = updated.terminos && updated.privacidad
      return updated
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorGeneral("")

    const nuevosErrores = validar()
    setErrors(nuevosErrores)
    setTouched({
      email: true,
      password: true,
    })

    if (Object.keys(nuevosErrores).length > 0) return

    try {
      setLoading(true)

      const response = await loginRequest({ email, password })
      const data = response.data

      setPendingToken(data.token)
      setPendingUser(data.usuario)

      setChecks({
        aviso: false,
        terminos: false,
        privacidad: false,
      })

      setMostrarAviso(true)
    } catch (error) {
      if (error.response?.data?.mensaje) {
        setErrorGeneral(error.response.data.mensaje)
      } else {
        setErrorGeneral("No se pudo conectar con el servidor")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmarAviso = () => {
    localStorage.setItem("token", pendingToken)
    localStorage.setItem("usuario", JSON.stringify(pendingUser))
    setMostrarAviso(false)
    navigate("/")
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

  return (
    <>
      <AuthLayout>
        <AuthCard
          title="INICIAR SESIÓN"
          subtitle="Accede Al Sistema IncuBase"
        >
          <form
            className="flex w-full max-w-[320px] flex-col"
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
                  }}
                  onBlur={() => handleBlur("email")}
                  className={getInputClasses("email")}
                />
              </div>

              {touched.email && errors.email && (
                <p className="mt-1 text-[10px] text-red-300">{errors.email}</p>
              )}
            </div>

            <div className="mb-4 w-full">
              <label className="mb-2 block text-[12px] font-medium text-white/90">
                Contraseña:
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-slate-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrorGeneral("")
                  }}
                  onBlur={() => handleBlur("password")}
                  className={getInputClasses("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-[15px] w-[15px]" />
                  ) : (
                    <Eye className="h-[15px] w-[15px]" />
                  )}
                </button>
              </div>

              {touched.password && errors.password && (
                <p className="mt-1 text-[10px] text-red-300">{errors.password}</p>
              )}
            </div>

            {errorGeneral && (
              <p className="mb-3 text-center text-[10px] text-red-300">
                {errorGeneral}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-[40px] w-full rounded-[6px] border border-white/45 bg-[#22c7ad] text-[11px] font-semibold uppercase tracking-[0.04em] text-white shadow-[0_4px_15px_rgba(23,187,154,0.28)] transition hover:bg-[#14a386] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "INGRESANDO..." : "INGRESAR"}
            </button>

            <p
              onClick={() => navigate("/forgot-password")}
              className="mt-4 cursor-pointer text-center text-[12px] text-white/80 hover:text-white hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </p>

            <div className="mt-7 flex items-center justify-between text-[10px] text-white/80">
              <p
                onClick={() => setMostrarTerminos(true)}
                className="cursor-pointer hover:text-white hover:underline"
              >
                Términos y Condiciones
              </p>

              <p
                onClick={() => setMostrarPrivacidad(true)}
                className="cursor-pointer hover:text-white hover:underline"
              >
                Política de Privacidad
              </p>
            </div>
          </form>
        </AuthCard>
      </AuthLayout>

      {mostrarAviso && (
        <NoticeModal
          onClose={() => setMostrarAviso(false)}
          onOpenTerms={() => setMostrarTerminos(true)}
          onOpenPrivacy={() => setMostrarPrivacidad(true)}
          onConfirm={handleConfirmarAviso}
          checks={checks}
          onToggleCheck={toggleCheck}
        />
      )}

      {mostrarTerminos && (
        <TermsModal
          onClose={() => setMostrarTerminos(false)}
          onAccept={marcarTerminosAceptados}
        />
      )}

      {mostrarPrivacidad && (
        <PrivacyModal
          onClose={() => setMostrarPrivacidad(false)}
          onAccept={marcarPrivacidadAceptada}
        />
      )}
    </>
  )
}

export default Login