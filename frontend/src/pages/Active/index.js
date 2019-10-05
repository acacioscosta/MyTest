import React, { useEffect } from 'react' // Importa o React e useEffect do react
import { Link } from 'react-router-dom' // Importa Link do react-router-dom
import api from '../../services/api' // Import a URL base da API

export default function Active(props) { // Componente Active recebendo props como parâmetro

    useEffect(() => { // Executa assim que o componente estiver montado
        
        async function activeUser() { // Função que ativa o usuário
            const response = await api.get(props.location.pathname) // Chamada à API com a rota /active/:id vinda das props
            const { id_user, name_user, username, email_user, token } = response.data // Desestruturação para pegar os dados necessários
            localStorage.setItem('id_user', id_user) // Armazena o id_user no localStorage do navegador
            localStorage.setItem('name_user', name_user) // Armazena o name_user no localStorage do navegador
            localStorage.setItem('username', username) // Armazena o username no localStorage do navegador
            localStorage.setItem('email_user', email_user) // Armazena o email_user no localStorage do navegador
            localStorage.setItem('token', token) // Armazena o token no localStorage do navegador
        }
        activeUser() // Executa a função activeUser
        
    }, []) // Segundo parâmetro "[]" vazio, define que será executada apenas 1 vez


    // JSX que será retornado e interpretado pelo navegador
    // Ao clicar no Link, usuário será redirecionado à sua página de perfil
    return(
        <div>
            <h1>Cadastro confirmado com sucesso</h1>
            <Link to='/profile'>
                <button className='btn blue'>Ir ao seu perfil</button>
            </Link>
        </div>
    )
}