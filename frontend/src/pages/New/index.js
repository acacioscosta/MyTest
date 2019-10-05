import React, { useState } from 'react' // Importa o React e useState do react
import { Link } from 'react-router-dom' // Importa Link do react-router-dom
import api from '../../services/api' // Import a URL base da API

export default function New({ history }) { // Componente responsável pela página de cadastro de novo usuário, recebe history como parâmetro

    const [name_user, setName] = useState('') // Estado que armazena o nome completo do usuário
    const [username, setUsername] = useState('') // Estado que armazena o nome do usuário
    const [email_user, setEmail] = useState('') // Estado que armazena o e-mail do usuário
    const [password_user, setPassword] = useState('') // Estado que armazena a senha do usuário
    const [confirmPasswordUser, setConfirmPasswordUser] = useState('') // Estado que a armazena a confirmação de senha do usuário
    const [used, setUsed] = useState(false) // Estado que armazena se o usuário e/ou e-mail informado já está cadastrado e mostra mensagem em tela
    const [passwordInvalid, setPasswordInvalid] = useState(false) // Estado que armazena se a senha não está dentro das condições estabelecidas e mostra mensagem em tela
    const [errorDifferentPassword, setErrorDifferentPassword] = useState(false) // Estado que armazena se a senha e confirmação de senha estão divergentes e mostra mensagem em tela
    
    async function handleSubmit(event) { // Função que faz chamada à API para cadastro
        event.preventDefault() // Previne seu funcionamento padrão e não deixa a página ser recarregada
        clearMsgError() // Executa função clearMsgError - Limpa mensagens de erro da tela, caso exista

        if ((password_user.length < 6) || (!password_user.match(/[a-z]+/)) || (!password_user.match(/[A-Z]+/))) { // Verifica se a senha informada atende aos requisitos
            return setPasswordInvalid(true) // Altera o estado para que mostre a mensagem
        }
        if (password_user !== confirmPasswordUser) { // Verifica se a senha e confirmação de senha estão divergentes
            return setErrorDifferentPassword(true) // Altera o estado para que mostre a mensagem
        }

        const response = await api.post('/register', { name_user, username, email_user, password_user }) // Chamada à API para cadastro

        if (response.data.message === 'USERNAME_OR_EMAIL_ALREADY_REGISTERED') { // Executa caso exista o usuário já cadastrado
            clearMsgError() // Executa função clearMsgError - Limpa mensagens de erro da tela, caso exista
            setUsed(true)
        }
        if (response.data.message === 'USER_REGISTERED') { // Executa caso o usuário seja cadastrado
            //alert('Usuário cadastrado') // Avisa ao usuário sobre o cadastro
            history.push('/confirmregister') // Redireciona o usuário à tela de confirmação de cadastro
        }
    }
    
    function recoveryName(event) { // Função que recupera e armazena o valor digitado no campo de nome completo
        setName(event.target.value) // Armazena o valor digitado no estado name_user
        clearMsgError() // Executa função clearMsgError - Limpa mensagens de erro da tela, caso exista
    }
    
    function recoveryUsername(event) { // Função que recupera e armazena o valor digitado no campo de usuário
        setUsername(event.target.value) // Armazena o valor digitado no estado username
        clearMsgError() // Executa função clearMsgError - Limpa mensagens de erro da tela, caso exista
    }
    
    function recoveryEmail(event) { // Função que recupera e armazena o valor digitado no campo de e-mail
        setEmail(event.target.value) // Armazena o valor digitado no estado email_user
        clearMsgError() // Executa função clearMsgError - Limpa mensagens de erro da tela, caso exista
    }
    
    function recoveryPassword(event) { // Função que recupera e armazena o valor digitado no campo de senha
        setPassword(event.target.value) // Armazena o valor digitado no estado password_user
        clearMsgError() // Executa função clearMsgError - Limpa mensagens de erro da tela, caso exista
    }
    
    function recoveryConfirmPassword(event) { // Função que recupera e armazena o valor digitado no campo de confirmação de senha
        setConfirmPasswordUser(event.target.value) // Armazena o valor digitado no estado confirmPasswordUser
        clearMsgError() // Executa função clearMsgError - Limpa mensagens de erro da tela, caso exista
    }
    
    function clearMsgError() { // Função que limpa todas as mensagens de erro da tela, caso haja
        setUsed(false) // Limpa mensagem de erro de usuário existente
        setPasswordInvalid(false) // Limpa mensagem de erro de senha inválida
        setErrorDifferentPassword(false) // Limpa mensagem de erro de senha e confirmação de senha divergentes
    }

    // JSX que será retornado e interpretado pelo navegador
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