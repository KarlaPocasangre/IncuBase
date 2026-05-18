const express = require('express')
const router = express.Router()

const nidosController = require('../controllers/nidos.controller')

router.get('/corral/:idCorral', nidosController.obtenerNidosPorCorral)
router.post('/', nidosController.crearNido)

module.exports = router