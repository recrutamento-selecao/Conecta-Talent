require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/src', express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/:pagina', (req, res, next) => {
  const arquivo = path.join(__dirname, 'testes', `${req.params.pagina}.html`);
  res.sendFile(arquivo, (err) => err && next());
});

app.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));