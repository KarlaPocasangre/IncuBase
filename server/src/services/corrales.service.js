const prisma = require('../config/prisma')

const serializeBigInt = (data) => {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  )
}

const obtenerCorrales = async () => {
  const corrales = await prisma.corral.findMany({
    include: {
      tipo_corral: true,
      estado_corral: true,
    },
  })

  return serializeBigInt(corrales)
}

const generarCodigoCorral = async () => {
  const ultimoCorral = await prisma.corral.findFirst({
    orderBy: {
      id_corral: 'desc',
    },
  })

  const siguienteNumero = ultimoCorral
    ? Number(ultimoCorral.id_corral) + 1
    : 1

  return `COR-${String(siguienteNumero).padStart(4, '0')}`
}

const crearCorral = async (data) => {
  const codigoGenerado = await generarCodigoCorral()

  const corral = await prisma.corral.create({
    data: {
      codigo: codigoGenerado,
      ubicacion: data.ubicacion,
      fecha_instalacion: new Date(data.fechaInstalacion),
      id_tipo_corral: Number(data.idTipoCorral),
      id_estado_corral: Number(data.idEstadoCorral),
      observaciones: data.observaciones,
      creado_por: Number(data.creadoPor),
    },
  })

  return serializeBigInt(corral)
}

module.exports = {
  obtenerCorrales,
  crearCorral,
}