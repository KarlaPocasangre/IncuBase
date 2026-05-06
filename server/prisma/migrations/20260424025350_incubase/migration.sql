-- CreateTable
CREATE TABLE "alertas" (
    "id_alerta" BIGSERIAL NOT NULL,
    "id_tipo_alerta" BIGINT NOT NULL,
    "id_corral" BIGINT,
    "id_nido" BIGINT,
    "id_registro_temperatura" BIGINT,
    "nivel" VARCHAR(20) NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "mensaje" TEXT NOT NULL,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    "fecha_generacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resuelta_por" BIGINT,
    "fecha_resolucion" TIMESTAMP(6),

    CONSTRAINT "alertas_pkey" PRIMARY KEY ("id_alerta")
);

-- CreateTable
CREATE TABLE "condicion_marea" (
    "id_condicion_marea" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "condicion_marea_pkey" PRIMARY KEY ("id_condicion_marea")
);

-- CreateTable
CREATE TABLE "corral" (
    "id_corral" BIGSERIAL NOT NULL,
    "codigo" VARCHAR(50) NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "fecha_instalacion" TIMESTAMP(6) NOT NULL,
    "creado_por" BIGINT NOT NULL,
    "id_tipo_corral" BIGINT NOT NULL,
    "id_estado_corral" BIGINT NOT NULL,
    "observaciones" TEXT,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "corral_pkey" PRIMARY KEY ("id_corral")
);

-- CreateTable
CREATE TABLE "detalle_temperatura" (
    "id_detalle_temperatura" BIGSERIAL NOT NULL,
    "id_registro_temperatura" BIGINT NOT NULL,
    "profundidad_cm" DECIMAL(5,2) NOT NULL,
    "temperatura" DECIMAL(4,2) NOT NULL,
    "orden_medicion" VARCHAR(50),

    CONSTRAINT "detalle_temperatura_pkey" PRIMARY KEY ("id_detalle_temperatura")
);

-- CreateTable
CREATE TABLE "eclosion" (
    "id_eclosion" BIGSERIAL NOT NULL,
    "id_nido" BIGINT NOT NULL,
    "fecha_hora_eclosion" TIMESTAMP(6) NOT NULL,
    "neonatos_vivos_fuera_arena" INTEGER DEFAULT 0,
    "neonatos_muertos_fuera_arena" INTEGER DEFAULT 0,
    "neonatos_vivos_dentro_arena" INTEGER DEFAULT 0,
    "neonatos_muertos_dentro_arena" INTEGER DEFAULT 0,
    "fecha_hora_liberacion" TIMESTAMP(6),
    "id_condicion_marea" BIGINT NOT NULL,
    "responsable_liberacion" VARCHAR(150),
    "observaciones" TEXT,
    "registrado_por" BIGINT NOT NULL,
    "fecha_registro" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "eclosion_pkey" PRIMARY KEY ("id_eclosion")
);

-- CreateTable
CREATE TABLE "especie" (
    "id_especie" BIGSERIAL NOT NULL,
    "nombre_comun" VARCHAR(100) NOT NULL,
    "nombre_cientifico" VARCHAR(150) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "especie_pkey" PRIMARY KEY ("id_especie")
);

-- CreateTable
CREATE TABLE "estado_corral" (
    "id_estado_corral" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "estado_corral_pkey" PRIMARY KEY ("id_estado_corral")
);

-- CreateTable
CREATE TABLE "estado_nido" (
    "id_estado_nido" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "estado_nido_pkey" PRIMARY KEY ("id_estado_nido")
);

-- CreateTable
CREATE TABLE "estado_usuario" (
    "id_estado_usuario" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "estado_usuario_pkey" PRIMARY KEY ("id_estado_usuario")
);

-- CreateTable
CREATE TABLE "exhumacion" (
    "id_exhumacion" BIGSERIAL NOT NULL,
    "id_nido" BIGINT NOT NULL,
    "realizado_por" BIGINT NOT NULL,
    "fecha_hora_exhumacion" TIMESTAMP(6) NOT NULL,
    "huevos_sin_embrion" INTEGER DEFAULT 0,
    "embriones_muertos" INTEGER DEFAULT 0,
    "huevos_no_eclosionados" INTEGER DEFAULT 0,
    "neonatos_muertos_en_nido" INTEGER DEFAULT 0,
    "evidencia_depredacion" BOOLEAN DEFAULT false,
    "id_tipo_depredador" BIGINT,
    "cascarones_eclosionados" INTEGER DEFAULT 0,
    "observaciones" TEXT,
    "fecha_registro" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exhumacion_pkey" PRIMARY KEY ("id_exhumacion")
);

