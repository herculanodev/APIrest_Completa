const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Carregar configurações do arquivo .env
dotenv.config();

// Importar rotas
const usersRouter = require('./routes/users');
const apidocsRouter = require('./routes/apidocs');

// Importar indexRouter se necessário
let indexRouter;
try {
  indexRouter = require('./routes/index');
} catch (err) {
  console.error('Arquivo routes/index.js não encontrado. Ignorando rota /.');
}

// Criar instância do Express
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Conectar ao banco de dados MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB', err);
});

// Configurar rotas
if (indexRouter) {
  app.use('/', indexRouter);
}
app.use('/usuarios', usersRouter); // Certifique-se de que a rota para usuários está correta
app.use('/api-docs', apidocsRouter); // Usar o middleware de rotas para /api-docs

module.exports = app;
