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
    const { fechaInstalacion } = req.body;

    if (!fechaInstalacion) {
      return res.status(400).json({
        message: "La fecha de instalación es obligatoria",
      });
    }

    const fecha = new Date(fechaInstalacion);
    const ahora = new Date();

    if (Number.isNaN(fecha.getTime())) {
      return res.status(400).json({
        message: "La fecha de instalación no es válida",
      });
    }

    if (fecha > ahora) {
      return res.status(400).json({
        message: "La fecha de instalación no puede ser futura",
      });
    }

    const corral = await corralesService.crearCorral(req.body);

    res.status(201).json(corral);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear corral",
    });
  }
};

module.exports = {
  obtenerCorrales,
  crearCorral,
};
