const express = require('express') // Importa framework Express
const routes = express.Router() // Atribuindo roteamento do Express à routes

const UserController = require('./controllers/UserController') // Importa arquivo UserController

routes.post('/auth', UserController.auth) // Rota post para autenticação - executa função auth de UserController
routes.post('/register', UserController.register) // Rota post para cadastro - executa função register de UserController
routes.get('/active/:hash', UserController.active) // Rota get para ativar conta do usuário - executa função active de UserController

module.exports = routes