import apiBackend from "./api/apiBackend";
import { RequestReservaType, ResponseReservaType} from "../features/reserva/types";

export const ReservaServices = {
    async listarReservas(): Promise<ResponseReservaType[]> {
        const response = await apiBackend.get('/reserva/') 
        return response.data
    },

    async solicitarReserva(dados: RequestReservaType): Promise<ResponseReservaType>{
        const response = await apiBackend.post('/reserva/solicitar', dados)
        return response.data
    },

    async confirmarReserva(id: number): Promise<ResponseReservaType>{
        const response = await apiBackend.put(`/reserva/confirmar/${id}`)
        return response.data
    },

    async negarReserva(id: number): Promise<void>{ 
        const response = await apiBackend.put(`/reserva/negar/${id}`)
        return response.data
    },

    async cancelarReserva(id: number): Promise<void>{
        const response = await apiBackend.put(`/reserva/cancelar/${id}`)
        return response.data
    }
}