import React, { useState } from 'react' // Importa o React e useState do react
import { Link } from 'react-router-dom' // Importa Link do react-router-dom
import api from '../../services/api' // Import a URL base da API

export default function Home({ history }) { // Componente responsável pela página inicial do sistema, recebe history como parâmetro

    const [emailOrUserName, setEmailOrUserName] = useState('') // Estado que armazena o e-mail ou nome de usuário digitado
    const [password_user, setPassword] = useState('') // Estado que armazena a senha digitada pelo usuário
    const [error, setError] = useState(false) // State que controla a exibição ou não da informação de usuário e/ou senha inválidos
    const [inactive, setInactive] = useState(false) // State que controla a exibição ou não da informação de usuário bloqueado

    async function handleSubmit(event) { // Função que faz chamada à API para se autenticar
        event.preventDefault() // Previne seu funcionamento padrão e não deixa a página ser recarregada

        const response = await api.post('/auth', { emailOrUserName, password_user }) // Chamada à API tipo POST para a rota /auth
        if (response.data.message === 'USER_NOT_FOUND') { // Executa caso o usuário não seja encontrado
            return setError(true) // Altera o estado para que mostre a mensagem
        }
        if (response.data.message === 'USER_NOT_ACTIVATED') { // Executa caso o usuário esteja bloqueado
            return setInactive(true) // Altera o estado para que mostre a mensagem
        }

        const { name_user, username, email_user, auth, token } = await response.data // Desestruturação para pegar os dados necessários

        if (auth) { // Executa se o usuário for autenticado
            localStorage.setItem('name_user', name_user) // Salva nome completo do usuário em localStorage do navegador
            localStorage.setItem('username', username) // Salva nome do usuário em localStorage do navegador
            localStorage.setItem('email_user', email_user) // Salva e-mail do usuário em localStorage do navegador
            localStorage.setItem('token', token) // Salva o token em localStorage do navegador
        }

        history.push('/profile') // Redireciona o usuário para a página de perfil

    }

    function recoveryEmail(event) { // Função que recupera e armazena o valor digitado no campo de e-mail
        setEmailOrUserName(event.target.value) // Armazena o valor digitado no estado email
        setError(false) // Altera estado error para retirar mensagem da tela, caso esteja
    }

    function recoveryPassword(event) { // Função que recupera e armazena o valor digitado no campo de senha
        setPassword(event.target.value) // Armazena o valor digitado no estado password_user
        setError(false) // Altera estado error para retirar mensagem da tela, caso esteja
    }

    // JSX que será retornado e interpretado pelo navegador
    return(
        <div className='content'>
            <div className='info'>
                <div>
                    <h1>MyTest</h1>
                </div>
                <div>
                    <h2>Faça Login</h2>
                    <h3>ou</h3>
                    <h2>Cadastre-se!</h2>
                </div>
            </div>
            {error && <small>Usuário e/ou senha inválido(s)</small>}
            {inactive && <small>Bloqueado! Confirme seu cadastro</small>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="emailOrUserName">Login:</label>
                <input type="text" id='emailOrUserName' placeholder='E-mail ou nome de usuário' onChange={event => recoveryEmail(event)} />

                <label htmlFor="password_user">Senha:</label>
                <input type="password" id='password_user' placeholder='Sua senha' onChange={event => recoveryPassword(event)} />

                <button className='btn blue' type='submit' >ENTRAR</button>
                <Link to='/new'>
                    <button type='button' className='btn red' >CADASTRAR</button>
                </Link>
            </form>
        </div>
    )
}