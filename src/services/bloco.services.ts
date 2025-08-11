import apiBackend from "./api/apiBackend";
import { RequestBlocoType, ResponseBlocoType } from "../features/bloco/types";

export const BlocoServices = {
    async listarTodosBloco(status: boolean): Promise<ResponseBlocoType[]> {
        const response = await apiBackend.get('/bloco/', {
            params: {
                isAtivo: status
            }
        })
        return response.data
    },

    async cadastrarBloco(dados: RequestBlocoType): Promise<ResponseBlocoType>{
        const response = await apiBackend.post('/bloco/', dados)
        return response.data
    },

    async atualizarBloco(id: number, dados: RequestBlocoType): Promise<ResponseBlocoType>{
        const response = await apiBackend.put(`/bloco/${id}`, dados)
        return response.data
    },

    async inativarBloco(id: number): Promise<void>{ //Na verdade, essa função ativa e desativa
        const response = await apiBackend.put(`/bloco/status/${id}`)
        return response.data
    }
}