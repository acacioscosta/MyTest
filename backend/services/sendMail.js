const nodemailer = require('nodemailer')
require('dotenv/config')

module.exports = {
    email(data, id_user) {
        const { username, email_user } = data
        const transporte = nodemailer.createTransport({
            service: process.env.SERVICE_MAIL, // Como mencionei, vamos usar o Gmail
            auth: {
              user: process.env.MAIL_USER, // Basta dizer qual o nosso usuário
              pass: process.env.PASSWORD_MAIL             // e a senha da nossa conta
            } 
          })
        
        const email = {
            from: process.env.ADRESS_MAIL, // Quem enviou este e-mail
            to: `${email_user}`, // Quem receberá
            subject: `${username}`,  // Um assunto bacana :-) 
            html: `Segue abaixo seu link para confirmação de cadastro no MyTest <br /> <a href="http://localhost:3001/active/${id_user}" >ATIVAR CADASTRO</a>` // O conteúdo do e-mail
        }
        
        transporte.sendMail(email, function(err, info){
            if(err)
              return err // Oops, algo de errado aconteceu.
          
            return console.log('Email enviado! Leia as informações adicionais: ', info);
        })
    }
}
