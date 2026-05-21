const corralesService = require("../services/corrales.service");

const obtenerCorrales = async (req, res) => {
  try {
    const corrales = await corralesService.obtenerCorrales();

    res.json(corrales);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener corrales",
    });
  }
};

const crearCorral = async (req, res) => {
  try {
    const corral = await corralesService.crearCorral(req.body);

    res.status(201).json(corral);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear corral",
    });
  }
};

const actualizarCorral = async (req, res) => {
  try {
    const corral = await corralesService.actualizarCorral(
      req.params.id,
      req.body
    );

    res.json(corral);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message || "Error al actualizar corral",
    });
  }
};

const cerrarCorral = async (req, res) => {
  try {
    const corral = await corralesService.cerrarCorral(req.params.id);

    res.json(corral);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message || "Error al cerrar corral",
    });
  }
};

module.exports = {
  obtenerCorrales,
  crearCorral,
  actualizarCorral,
  cerrarCorral,
};



