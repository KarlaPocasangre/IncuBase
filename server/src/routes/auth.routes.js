const express = require('express')
const { login, forgotPassword, verifyCode, resetPassword } = require('../controllers/auth.controller')
const verificarToken = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/verify-code', verifyCode)
router.post('/reset-password', resetPassword)

router.get('/perfil', verificarToken, (req, res) => {
  return res.status(200).json({
    success: true,
    mensaje: 'Ruta protegida',
    usuario: req.usuario
  })
})

module.exports = router