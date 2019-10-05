import React, { useState, useEffect } from 'react'
import imgteste from '../../assets/img.png'

export default function Profile({ history }) {

    const [name_user, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email_user, setEmail] = useState('')

    useEffect(() => {
        const nameStorage = localStorage.getItem('name_user', name_user)
        const usernameStorage = localStorage.getItem('username', username)
        const emailStorage = localStorage.getItem('email_user', email_user)

        setName(nameStorage)
        setUsername(usernameStorage)
        setEmail(emailStorage)
    }, [])

    function logout() {
        localStorage.clear()
        history.push('/')
    }

    return(
        <div className='profile'>
            <div className='menu'>
                <img src={imgteste} alt="imgperfil"/>
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