-- CreateTable
CREATE TABLE "nido" (
    "id_nido" BIGSERIAL NOT NULL,
    "codigo_nido" VARCHAR(50) NOT NULL,
    "id_especie" BIGINT NOT NULL,
    "registrado_por" BIGINT NOT NULL,
    "id_sector_corral" BIGINT NOT NULL,
    "fecha_hora_desove" TIMESTAMP(6) NOT NULL,
    "fecha_hora_siembra" TIMESTAMP(6) NOT NULL,
    "procedencia_exacta" TEXT,
    "largo_caparazon" DECIMAL(5,2),
    "ancho_caparazon" DECIMAL(5,2),
    "profundidad_nido" DECIMAL(5,2) NOT NULL,
    "cantidad_huevos" INTEGER NOT NULL,
    "id_estado_nido" BIGINT NOT NULL,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nido_pkey" PRIMARY KEY ("id_nido")
);

-- CreateTable
CREATE TABLE "recuperacion_password" (
    "id_recuperacion" BIGSERIAL NOT NULL,
    "id_usuario" BIGINT NOT NULL,
    "codigo" VARCHAR(100) NOT NULL,
    "expiracion" TIMESTAMP(6) NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "recuperacion_password_pkey" PRIMARY KEY ("id_recuperacion")
);

-- CreateTable
CREATE TABLE "registro_temperatura" (
    "id_registro_temperatura" BIGSERIAL NOT NULL,
    "id_sector_corral" BIGINT NOT NULL,
    "fecha_hora_medicion" TIMESTAMP(6) NOT NULL,
    "observaciones" TEXT,
    "registrado_por" BIGINT NOT NULL,
    "fecha_registro" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registro_temperatura_pkey" PRIMARY KEY ("id_registro_temperatura")
);

