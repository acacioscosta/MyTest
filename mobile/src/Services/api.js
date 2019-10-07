import axios from 'axios' // Importa o axios

const api = axios.create({
        baseURL: 'http://10.0.0.103:3000' // Cria URL base para chamadas à API
    })

export default api