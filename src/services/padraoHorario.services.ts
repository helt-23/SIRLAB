import { RequestPadraoHorarioType, ResponsePadraoHorarioType } from "../features/padraoHorario/types"
import apiBackend from "./api/apiBackend";

export const PadraoHorarioServices = {
    async listarPadraoHorario(): Promise<ResponsePadraoHorarioType[]> {
        const response = await apiBackend.get(`/padraoHorario/`,)
        return response.data
    },

    async cadastrarPadraoHorario(dados: RequestPadraoHorarioType): Promise<ResponsePadraoHorarioType>{
        const response = await apiBackend.post('/padraoHorario/', dados)
        return response.data
    },

    async atualizarPadraoHorario(id: number, dados: RequestPadraoHorarioType): Promise<ResponsePadraoHorarioType>{
        const response = await apiBackend.put(`/padraoHorario/${id}`, dados)
        return response.data
    },

    async deletarPadraoHorario(id: number): Promise<void>{ //Na verdade, essa função ativa e desativa
        const response = await apiBackend.delete(`/padraoHorario/${id}`)
        return response.data
    }
}