import axios from "axios";
// import { error } from "console";
// import { config } from "process";
const BACKEND_HOST = "http://localhost:8080"

const apiClient = axios.create({
    baseURL: BACKEND_HOST,
    timeout: 10000,
    headers: {
        'Content-Type':'application/json'
    }
})

// apiClient.interceptors.request.use((config) => {

// })

apiClient.interceptors.response.use(
    response => response,
    error => {
        const msg = error.response?.data?.menssage || "Erro inesperado na API"
        return Promise.reject(error)
    }
)
export default apiClient