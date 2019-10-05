const jwt = require('jsonwebtoken') // Importa o módulo para configuração do Token JWT
require('dotenv/config') // Importa arquivo para utilização das variáveis de ambiente

const verifyToken = (req, res, next) => { // Função que faz verificação do token enviado no header da requisição
    let token = req.headers['x-access-token'] // Pega o token e armazena na variável token

    if (!token) { // Executa caso não exista token no header da requisição
        return res.status(401).json({ auth: false, message: 'No token provided' }) // Retorna resultado como JSON
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => { // Função que verifica se o token está correto
        if (err) { // Executa caso gere erro
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token' }) // Retorna resultado como JSON
        }
        req.id_user = decoded.id_user // Recupera o id_user decodificado
        next() // Faz com que continue a execução do sistema
    })
}

module.exports = verifyToken