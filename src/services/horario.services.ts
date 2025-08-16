import { ResponseHorarioType, RequestHorarioType } from "../features/horario/types";
import apiBackend from "./api/apiBackend";

export const HorarioServices = {
    // async listarHorarioPorLaboratorio(id: number): Promise<ResponseHorarioType[]> {
    //     const response = await apiBackend.get(`/horario/${id}`,)
    //     return response.data
    // },

    async cadastrarHorarioPorPeriodo(dados: RequestHorarioType): Promise<ResponseHorarioType>{
        const response = await apiBackend.post('/horario/', dados)
        return response.data
    },

    async atualizarHorarioPorPeriodo(dados: RequestHorarioType): Promise<ResponseHorarioType>{
        const response = await apiBackend.put(`/horario/`, dados)
        return response.data
    },

    // async inativarLaboratorio(id: number): Promise<void>{ //Na verdade, essa função ativa e desativa
    //     const response = await apiBackend.put(`/laboratorio/status/${id}`)
    //     return response.data
    // }
}