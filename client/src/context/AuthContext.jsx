import { createContext, useContext, useEffect, useState } from "react";
import { perfilRequest, logoutRequest } from "../services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const cargarPerfil = async () => {
    try {
      setLoadingAuth(true);

      const response = await perfilRequest();
      const usuarioPerfil = response.data.usuario;

      setUsuario(usuarioPerfil);

      return usuarioPerfil;
    } catch (error) {
      setUsuario(null);
      return null;
    } finally {
      setLoadingAuth(false);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    } finally {
      setUsuario(null);
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  const value = {
    usuario,
    loadingAuth,
    autenticado: Boolean(usuario),
    cargarPerfil,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
