const express = require('express'); 
const bodyParser = require('body-parser');
const routes = require('./routes');

class App {
  constructor() {
    this.server = express(); // cria a instância do express
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(bodyParser.json()); // habilita JSON no body
    // se quiser, pode adicionar CORS, logs, etc:
    const cors = require('cors');
    this.server.use(cors());
  }

  routes() {
    this.server.use('/projeto-maresa', routes);
  }
}

module.exports = new App().server;