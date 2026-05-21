const express = require("express");

const {
  login,
  logout,
  forgotPassword,
  verifyCode,
  resetPassword,
  perfil,
} = require("../controllers/auth.controller");

const verificarToken = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/verify-code", verifyCode);
router.post("/reset-password", resetPassword);

router.get("/perfil", verificarToken, perfil);

module.exports = router;
