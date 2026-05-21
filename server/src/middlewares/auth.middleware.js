const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        mensaje: "No autenticado",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      mensaje: "Sesión inválida o expirada",
    });
  }
};

module.exports = verificarToken;
