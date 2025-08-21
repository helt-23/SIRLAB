import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {ReservaServices} from "../../services/reserva.services"
import type { RequestReservaType } from "./types";

const QUERY_KEY = 'reserva'

export function useGetReservas(){
    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn: () => ReservaServices.listarReservas(),
    })
}

export function useSolicitarReserva(){

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dados: RequestReservaType) => ReservaServices.solicitarReserva(dados),
        onSuccess: (data, variables, context) => {
            
            console.log(variables?.laboratorioId)
            queryClient.invalidateQueries({queryKey: ['laboratorio', variables?.laboratorioId]})
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export function useConfirmarReserva(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({id}: {id: number}) => ReservaServices.confirmarReserva(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export function useNegarReserva(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({id}: {id: number}) => ReservaServices.negarReserva(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export function useCancelarReserva(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({id}: {id: number}) => ReservaServices.cancelarReserva(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export function useDeletarReserva(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id}: {id: number}) => ReservaServices.deletarReserva(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })

}

