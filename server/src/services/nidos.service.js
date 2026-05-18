const prisma = require('../config/prisma')

const serializeBigInt = (data) => {
  return JSON.parse(
    JSON.stringify(data, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  )
}

const obtenerNidosPorCorral = async (idCorral) => {
  const nidos = await prisma.nido.findMany({
    where: {
      sector_corral: {
        id_corral: Number(idCorral),
      },
    },
    include: {
      estado_nido: true,
      especie: true,
      sector_corral: true,
    },
    orderBy: {
      id_nido: 'asc',
    },
  })

  return serializeBigInt(nidos)
}
const getNumeroFila = (fila) => {
  const filas = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
  }

  return filas[fila] || Number(fila)
}

const crearNido = async (data) => {
  const filaNumero = getNumeroFila(data.fila)
  const columnaNumero = Number(data.columna)
  const codigoSector = `C${data.idCorral}-${data.fila}-${String(
  columnaNumero
  ).padStart(2, '0')}`

  let sector = await prisma.sector_corral.findFirst({
    where: {
      id_corral: Number(data.idCorral),
      fila: filaNumero,
      columna: columnaNumero,
    },
  })

  if (!sector) {
    sector = await prisma.sector_corral.create({
      data: {
        id_corral: Number(data.idCorral),
        fila: filaNumero,
        columna: columnaNumero,
        codigo_sector: codigoSector,
      },
    })
  }

  const nido = await prisma.nido.create({
    data: {
      codigo_nido: data.codigoNido,
      id_especie: Number(data.idEspecie),
      registrado_por: Number(data.registradoPor || 1),
      id_sector_corral: Number(sector.id_sector_corral),
      fecha_hora_desove: new Date(data.fechaHoraDesove),
      fecha_hora_siembra: new Date(data.fechaHoraSiembra),
      procedencia_exacta: data.procedenciaExacta,
      largo_caparazon: Number(data.largoCaparazon || 0),
      ancho_caparazon: Number(data.anchoCaparazon || 0),
      profundidad_nido: Number(data.profundidadNido),
      cantidad_huevos: Number(data.cantidadHuevos),
      id_estado_nido: Number(data.idEstadoNido || 1),
    },
    include: {
      estado_nido: true,
      especie: true,
      sector_corral: true,
    },
  })

  return serializeBigInt(nido)
}

module.exports = {
  obtenerNidosPorCorral,
  crearNido,
}