import { RequestTipoPadraoHorarioType, ResponseTipoPadraoHorarioType } from "../features/tipoPadraoHorario/types"
import apiBackend from "./api/apiBackend";

export const TipoPadraoHorarioServices = {
    async listarTipoPadraoHorario(): Promise<ResponseTipoPadraoHorarioType[]> {
        const response = await apiBackend.get(`/tipoPadraoHorario/`,)
        return response.data
    },

    async cadastrarTipoPadraoHorario(dados: RequestTipoPadraoHorarioType): Promise<ResponseTipoPadraoHorarioType>{
        const response = await apiBackend.post('/tipoPadraoHorario/', dados)
        return response.data
    },

    async atualizarTipoPadraoHorario(id: number, dados: RequestTipoPadraoHorarioType): Promise<ResponseTipoPadraoHorarioType>{
        const response = await apiBackend.put(`/tipoPadraoHorario/${id}`, dados)
        return response.data
    },

    async deletarTipoPadraoHorario(id: number): Promise<void>{ //Na verdade, essa função ativa e desativa
        const response = await apiBackend.delete(`/tipoPadraoHorario/${id}`)
        return response.data
    }
}