-- CreateTable
CREATE TABLE "rol" (
    "id_rol" BIGSERIAL NOT NULL,
    "nombre_rol" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "sector_corral" (
    "id_sector_corral" BIGSERIAL NOT NULL,
    "id_corral" BIGINT NOT NULL,
    "fila" INTEGER NOT NULL,
    "columna" INTEGER NOT NULL,
    "codigo_sector" VARCHAR(50) NOT NULL,

    CONSTRAINT "sector_corral_pkey" PRIMARY KEY ("id_sector_corral")
);

-- CreateTable
CREATE TABLE "tipo_alerta" (
    "id_tipo_alerta" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "tipo_alerta_pkey" PRIMARY KEY ("id_tipo_alerta")
);

-- CreateTable
CREATE TABLE "tipo_corral" (
    "id_tipo_corral" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "tipo_corral_pkey" PRIMARY KEY ("id_tipo_corral")
);

-- CreateTable
CREATE TABLE "tipo_depredador" (
    "id_tipo_depredador" BIGSERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "tipo_depredador_pkey" PRIMARY KEY ("id_tipo_depredador")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" BIGSERIAL NOT NULL,
    "id_rol" BIGINT NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "telefono" VARCHAR(20),
    "id_estado_usuario" BIGINT NOT NULL,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE INDEX "idx_alertas_estado" ON "alertas"("estado");

-- CreateIndex
CREATE INDEX "idx_alertas_fecha" ON "alertas"("fecha_generacion");

-- CreateIndex
CREATE UNIQUE INDEX "condicion_marea_nombre_key" ON "condicion_marea"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "corral_codigo_key" ON "corral"("codigo");

-- CreateIndex
CREATE INDEX "idx_corral_estado" ON "corral"("id_estado_corral");

-- CreateIndex
CREATE INDEX "idx_corral_tipo" ON "corral"("id_tipo_corral");

-- CreateIndex
CREATE INDEX "idx_detalle_temperatura_registro" ON "detalle_temperatura"("id_registro_temperatura");

-- CreateIndex
CREATE UNIQUE INDEX "eclosion_id_nido_key" ON "eclosion"("id_nido");

-- CreateIndex
CREATE UNIQUE INDEX "especie_nombre_comun_key" ON "especie"("nombre_comun");

-- CreateIndex
CREATE UNIQUE INDEX "especie_nombre_cientifico_key" ON "especie"("nombre_cientifico");

-- CreateIndex
CREATE UNIQUE INDEX "estado_corral_nombre_key" ON "estado_corral"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "estado_nido_nombre_key" ON "estado_nido"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "estado_usuario_nombre_key" ON "estado_usuario"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "exhumacion_id_nido_key" ON "exhumacion"("id_nido");

-- CreateIndex
CREATE UNIQUE INDEX "nido_codigo_nido_key" ON "nido"("codigo_nido");

-- CreateIndex
CREATE INDEX "idx_nido_especie" ON "nido"("id_especie");

-- CreateIndex
CREATE INDEX "idx_nido_sector" ON "nido"("id_sector_corral");

-- CreateIndex
CREATE INDEX "idx_recuperacion_password_usuario" ON "recuperacion_password"("id_usuario");

-- CreateIndex
CREATE INDEX "idx_registro_temperatura_fecha" ON "registro_temperatura"("fecha_hora_medicion");

-- CreateIndex
CREATE INDEX "idx_registro_temperatura_sector" ON "registro_temperatura"("id_sector_corral");

-- CreateIndex
CREATE UNIQUE INDEX "rol_nombre_rol_key" ON "rol"("nombre_rol");

-- CreateIndex
CREATE UNIQUE INDEX "sector_corral_codigo_sector_key" ON "sector_corral"("codigo_sector");

-- CreateIndex
CREATE INDEX "idx_sector_corral_corral" ON "sector_corral"("id_corral");

-- CreateIndex
CREATE UNIQUE INDEX "sector_corral_id_corral_fila_columna_key" ON "sector_corral"("id_corral", "fila", "columna");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_alerta_nombre_key" ON "tipo_alerta"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_corral_nombre_key" ON "tipo_corral"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_depredador_nombre_key" ON "tipo_depredador"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE INDEX "idx_usuario_estado" ON "usuario"("id_estado_usuario");

-- CreateIndex
CREATE INDEX "idx_usuario_rol" ON "usuario"("id_rol");

-- AddForeignKey
ALTER TABLE "alertas" ADD CONSTRAINT "alertas_id_corral_fkey" FOREIGN KEY ("id_corral") REFERENCES "corral"("id_corral") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alertas" ADD CONSTRAINT "alertas_id_nido_fkey" FOREIGN KEY ("id_nido") REFERENCES "nido"("id_nido") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alertas" ADD CONSTRAINT "alertas_id_registro_temperatura_fkey" FOREIGN KEY ("id_registro_temperatura") REFERENCES "registro_temperatura"("id_registro_temperatura") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alertas" ADD CONSTRAINT "alertas_id_tipo_alerta_fkey" FOREIGN KEY ("id_tipo_alerta") REFERENCES "tipo_alerta"("id_tipo_alerta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alertas" ADD CONSTRAINT "alertas_resuelta_por_fkey" FOREIGN KEY ("resuelta_por") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "corral" ADD CONSTRAINT "corral_creado_por_fkey" FOREIGN KEY ("creado_por") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "corral" ADD CONSTRAINT "corral_id_estado_corral_fkey" FOREIGN KEY ("id_estado_corral") REFERENCES "estado_corral"("id_estado_corral") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "corral" ADD CONSTRAINT "corral_id_tipo_corral_fkey" FOREIGN KEY ("id_tipo_corral") REFERENCES "tipo_corral"("id_tipo_corral") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detalle_temperatura" ADD CONSTRAINT "detalle_temperatura_id_registro_temperatura_fkey" FOREIGN KEY ("id_registro_temperatura") REFERENCES "registro_temperatura"("id_registro_temperatura") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eclosion" ADD CONSTRAINT "eclosion_id_condicion_marea_fkey" FOREIGN KEY ("id_condicion_marea") REFERENCES "condicion_marea"("id_condicion_marea") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eclosion" ADD CONSTRAINT "eclosion_id_nido_fkey" FOREIGN KEY ("id_nido") REFERENCES "nido"("id_nido") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "eclosion" ADD CONSTRAINT "eclosion_registrado_por_fkey" FOREIGN KEY ("registrado_por") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exhumacion" ADD CONSTRAINT "exhumacion_id_nido_fkey" FOREIGN KEY ("id_nido") REFERENCES "nido"("id_nido") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exhumacion" ADD CONSTRAINT "exhumacion_id_tipo_depredador_fkey" FOREIGN KEY ("id_tipo_depredador") REFERENCES "tipo_depredador"("id_tipo_depredador") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exhumacion" ADD CONSTRAINT "exhumacion_realizado_por_fkey" FOREIGN KEY ("realizado_por") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nido" ADD CONSTRAINT "nido_id_especie_fkey" FOREIGN KEY ("id_especie") REFERENCES "especie"("id_especie") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nido" ADD CONSTRAINT "nido_id_estado_nido_fkey" FOREIGN KEY ("id_estado_nido") REFERENCES "estado_nido"("id_estado_nido") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nido" ADD CONSTRAINT "nido_id_sector_corral_fkey" FOREIGN KEY ("id_sector_corral") REFERENCES "sector_corral"("id_sector_corral") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "nido" ADD CONSTRAINT "nido_registrado_por_fkey" FOREIGN KEY ("registrado_por") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recuperacion_password" ADD CONSTRAINT "recuperacion_password_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registro_temperatura" ADD CONSTRAINT "registro_temperatura_id_sector_corral_fkey" FOREIGN KEY ("id_sector_corral") REFERENCES "sector_corral"("id_sector_corral") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "registro_temperatura" ADD CONSTRAINT "registro_temperatura_registrado_por_fkey" FOREIGN KEY ("registrado_por") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sector_corral" ADD CONSTRAINT "sector_corral_id_corral_fkey" FOREIGN KEY ("id_corral") REFERENCES "corral"("id_corral") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_estado_usuario_fkey" FOREIGN KEY ("id_estado_usuario") REFERENCES "estado_usuario"("id_estado_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "rol"("id_rol") ON DELETE NO ACTION ON UPDATE NO ACTION;
