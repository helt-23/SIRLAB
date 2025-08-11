import { ResponseHorarioType,  } from "../features/horario/types";
import apiBackend from "./api/apiBackend";

export const HorarioServices = {
    async listarHorarioPorLaboratorio(id: number): Promise<ResponseHorarioType[]> {
        const response = await apiBackend.get(`/horario/${id}`,)
        return response.data
    },

    // async cadastrarLaboratorio(dados: RequestHo): Promise<ResponseLaboratorioType>{
    //     const response = await apiBackend.post('/laboratorio/', dados)
    //     return response.data
    // },

    // async atualizarLaboratorio(id: number, dados: RequestLaboratorioType): Promise<ResponseLaboratorioType>{
    //     const response = await apiBackend.put(`/laboratorio/${id}`, dados)
    //     return response.data
    // },

    // async inativarLaboratorio(id: number): Promise<void>{ //Na verdade, essa função ativa e desativa
    //     const response = await apiBackend.put(`/laboratorio/status/${id}`)
    //     return response.data
    // }
}