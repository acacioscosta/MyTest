import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default function New({ history }) {

    const [name_user, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email_user, setEmail] = useState('')
    const [password_user, setPassword] = useState('')
    const [confirmPasswordUser, setConfirmPasswordUser] = useState('')
    const [used, setUsed] = useState(false)
    const [passwordInvalid, setPasswordInvalid] = useState(false)
    const [errorDifferentPassword, setErrorDifferentPassword] = useState(false)
    
    async function handleSubmit(event) {
        event.preventDefault()
        clearMsgError()

        if ((password_user.length < 6) || (!password_user.match(/[a-z]+/)) || (!password_user.match(/[A-Z]+/))) {
            return setPasswordInvalid(true)
        }
        if (password_user !== confirmPasswordUser) {
            return setErrorDifferentPassword(true)
        }

        const response = await api.post('/register', { name_user, username, email_user, password_user })

        if (response.data.message === 'USERNAME_OR_EMAIL_ALREADY_REGISTERED') {
            clearMsgError()
            setUsed(true)
        }
        if (response.data.message === 'USER_REGISTERED') {
            alert('Usuário cadastrado')
            history.push('/confirmregister')
        }

    }
    
    function recoveryName(event) {
        setName(event.target.value)
        clearMsgError()
    }
    
    function recoveryUsername(event) {
        setUsername(event.target.value)
        clearMsgError()
    }
    
    function recoveryEmail(event) {
        setEmail(event.target.value)
        clearMsgError()
    }
    
    function recoveryPassword(event) {
        setPassword(event.target.value)
        clearMsgError()
    }
    
    function recoveryConfirmPassword(event) {
        setConfirmPasswordUser(event.target.value)
        clearMsgError()
    }
    
    function clearMsgError() {
        setUsed(false)
        setPasswordInvalid(false)
        setErrorDifferentPassword(false)
    }

    return(
        <div className='content'>
            <h1>Cadastre-se no MyTest</h1>
            {used && <small>Usuário e/ou e-mail já utilizado</small>}
            {passwordInvalid && <small>Senha inválida!</small>}
            {errorDifferentPassword && <small>Senha e confirmação de senha estão divergentes!</small>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name_user">Nome completo: *</label>
                <input type="text" id='name_user' placeholder='Nome completo' onChange={event => recoveryName(event)} required />

                <label htmlFor="username">Usuário: *</label>
                <input type="text" id='username' placeholder='Nome de usuário' onChange={event => recoveryUsername(event)} required />

                <label htmlFor="email_user">E-mail: *</label>
                <input type="email" id='email_user' placeholder='Seu e-mail' onChange={event => recoveryEmail(event)} required />

                <label htmlFor="password_user">Senha: * <span>(mínimo 6 dígitos, pelo menos uma letra minúscula, uma maiúscula e números)</span></label>
                <input type="password" id='password_user' placeholder='Sua senha' onChange={event => recoveryPassword(event)} required />

                <label htmlFor="confirm_password_user">Senha: * <span>(senha deve ser a mesma digitada anteriormente)</span></label>
                <input type="password" id='confirm_password_user' placeholder='Confirme sua senha' onChange={event => recoveryConfirmPassword(event)} required />

                <button className='btn blue' type='submit' >CADASTRAR</button>
                <Link to='/'>
                    <button type='button' className='btn red' >FAZER LOGIN</button>
                </Link>
            </form>
        </div>
    )
}