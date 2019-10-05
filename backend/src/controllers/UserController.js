const connection = require('../../config/dbConnection')
const UserDAO = require('../models/UserDAO')
const jwt = require('jsonwebtoken')
const sendMail = require('../../services/sendMail')
require('dotenv/config')

module.exports = {

    async auth(req, res) {
        const data = req.body
        const sql = await UserDAO.auth(data)

        connection.query(sql, (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'ERROR' })
            }
            if (!results.length) {
                return res.json({ message: 'USER_NOT_FOUND' })
            }
            if (results[0].active_user === 0) {
                return res.status(200).json({ message: 'USER_NOT_ACTIVATED' })
            }

            const { id_user, name_user, username, email_user } = results[0] // Utilizando desestruturação para não enviar informação de usuário ativo ou não
            
            let token = jwt.sign({ id_user }, process.env.SECRET, {
                expiresIn: 300
            })

            return res.status(200).json({ name_user, username, email_user, auth: true, token })
        })        

    },

    async register(req, res) {
        const data = req.body
        const sql = await UserDAO.register(data)

        connection.query(sql, (error, results) => {
            if (error && (error.code === "ER_DUP_ENTRY")) {
               return res.json({ message: 'USERNAME_OR_EMAIL_ALREADY_REGISTERED' })
            }
            if (results.affectedRows) {
                const id_user = results.insertId
                sendMail.email(data, id_user)
                return res.status(201).json({ message: 'USER_REGISTERED' })
            }
        })

    },

    async active(req, res) {
        const data = req.params
        let command = 'update'
        const sqlUpdate = await UserDAO.active(data, command)

        connection.query(sqlUpdate, command, (error, results) => {
            if (error) {
                return res.status(500).json({ message: `AN ERROR OCCURRED WHILE CONFIRMING ${error}` })
            }
        })

        command = 'select'
        const sqlSelect = await UserDAO.active(data, command)
        connection.query(sqlSelect, command, (error, results) => {
            if (error) {
                return res.json({ message: 'ERROR'})
            }
            const { id_user, name_user, username, email_user } = results[0]
            let token = jwt.sign({ id_user }, process.env.SECRET, {
                expiresIn: 300
            })
            return res.status(200).json({ id_user, name_user, username, email_user, auth: true, token })
        })
    },

    async verifyActive(req, res) {
        const data = req.params
        const sql = await UserDAO.verifyActive(data)

        connection.query(sql, (error, results) => {
            if (error) {
                return res.json({ message: 'ERROR' })
            }
            results.length ? res.json({ message: 'IS_ACTIVE' }) : res.json({ message: 'BLOCKED' })
        })
    }

}