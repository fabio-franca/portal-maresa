const { Router } = require('express');
const UtilsFF = require('./src/config/utils.js');
const SystemController = require('./src/app/controllers/SystemController.js');
const routes = new Router();

//ROTAS
routes.get("/especialidade", (req, res) => SystemController.listarEspecialidades(req,res));
routes.get("/especialidade/:id", (req, res) => SystemController.obterIdEspecialidade(req,res));
routes.post("/especialidade", (req, res) => SystemController.inserirEspecialidade(req,res));
routes.post("/mensagens", (req, res) => SystemController.inserirmensagens(req,res));
routes.get("/mensagens/", (req, res) => SystemController.listarmensagens(req, res));
routes.get("/mensagens/:id", (req, res) => SystemController.obterIdmensagens(req, res));
routes.get("/colaboradores", (req, res) => SystemController.listarcolaboradores(req,res));
routes.post("/colaboradores/", (req, res) => SystemController.inserircolaboradores(req, res));
routes.get("/colaboradores/:id", (req, res) => SystemController.obterIdcolaboradores(req, res));

module.exports = routes;


