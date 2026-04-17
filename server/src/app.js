import express from "express";
import cors from "cors";

const app = express();

app.use(cors()); // 👈 obligatorio

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.get("/api/books", (req, res) => {
  res.json([
    { id: 1, titulo: "Clean Code" },
    { id: 2, titulo: "El Principito" },
  ]);
});

export default app;
