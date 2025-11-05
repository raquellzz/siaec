import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/v1', // Aponta para o backend
  timeout: 10000, // Opcional: tempo limite da requisiçãobaseURL
})

export default api
