const express = require("express");

const {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  desactivarUsuario,
} = require("../controllers/usuario.controller");

const verificarToken = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", verificarToken, obtenerUsuarios);
router.post("/", verificarToken, crearUsuario);
router.patch("/:id", verificarToken, actualizarUsuario);
router.patch("/:id/desactivar", verificarToken, desactivarUsuario);

module.exports = router;
