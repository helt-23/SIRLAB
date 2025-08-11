export type RequestReservaType = {
    descricao: string,
    caminhoPdf: string | null,
    tipoReserva: number,
    horariosId: number[],
    laboratorioId: number,
    usuarioId: number
}

export type RequestReservaFixaType = {
    descricao: string,
    caminhoPdf: string | null,
    tipoReserva: number,
    padraoHorariosId: number[],
    laboratorioId: number,
    usuarioId: number,
    dataInicio: string,
    dataFim: string
}