import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TipoPadraoHorarioServices } from "../../services/tipoPadraoHorario.services";
import type { RequestTipoPadraoHorarioType } from "./types";


const QUERY_KEY = 'tipoPadraoHorario'

export function useGetTipoPadraoHorarios(){
    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn: () => TipoPadraoHorarioServices.listarTipoPadraoHorario(),
    })
}

export function useCreateTipoPadraoHorario(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dados: RequestTipoPadraoHorarioType) => TipoPadraoHorarioServices.cadastrarTipoPadraoHorario(dados),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export function useUpdateTipoPadraoHorario(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({id, dados}: {id: number, dados: RequestTipoPadraoHorarioType}) => TipoPadraoHorarioServices.atualizarTipoPadraoHorario(id, dados),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export function useDeleteTipoPadraoHorario(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => TipoPadraoHorarioServices.deletarTipoPadraoHorario(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})            
        },
        onError: (err) => {
            console.log(err)
        }
    })
}