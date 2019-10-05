import React, { useState, useEffect } from 'react' // Importa o React, useState e useEffect do react
import img from '../../assets/img.png' // Importa imagem

export default function Profile({ history }) { // Componente responsável pela página de perfil do usuário, recebe history como parâmetro

    const [name_user, setName] = useState('') // Estado que armazena o nome completo do usuário
    const [username, setUsername] = useState('') // Estado que armazena o nome de usuário
    const [email_user, setEmail] = useState('') // Estado que armazena o e-mail do usuário

    useEffect(() => { // Executa assim que o componente estiver montado
        const nameStorage = localStorage.getItem('name_user', name_user) // Recupera os valores armazenados no localStorage do navegador e armazena na constante nameStorage
        const usernameStorage = localStorage.getItem('username', username) // Recupera os valores armazenados no localStorage do navegador e armazena na constante usernameStorage
        const emailStorage = localStorage.getItem('email_user', email_user) // Recupera os valores armazenados no localStorage do navegador e armazena na constante emailStorage

        setName(nameStorage) // Altera estado name_user
        setUsername(usernameStorage) // Altera estado username
        setEmail(emailStorage) // Altera estado email_user
    }, [])

    function logout() { // Executa quando usuário deseja sair da tela de perfil
        localStorage.clear() // Limpa os dados salvos no localStorage do navegador
        history.push('/') // Redireciona o usuário à página Home
    }

    // JSX que será retornado e interpretado pelo navegador
    return(
        <div className='profile'>
            <div className='menu'>
                <img src={img} alt="imgperfil"/>
                <h2>{name_user}</h2>
                <h2>{username}</h2>
                <h2>{email_user}</h2>
                <button className='btn red' onClick={logout}>SAIR</button>
            </div>
            <div className='contentProfile'>
                <h1>MyTest Profile</h1>
            </div>
        </div>
    )
}