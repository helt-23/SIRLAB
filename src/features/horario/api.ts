import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HorarioServices } from "../../services/horario.services";
import type { RequestHorarioType } from "./types";


const QUERY_KEY = 'horario'

export function useCadastrarHorarioPorPeriodo(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dados: RequestHorarioType) => HorarioServices.cadastrarHorarioPorPeriodo(dados),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export function useDeletarHorarioPorPeriodo(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({dados}: {dados: RequestHorarioType}) => HorarioServices.atualizarHorarioPorPeriodo(dados),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })
}
