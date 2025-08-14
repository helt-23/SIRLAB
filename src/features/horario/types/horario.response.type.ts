import { ResponseReservaType } from "../../reserva/types"

export type ResponseHorarioType = {
    id: number,
    data: string,
    horarioInicio: string,
    horarioFim: string,
    diaSemana: "SEGUNDA" | "TERCA" | "QUARTA" | "QUINTA" | "SEXTA" | "SABADO" | "DOMINGO",
    statusHorario: string,
    isDisponivel: boolean,
    reserva: ResponseReservaType
}