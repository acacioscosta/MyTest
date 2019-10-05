import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default function Home({ history }) {

    const [emailOrUserName, setEmail] = useState('')
    const [password_user, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [inactive, setInactive] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        const response = await api.post('/auth', { emailOrUserName, password_user })
        if (response.data.message === 'USER_NOT_FOUND') {
            return setError(true)
        }
        if (response.data.message === 'USER_NOT_ACTIVATED') {
            return setInactive(true)
        }

        const { name_user, username, email_user, auth, token } = await response.data

        if (auth) {
            localStorage.setItem('name_user', name_user)
            localStorage.setItem('username', username)
            localStorage.setItem('email_user', email_user)
            localStorage.setItem('token', token)
        }

        history.push('/profile')

    }

    function recoveryEmail(event) {
        setEmail(event.target.value)
        setError(false)
    }

    function recoveryPassword(event) {
        setPassword(event.target.value)
        setError(false)
    }

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