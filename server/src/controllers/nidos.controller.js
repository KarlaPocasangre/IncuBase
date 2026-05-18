const nidosService = require('../services/nidos.service')

const obtenerNidosPorCorral = async (req, res) => {
  try {
    const nidos = await nidosService.obtenerNidosPorCorral(req.params.idCorral)
    res.json(nidos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener nidos del corral' })
  }
}

const crearNido = async (req, res) => {
  try {
    const nido = await nidosService.crearNido(req.body)
    res.status(201).json(nido)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear nido' })
  }
}

module.exports = {
  obtenerNidosPorCorral,
  crearNido,
}