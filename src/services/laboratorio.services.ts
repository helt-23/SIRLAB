import apiBackend from "./api/apiBackend";
import { ResponseLaboratorioType, RequestLaboratorioType } from "../features/laboratorio/types/";

export const LaboratorioServices = {
    async listarTodosLaboratorios(status: boolean): Promise<ResponseLaboratorioType[]> {
        const response = await apiBackend.get('/laboratorio/', {
            params: {
                isAtivo: status
            }
        })
        return response.data
    },

    async cadastrarLaboratorio(dados: RequestLaboratorioType): Promise<ResponseLaboratorioType>{
        const response = await apiBackend.post('/laboratorio/', dados)
        return response.data
    },

    async atualizarLaboratorio(id: number, dados: RequestLaboratorioType): Promise<ResponseLaboratorioType>{
        const response = await apiBackend.put(`/laboratorio/${id}`, dados)
        return response.data
    },

    async inativarLaboratorio(id: number): Promise<void>{ //Na verdade, essa função ativa e desativa
        const response = await apiBackend.put(`/laboratorio/status/${id}`)
        return response.data
    }
}