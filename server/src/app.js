const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const corralesRoutes = require("./routes/corrales.routes");
const nidosRoutes = require("./routes/nidos.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const catalogosRoutes = require("./routes/catalogos.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/corrales", corralesRoutes);
app.use("/api/nidos", nidosRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/catalogos", catalogosRoutes);

module.exports = app;
