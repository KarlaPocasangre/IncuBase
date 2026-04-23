const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')
const generarCodigo = require('../utils/generarCodigo')
const enviarCorreo = require('../utils/enviarCorreo')

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        mensaje: 'Email y contraseña son obligatorios'
      })
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: {
        rol: true,
        estado_usuario: true
      }
    })

    if (!usuario) {
      return res.status(401).json({
        success: false,
        mensaje: 'Credenciales incorrectas'
      })
    }

    if (usuario.estado_usuario.nombre !== 'Activo') {
      return res.status(403).json({
        success: false,
        mensaje: 'Usuario inactivo'
      })
    }

    const passwordValida = await bcrypt.compare(password, usuario.password_hash)

    if (!passwordValida) {
      return res.status(401).json({
        success: false,
        mensaje: 'Credenciales incorrectas'
      })
    }

    const token = jwt.sign(
      {
        id_usuario: String(usuario.id_usuario),
        email: usuario.email,
        rol: usuario.rol.nombre_rol
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
      }
    )

    return res.status(200).json({
      success: true,
      mensaje: 'Login correcto',
      token,
      usuario: {
        id_usuario: String(usuario.id_usuario),
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol.nombre_rol
      }
    })
  } catch (error) {
    console.error('Error en login:', error)
    return res.status(500).json({
      success: false,
      mensaje: 'Error interno del servidor'
    })
  }
}

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase()

    if (!email) {
      return res.status(400).json({
        success: false,
        mensaje: 'El email es obligatorio'
      })
    }

    const usuario = await prisma.usuario.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive'
        }
      },
      include: {
        estado_usuario: true
      }
    })

    if (!usuario) {
      return res.status(404).json({
        success: false,
        mensaje: 'No existe un usuario con ese correo'
      })
    }

    if (usuario.estado_usuario.nombre !== 'Activo') {
      return res.status(403).json({
        success: false,
        mensaje: 'Usuario inactivo'
      })
    }

    // INVALIDAR TODOS LOS CÓDIGOS ANTERIORES
    await prisma.recuperacion_password.updateMany({
      where: {
        id_usuario: usuario.id_usuario,
        usado: false
      },
      data: {
        usado: true
      }
    })

    const codigo = generarCodigo()
    const expiracion = new Date(Date.now() + 10 * 60 * 1000)

    await prisma.recuperacion_password.create({
      data: {
        codigo,
        expiracion,
        id_usuario: usuario.id_usuario,
        usado: false
      }
    })

    await enviarCorreo(usuario.email, codigo, usuario.nombre)

    return res.status(200).json({
      success: true,
      mensaje: 'Codigo enviado al correo',
    })
  } catch (error) {
    console.error('Error en forgotPassword:', error)
    return res.status(500).json({
      success: false,
      mensaje: 'Error interno del servidor'
    })
  }
}

const verifyCode = async (req, res) => {
  try {
    const { email, codigo } = req.body

    if (!email || !codigo) {
      return res.status(400).json({
        success: false,
        mensaje: 'Email y código son obligatorios'
      })
    }

    const usuario = await prisma.usuario.findFirst({
      where: {
        email: {
          equals: email.trim().toLowerCase(),
          mode: 'insensitive'
        }
      }
    })

    if (!usuario) {
      return res.status(404).json({
        success: false,
        mensaje: 'Usuario no encontrado'
      })
    }

    const registro = await prisma.recuperacion_password.findFirst({
      where: {
        id_usuario: usuario.id_usuario,
        codigo,
        usado: false
      },
      orderBy: {
        id_recuperacion: 'desc'
      }
    })

    if (!registro) {
      return res.status(400).json({
        success: false,
        mensaje: 'Código inválido o ya usado'
      })
    }

    if (new Date() > registro.expiracion) {
      return res.status(400).json({
        success: false,
        mensaje: 'El código ha expirado'
      })
    }

    return res.status(200).json({
      success: true,
      mensaje: 'Código válido'
    })
  } catch (error) {
    console.error('Error en verifyCode:', error)
    return res.status(500).json({
      success: false,
      mensaje: 'Error interno del servidor'
    })
  }
}

const resetPassword = async (req, res) => {
  try {
    const { email, codigo, nuevaPassword } = req.body

    if (!email || !codigo || !nuevaPassword) {
      return res.status(400).json({
        success: false,
        mensaje: 'Todos los campos son obligatorios'
      })
    }

    if (nuevaPassword.length < 8) {
        return res.status(400).json({
          success: false,
          mensaje: 'La contraseña debe tener al menos 8 caracteres'
        })
      }

      if (!/[A-Z]/.test(nuevaPassword)) {
        return res.status(400).json({
          success: false,
          mensaje: 'La contraseña debe incluir al menos una mayúscula'
        })
      }

      if (!/[a-z]/.test(nuevaPassword)) {
        return res.status(400).json({
          success: false,
          mensaje: 'La contraseña debe incluir al menos una minúscula'
        })
      }

      if (!/[0-9]/.test(nuevaPassword)) {
        return res.status(400).json({
          success: false,
          mensaje: 'La contraseña debe incluir al menos un número'
        })
      }

    const usuario = await prisma.usuario.findFirst({
      where: {
        email: {
          equals: email.trim().toLowerCase(),
          mode: 'insensitive'
        }
      }
    })

    if (!usuario) {
      return res.status(404).json({
        success: false,
        mensaje: 'Usuario no encontrado'
      })
    }

    const registro = await prisma.recuperacion_password.findFirst({
      where: {
        id_usuario: usuario.id_usuario,
        codigo,
        usado: false
      },
      orderBy: {
        id_recuperacion: 'desc'
      }
    })

    if (!registro) {
      return res.status(400).json({
        success: false,
        mensaje: 'Código inválido o ya usado'
      })
    }

    if (new Date() > registro.expiracion) {
      return res.status(400).json({
        success: false,
        mensaje: 'El código ha expirado'
      })
    }

    const hash = await bcrypt.hash(nuevaPassword, 10)

    await prisma.usuario.update({
      where: { id_usuario: usuario.id_usuario },
      data: {
        password_hash: hash
      }
    })

    await prisma.recuperacion_password.update({
      where: { id_recuperacion: registro.id_recuperacion },
      data: {
        usado: true
      }
    })

    return res.status(200).json({
      success: true,
      mensaje: 'Contraseña actualizada correctamente'
    })
  } catch (error) {
    console.error('Error en resetPassword:', error)
    return res.status(500).json({
      success: false,
      mensaje: 'Error interno del servidor'
    })
  }
}

module.exports = { login, forgotPassword, verifyCode, resetPassword }