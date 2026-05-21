const express = require("express");
const {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  desactivarUsuario,
} = require("../controllers/usuario.controller");

const router = express.Router();

router.get("/", obtenerUsuarios);
router.post("/", crearUsuario);
router.patch("/:id", actualizarUsuario);
router.patch("/:id/desactivar", desactivarUsuario);

module.exports = router;
