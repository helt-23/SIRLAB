import apiBackend from "./api/apiBackend";
import { ResponseLaboratorioType, RequestLaboratorioType, ResponseLaboratorioDetalhadoType } from "../features/laboratorio/types/";

export const LaboratorioServices = {
    async listarTodosLaboratorios(status: boolean, blocoId?: number): Promise<ResponseLaboratorioType[]> {
        const response = await apiBackend.get('/laboratorio/', {
            params: {
                isAtivo: status,
                blocoId: blocoId
            }
        })
        return response.data
    },

    async listarLaboratorioDetalhado(labId: number): Promise<ResponseLaboratorioDetalhadoType>{
        const response = await apiBackend.get(`/laboratorio/${labId}`)
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