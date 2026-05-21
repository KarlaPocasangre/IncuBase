import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function PrivateRoute({ children, allowedRoles }) {
  const { usuario, loadingAuth, autenticado } = useAuth();

  if (loadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EEF3F0] px-4">
        <div className="rounded-2xl border border-[#D8E5DF] bg-white px-8 py-6 text-center shadow-sm">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#D8E5DF] border-t-[#163832]" />

          <p className="text-sm font-semibold text-[#163832]">
            Verificando sesión...
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Espera un momento, estamos validando tu acceso.
          </p>
        </div>
      </div>
    );
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const rolUsuario = usuario?.rol;

    if (!rolUsuario || !allowedRoles.includes(rolUsuario)) {
      return <Navigate to="/403" replace />;
    }
  }

  return children;
}

export default PrivateRoute;
