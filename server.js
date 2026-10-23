import 'dotenv/config'; // Carrega as variáveis de ambiente logo na primeira linha
import express from 'express';
import authRoutes from './src/routes/authRoutes.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/autenticacao', authRoutes);

/*
app.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await conn.query('SELECT * FROM usuario');
        res.json(rows);
    }
    catch (erro) {
        res.status(500).json({
            mensagem: erro.message
        });
    }
});
*/

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});