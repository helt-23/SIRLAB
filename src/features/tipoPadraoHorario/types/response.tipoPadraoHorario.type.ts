import { ResponsePadraoHorarioType } from "../../padraoHorario/types"

export type ResponseTipoPadraoHorarioType = {
    id: number,
    descricao: string,
    descricaoDetalhada: string,
    padraoHorarios: ResponsePadraoHorarioType[]
}