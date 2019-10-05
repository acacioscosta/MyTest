import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default function Active(props) {

    useEffect(() => {
        
        async function fetchData() {
            const response = await api.get(props.location.pathname)
            const { id_user, name_user, username, email_user, token } = response.data
            localStorage.setItem('id_user', id_user)        
            localStorage.setItem('name_user', name_user)        
            localStorage.setItem('username', username)
            localStorage.setItem('email_user', email_user)
            localStorage.setItem('token', token)
        }
        fetchData()
        
    }, [])


    return(
        <div>
            <h1>Cadastro confirmado com sucesso</h1>

            <Link to='/profile'>
                <button className='btn blue'>Ir ao seu perfil</button>
            </Link>
        </div>
    )
}