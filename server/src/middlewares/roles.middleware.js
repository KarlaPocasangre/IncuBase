const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    const usuario = req.usuario;

    if (!usuario) {
      return res.status(401).json({
        success: false,
        mensaje: "Usuario no autenticado",
      });
    }

    const rolUsuario = usuario.rol;

    if (!rolUsuario || !rolesPermitidos.includes(rolUsuario)) {
      return res.status(403).json({
        success: false,
        mensaje: "No tienes permisos para acceder a este recurso",
      });
    }

    next();
  };
};

module.exports = verificarRol;