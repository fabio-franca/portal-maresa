const { Router } = require('express');
const UtilsFF = require('./src/config/utils.js');
const SystemController = require('./src/app/controllers/SystemController.js');
const routes = new Router();

//ROTAS
routes.get("/especialidade", (req, res) => SystemController.listarEspecialidades(req,res));

module.exports = routes;
