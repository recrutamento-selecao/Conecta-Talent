import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'src', 'view')));

app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));
app.use("/autenticacao", authRoutes);
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});





