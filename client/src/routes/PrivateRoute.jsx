import { Navigate } from "react-router-dom";

function PrivateRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const usuarioGuardado = localStorage.getItem("usuario");

  let usuario = null;

  try {
    usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  } catch (error) {
    console.error("Error leyendo usuario desde localStorage:", error);
    localStorage.removeItem("usuario");
  }

  if (!token) {
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