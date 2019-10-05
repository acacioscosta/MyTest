const mysql = require('mysql')
require('dotenv/config')

const connection = mysql.createConnection({
    host: 'localhost', //process.env.HOST,
    user: 'root', //process.env.USER,
    password: 'root1234', //process.env.PASSWORD,
    database: 'MyTest' //process.env.DATABASE
})

module.exports = connection