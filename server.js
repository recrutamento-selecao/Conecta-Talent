import 'dotenv/config'; // Carrega as variáveis de ambiente logo na primeira linha
import express from 'express';
import path from 'path'; // 1. Importe o path para lidar com caminhos absolutos
import { fileURLToPath } from 'url';
import authRoutes from './src/routes/authRoutes.js';
import { createRequire } from 'node:module';
import { url } from 'node:inspector';

// Configuração para o __dirname funcionar em módulos ES (import/export)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const require = createRequire(import.meta.url);
const googleFonts = require('google-fonts');
const visibleIcon = require('@iconify/icons-basil/eye-outline.js').default;
const invisibleIcon = require('@iconify/icons-basil/eye-closed-outline.js').default;


app.get('/interface-config', (req, res) => {
    const fontFamily = googleFonts({ 'League Spartan': ['400', '700'] })
    const match = fontFamily.match(/href="([^"]+)"/);
    const urlFonts = match ? match[1] : '';

    res.json({
        urlComplete: `https:${urlFonts}`,
        Icons:{
            visibleIcon: visibleIcon,
            invisibleIcon: invisibleIcon
        }

    });
});

app.use(express.json());

// 2. Mapeamento correto dos arquivos estáticos ANTES das rotas e do listen
app.use(express.static(path.join(__dirname, "src", "view")));
app.use('/view', express.static(path.join(__dirname, 'src', 'view')));

app.use('/autenticacao', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});