import axios from 'axios' // Importa a lib AXIOS

const api = axios.create({ // Cria uma URL base para ser usada nas requisições
    baseURL: 'http://localhost:3000'
})

export default api // Exporta a URL