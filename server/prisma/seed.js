const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // estado_usuario
  await prisma.estado_usuario.createMany({
    data: [
      { nombre: "Activo", descripcion: "Usuario activo en el sistema" },
      { nombre: "Inactivo", descripcion: "Usuario deshabilitado" },
    ],
    skipDuplicates: true,
  });

  // estado_corral
  await prisma.estado_corral.createMany({
    data: [
      { nombre: "Activo", descripcion: "Corral en funcionamiento" },
      {
        nombre: "En mantenimiento",
        descripcion: "Corral en revisión o reparación",
      },
      { nombre: "Cerrado", descripcion: "Corral fuera de uso" },
    ],
    skipDuplicates: true,
  });

  // tipo_corral
  await prisma.tipo_corral.createMany({
    data: [
      { nombre: "Corral abierto", descripcion: "Área sin cobertura superior" },
      { nombre: "Corral cerrado", descripcion: "Área protegida o techada" },
    ],
    skipDuplicates: true,
  });

  // estado_nido
  await prisma.estado_nido.createMany({
    data: [
      { nombre: "Registrado", descripcion: "Nido recién registrado" },
      { nombre: "En incubación", descripcion: "Nido en proceso de incubación" },
      {
        nombre: "Próximo a eclosión",
        descripcion: "Nido cercano a eclosionar",
      },
      { nombre: "Eclosionado", descripcion: "Nido que ya eclosionó" },
      { nombre: "Exhumado", descripcion: "Nido que ha sido exhumado" },
    ],
    skipDuplicates: true,
  });

  // tipo_alerta
  await prisma.tipo_alerta.createMany({
    data: [
      {
        nombre: "Temperatura fuera de rango",
        descripcion: "Temperatura anormal detectada",
      },
      {
        nombre: "Nido próximo a eclosión",
        descripcion: "El nido está cerca de eclosionar",
      },
      {
        nombre: "Evidencia de depredación",
        descripcion: "Se detectaron signos de depredación",
      },
      {
        nombre: "Corral con capacidad máxima",
        descripcion: "El corral alcanzó su límite",
      },
    ],
    skipDuplicates: true,
  });

  // tipo_depredador
  await prisma.tipo_depredador.createMany({
    data: [
      { nombre: "Cangrejo", descripcion: "Depredador tipo cangrejo" },
      { nombre: "Perro", descripcion: "Depredador doméstico" },
      { nombre: "Hormigas", descripcion: "Insectos que afectan los huevos" },
      { nombre: "Larvas", descripcion: "Larvas que dañan el nido" },
      { nombre: "Aves", descripcion: "Depredadores aéreos" },
    ],
    skipDuplicates: true,
  });

  // especie
  await prisma.especie.createMany({
    data: [
      {
        nombre_comun: "Golfina",
        nombre_cientifico: "Lepidochelys olivacea",
        descripcion:
          "Tortuga marina ampliamente distribuida en playas del Pacífico.",
      },
      {
        nombre_comun: "Carey",
        nombre_cientifico: "Eretmochelys imbricata",
        descripcion:
          "Especie marina reconocida por su caparazón de escamas superpuestas.",
      },
      {
        nombre_comun: "Baula",
        nombre_cientifico: "Dermochelys coriacea",
        descripcion:
          "La tortuga marina más grande del mundo, de caparazón flexible.",
      },
      {
        nombre_comun: "Prieta",
        nombre_cientifico: "Chelonia mydas",
        descripcion:
          "Tortuga marina herbívora también conocida como tortuga verde.",
      },
    ],
    skipDuplicates: true,
  });

  // condicion_marea
  await prisma.condicion_marea.createMany({
    data: [
      { nombre: "Marea alta", descripcion: "Nivel alto del mar" },
      { nombre: "Marea media", descripcion: "Nivel medio del mar" },
      { nombre: "Marea baja", descripcion: "Nivel bajo del mar" },
    ],
    skipDuplicates: true,
  });

  // rol
  await prisma.rol.createMany({
    data: [
      {
        nombre_rol: "Administrador",
        descripcion: "Acceso completo al sistema",
      },
      { nombre_rol: "Técnico", descripcion: "Registro y monitoreo de datos" },
    ],
    skipDuplicates: true,
  });

  console.log("Catálogos cargados correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
