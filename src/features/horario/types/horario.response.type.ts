import { ResponseReservaType } from "../../reserva/types"

export type ResponseHorarioType = {
    id: number,
    data: string,
    horarioInicio: string,
    horarioFim: string,
    diaSemana: string,
    statusHorario: string,
    isDisponivel: boolean,
    reserva: ResponseReservaType
}