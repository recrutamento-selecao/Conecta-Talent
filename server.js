import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("./src"));

app.use("/autenticacao", authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});