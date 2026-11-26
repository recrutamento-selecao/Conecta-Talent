import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import conn from './src/config/database.js';
import authRoutes from './src/routes/authRoutes.js';
import recrutadorRoutes from './src/routes/recrutadorRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// --- CONFIGURAÇÃO DE ARQUIVOS ESTÁTICOS ---
app.use(express.static(path.join(__dirname, 'src', 'view')));
app.use('/view', express.static(path.join(__dirname, 'src', 'view')));
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

// --- ROTAS DA API ---
app.use('/autenticacao', authRoutes);
app.use('/recrutadores', recrutadorRoutes);

// --- ROTA RAIZ ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'view', 'index.html'));
});

// --- ROTA DE CONFIGURAÇÃO DO SUPABASE (CHAVE PÚBLICA APENAS) ---
app.get('/api/supabase-config', (req, res) => {
    res.json({
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_PUBLISHABLE_KEY
    });
});

// --- ROTA DE BACKEND PARA ENVIAR/DISPARAR O OTP POR E-MAIL ---
app.post('/api/auth/send-otp', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'O e-mail é obrigatório.' });
    }

    try {
        const { error } = await conn.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: false
            }
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ message: 'Código de verificação enviado com sucesso para o e-mail!' });
    } catch (err) {
        console.error('Erro interno no servidor ao enviar o OTP:', err);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
});

// --- ROTA DE BACKEND PARA VERIFICAÇÃO DE OTP (2FA) ---
app.post('/api/auth/verify-otp', async (req, res) => {
    const { email, token } = req.body;

    if (!email || !token) {
        return res.status(400).json({ error: 'E-mail e código de verificação são obrigatórios.' });
    }

    try {
        const { data, error } = await conn.auth.verifyOtp({
            email,
            token,
            type: 'email'
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({
            message: 'Autenticação bem-sucedida!',
            session: data.session,
            user: data.user
        });
    } catch (err) {
        console.error('Erro interno no servidor ao verificar OTP:', err);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});