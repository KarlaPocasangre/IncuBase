const nidosService = require("../services/nidos.service");

const obtenerNidosPorCorral = async (req, res) => {
  try {
    const { idCorral } = req.params;

    const nidos = await nidosService.obtenerNidosPorCorral(idCorral);

    res.json(nidos);
  } catch (error) {
    console.error(error);

    res.status(error.statusCode || 500).json({
      message: error.message || "Error al obtener nidos del corral",
    });
  }
};

const crearNido = async (req, res) => {
  try {
    const nido = await nidosService.crearNido(req.body);

    res.status(201).json(nido);
  } catch (error) {
    console.error(error);

    res.status(error.statusCode || 500).json({
      message: error.message || "Error al registrar nido",
    });
  }
};

module.exports = {
  obtenerNidosPorCorral,
  crearNido,
};
