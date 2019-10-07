const nodemailer = require('nodemailer') // Importa o módulo de envio de e-mail do NODEJS
require('dotenv/config') // Importa arquivo para utilização das variáveis de ambiente

module.exports = {
    email(data, hash) { // Função que faz o envio de e-mail para o usuário cadastrado
        const { username, email_user } = data // Desestruturação para para pegar apenas o que é necessário

        const transporte = nodemailer.createTransport({ // Função que configura o servidor de e-mail
            service: process.env.SERVICE_MAIL, // Define o serviço de e-mail, está sendo utilizado no momento o HOTMAIL
            auth: { // Recebe os dados de autenticação do e-mail
              user: process.env.MAIL_USER, // Endereço do e-mail
              pass: process.env.PASSWORD_MAIL // Senha do e-mail
            } 
          })
        
        const email = { // Define as informações do e-mail
            from: process.env.ADRESS_MAIL, // E-mail remetente
            to: `${email_user}`, // E-mail destino
            subject: `Olá, ${username}`,  // Assunto do e-mail
            html: `Segue abaixo seu link para confirmação de cadastro no MyTest <br /> <a href="http://localhost:3001/active/${hash}" >ATIVAR CADASTRO</a>` // Conteúdo do e-mail, aqui está como html
        }
        
        transporte.sendMail(email, function(err, info){ // Realiza o envio do e-mail de acordo com as configurações acima
            if(err) // Executa caso gere erro
              return err // Retorna o erro
          
            return console.log('Email enviado!') // Apenas dá um log sobre o aviso
        })
    }
}
