const express = require('express') // Importa o framework Express
const path = require('path') // Importa a lib PATH
const cors = require('cors') // Importa a lib CORS
const routes = require('./src/routes') // Importa arquivo de rotas

const app = express() // Atribui instância do express à 'app'

app.use(cors()) // CORS define quem deve ou não consumir a API
app.use(express.json()) // Faz com o express entenda e receba tipos JSON
app.use(routes) // Define as rotas para o express


const port = process.env.PORT || 3000 // Define uma porta para a aplicação

app.listen(port, () => { // Cria um servidor
    console.log(`Server ON at port: ${port}`)
})