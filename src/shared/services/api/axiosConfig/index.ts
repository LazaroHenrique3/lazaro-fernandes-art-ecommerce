import axios from 'axios'

import { errorInterceptor, responseInterceptor } from './interceptors'
import { Environment } from '../../../environment'

const api = axios.create({
    baseURL: Environment.URL_BASE,
})

/* api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error)
) */

// Registre um interceptor global para solicitações
api.interceptors.request.use((config) => {
    // Registre informações sobre a solicitação (por exemplo, configurações, URL, cabeçalhos)
    console.log('Request:', config)
    return config
})

// Registre um interceptor global para respostas
api.interceptors.response.use((response) => {
    // Registre informações sobre a resposta (por exemplo, dados da resposta, código de status)
    console.log('Response:', response)
    return response
})

export { api }