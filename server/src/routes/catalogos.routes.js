const express = require("express");

const {
  obtenerRoles,
  obtenerEstadosUsuario,
  obtenerTiposCorral,
  obtenerEstadosCorral,
} = require("../controllers/catalogos.controller");

const router = express.Router();

router.get("/roles", obtenerRoles);
router.get("/estados-usuario", obtenerEstadosUsuario);
router.get("/tipos-corral", obtenerTiposCorral);
router.get("/estados-corral", obtenerEstadosCorral);

module.exports = router;