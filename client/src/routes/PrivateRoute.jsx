import { Navigate } from "react-router-dom";

function PrivateRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const storedUsuario = localStorage.getItem("usuario");

  const usuario = storedUsuario ? JSON.parse(storedUsuario) : null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(usuario?.rol)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}

export default PrivateRoute;
