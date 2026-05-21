const express = require("express");
const router = express.Router();

const corralesController = require("../controllers/corrales.controller");

router.get("/", corralesController.obtenerCorrales);
router.post("/", corralesController.crearCorral);
router.put("/:id", corralesController.actualizarCorral);
router.patch("/:id/cerrar", corralesController.cerrarCorral);

module.exports = router;