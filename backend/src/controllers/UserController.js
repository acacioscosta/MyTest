const connection = require('../../config/dbConnection') // Importa arquivo de conexão com o banco MySql
const UserDAO = require('../models/UserDAO') // Importa o model UserDAO
const jwt = require('jsonwebtoken') // Importa o módulo para configuração do Token JWT
const sendMail = require('../../services/sendMail') // Importa arquivo de envio de e-mail
require('dotenv/config') // Importa arquivo para utilização das variáveis de ambiente

module.exports = {

    async auth(req, res) { // Função auth responsável pela autenticação
        const data = req.body // Armazena os valores contidos no body da requisição na constante data
        const sql = await UserDAO.auth(data) // Armazena o resultado da execução da função auth de UserDAO na constante sql

        connection.query(sql, (error, results) => { // Faz conexão com o banco MySql, executa o sql e retorna função de callback
            if (error) { // Executa caso gere erro
                return res.status(500).json({ message: 'ERROR' }) // Retorna resultado como JSON
            }
            if (!results.length) { // Executa caso usuário não seja encontrado
                return res.json({ message: 'USER_NOT_FOUND' }) // Retorna resultado como JSON
            }
            if (results[0].active_user === 0) { // Executa caso o usuário ainda não tenha confirmado sua ativação - link enviado no e-mail
                return res.status(200).json({ message: 'USER_NOT_ACTIVATED' }) // Retorna resultado como JSON
            }

            const { id_user, name_user, username, email_user } = results[0] // Desestruturação para para pegar apenas o que é necessário
            
            let token = jwt.sign({ id_user }, process.env.SECRET, { // Gera token passando o id_user e armazena na variável token
                expiresIn: 300 // Expira em 5 minutos
            })

            return res.status(200).json({ name_user, username, email_user, auth: true, token }) // Retorna resultado como JSON
        })        

    },

    async register(req, res) { // Função register responsável por cadastrar novo usuário
        const data = req.body // Armazena os valores contidos no body da requisição na constante data
        const sql = await UserDAO.register(data) // Armazena o resultado da execução da função register de UserDAO na constante sql

        connection.query(sql, (error, results) => { // Faz conexão com o banco MySql, executa o sql e retorna função de callback
            if (error && (error.code === "ER_DUP_ENTRY")) { // Executa caso o nome de usuário e/ou email já existe
               return res.json({ message: 'USERNAME_OR_EMAIL_ALREADY_REGISTERED' }) // Retorna resultado como JSON
            }
            if (results.affectedRows) { // Executa caso o cadastro seja efetuado
                const id_user = results.insertId // Armazena o ID inserido da constante id_user
                sendMail.email(data, id_user) // Executa função de envio de email passando nome de usuário, email e id_user como parâmetros
                return res.status(201).json({ message: 'USER_REGISTERED' }) // Retorna resultado como JSON
            }
        })

    },

    async active(req, res) { // Função active responsável pela ativação do cadastro
        const data = req.params // Armazena o ID do usuário vindo da URL e armazena na constante data
        let command = 'update' // Variável que faz com que o banco execute o comando update
        const sqlUpdate = await UserDAO.active(data, command) // Armazena o resultado da execução da função active de UserDAO na constante sqlUpdate

        connection.query(sqlUpdate, command, (error, results) => { // Faz conexão com o banco MySql, executa o sql e retorna função de callback
            if (error) { // Executa caso gere erro
                return res.status(500).json({ message: `AN ERROR OCCURRED WHILE CONFIRMING ${error}` }) // Retorna resultado como JSON
            }
        })

        command = 'select' // Variável que faz com que o banco execute o comando select
        const sqlSelect = await UserDAO.active(data, command) // Armazena o resultado da execução da função active de UserDAO na constante sqlSelect

        connection.query(sqlSelect, command, (error, results) => { // Faz conexão com o banco MySql, executa o sql e retorna função de callback
            if (error) { // Executa caso gere erro
                return res.json({ message: 'ERROR'}) // Retorna resultado como JSON
            }
            const { id_user, name_user, username, email_user } = results[0] // Desestruturação para para pegar apenas o que é necessário
            let token = jwt.sign({ id_user }, process.env.SECRET, { // Gera token passando o id_user e armazena na variável token
                expiresIn: 300 // Expira em 5 minutos
            })
            return res.status(200).json({ id_user, name_user, username, email_user, auth: true, token }) // Retorna resultado como JSON
        })
    }

}