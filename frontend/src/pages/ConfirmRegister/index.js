import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

export default function ConfirmRegister() {
    return(
        <div className='information'>
            <h1>MyTest</h1>
            <h1>Cadastro efetuado com sucesso!</h1>
            <h2>Você receberá um e-mail com um link para ativação do cadastro!</h2>
            <Link to='/'>
                <button className='btn blue'>VOLTAR</button>
            </Link>
        </div>
    )
}