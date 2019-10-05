const express = require('express') // Importa framework Express
const routes = express.Router() // Atribuindo roteamento do Express à routes

const UserController = require('./controllers/UserController') // Importa arquivo UserController

routes.post('/auth', UserController.auth) // Rota tipo get
routes.post('/register', UserController.register)
routes.get('/active/:id', UserController.active)
routes.get('/verifyactive/:id', UserController.verifyActive)

module.exports = routes