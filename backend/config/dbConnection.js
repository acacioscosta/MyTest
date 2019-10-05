const mysql = require('mysql') // Importa MySQL
require('dotenv/config') // Importa arquivo para utilização das variáveis de ambiente

const connection = mysql.createConnection({ // Função que cria uma conexão com o banco MySQL
    host: process.env.HOST, //process.env.HOST,
    user: process.env.USERDB, //process.env.USER,
    password: process.env.PASSWORD, //process.env.PASSWORD,
    database: process.env.DATABASE //process.env.DATABASE
})

module.exports = connection