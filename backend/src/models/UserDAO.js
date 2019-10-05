const md5 = require('md5')

module.exports = {
    auth(data) {
        const { emailOrUserName, password_user } = data
        const password_hash = md5(password_user)
        const sql = `SELECT id_user, name_user, username, email_user, active_user FROM user WHERE (email_user = '${emailOrUserName}' OR username = '${emailOrUserName}') AND password_user = '${password_hash}'`
        return sql
    },
    
    register(data) {
        const { name_user, username, email_user, password_user } = data
        const password_hash = md5(password_user)
        const sql = `INSERT INTO user VALUES (default, '${name_user}', '${username}', '${email_user}', '${password_hash}', default)`
        return sql
    },

    active(data, command) {
        const { id } = data
        let sql

        if (command === 'update') {
            sql = `UPDATE user SET active_user = true WHERE id_user = ${id}`
            return sql
        }
        
        sql = `SELECT id_user, name_user, username, email_user, active_user FROM user WHERE id_user = ${id}`
        return sql
    },

    verifyActive(data) {
        const { id } = data
        const sql = `SELECT active_user FROM user WHERE active_user = 1 AND id_user = ${id}`
        return sql
    }
}