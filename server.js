import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./src/routes/authRoutes.js";
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(express.json());
 
// Servir páginas estáticas do frontend (HTML e scripts principais)
app.use(express.static(path.join(__dirname, 'src', 'view')));

// Correção: Servir explicitamente a pasta de estilos CSS para evitar erros 404 nos arquivos de layout
app.use('/css', express.static(path.join(__dirname, 'src', 'view', 'css')));
 
// Apontando corretamente para a pasta public/assets onde estão os ícones e imagens
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));
 
app.use("/autenticacao", authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});