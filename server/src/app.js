const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const corralesRoutes = require("./routes/corrales.routes");
const nidosRoutes = require("./routes/nidos.routes");

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

module.exports = app;
