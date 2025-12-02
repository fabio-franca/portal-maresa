const app = require('./app');
require('dotenv').config(); // Carrega as variáveis do .env

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor rodando na porta 3001');
});