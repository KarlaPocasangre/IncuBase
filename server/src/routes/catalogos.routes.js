const express = require("express");
const {
  obtenerRoles,
  obtenerEstadosUsuario,
} = require("../controllers/catalogos.controller");

const router = express.Router();

router.get("/roles", obtenerRoles);
router.get("/estados-usuario", obtenerEstadosUsuario);

module.exports = router;
