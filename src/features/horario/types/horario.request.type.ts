export type RequestAlteraHorarioType = {
    dataInicio: string,
    dataFim: string,
    laboratorioId: number
}

export type RequestCadastroHorarioType = {
    dataInicio: string,
    dataFim: string,
    laboratorioId: number,
    tipoPadraoHorarioId: number
}