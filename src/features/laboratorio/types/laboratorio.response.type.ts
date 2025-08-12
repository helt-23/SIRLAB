import { ResponseHorarioType } from "../../horario/types"

export type ResponseLaboratorioType = {
    id: number,
    descricao: string,
    sigla: string,
    capacidade: number,
    localizacao: string,
    isAtivo: boolean,
    observacao: string,
    bloco: string,
    blocoId: number
}

export type ResponseLaboratorioDetalhadoType = {
    laboratorio: ResponseLaboratorioType,
    horarios: [ResponseHorarioType]
}