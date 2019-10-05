const md5 = require('md5') // Importa md5 para criar HASH nas senhas

module.exports = {
    auth(data) { // Função auth responsável pelo comando de autenticação, recebe parâmetro data
        const { emailOrUserName, password_user } = data // Desestruturação para para pegar apenas o que é necessário
        const password_hash = md5(password_user) // Cria um HASH da senha e armazena na constante password_hash
        const sql = `SELECT id_user, name_user, username, email_user, active_user FROM user WHERE (email_user = '${emailOrUserName}' OR username = '${emailOrUserName}') AND password_user = '${password_hash}'` // Monta comando SQL buscando o usuário
        return sql // Retorna o comando SQL
    },
    
    register(data) { // Função register responsável pelo comando de cadastro de usuário, recebe parâmetro data
        const { name_user, username, email_user, password_user } = data // Desestruturação para para pegar apenas o que é necessário
        const password_hash = md5(password_user) // Cria um HASH da senha e armazena na constante password_hash
        const sql = `INSERT INTO user VALUES (default, '${name_user}', '${username}', '${email_user}', '${password_hash}', default)` // Monta comando SQL que cadastra o usuário
        return sql // Retorna o comando SQL
    },

    active(data, command) {
        const { id } = data // Desestruturação para para pegar apenas o que é necessário
        let sql // Variável que vai armazenar o comando SQL

        if (command === 'update') { // Executando caso o comando seja UPDATE
            sql = `UPDATE user SET active_user = true WHERE id_user = ${id}` // Monta comando SQL que ativa o cadastro de um usuário
            return sql // Retorna o comando SQL
        }
        
        sql = `SELECT id_user, name_user, username, email_user, active_user FROM user WHERE id_user = ${id}` // Monta comando SQL que recupera os dados do usuário ativado
        return sql // Retorna o comando SQL
    }
}