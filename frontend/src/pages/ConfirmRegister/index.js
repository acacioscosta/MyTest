import React from 'react' // Importa o React
import { Link } from 'react-router-dom' // Importa Link do react-router-dom
import './styles.css' // Importa o css

const ConfirmRegister = () => { // Stateless component ConfirmRegister, apenas informa ao usuário sobre o cadastro e verificação do e-mail
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

export default ConfirmRegister