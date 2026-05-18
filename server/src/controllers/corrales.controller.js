const corralesService = require('../services/corrales.service')

const obtenerCorrales = async (req, res) => {
  try {
    const corrales = await corralesService.obtenerCorrales()

    res.json(corrales)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Error al obtener corrales',
    })
  }
}

const crearCorral = async (req, res) => {
  try {
    const corral = await corralesService.crearCorral(req.body)

    res.status(201).json(corral)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Error al crear corral',
    })
  }
}

module.exports = {
  obtenerCorrales,
  crearCorral,
}