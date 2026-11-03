import express from 'express';
import dotenv from 'dotenv';
import router from '..src/routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/autenticacao', authRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));