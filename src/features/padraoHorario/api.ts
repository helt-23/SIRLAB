import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PadraoHorarioServices } from "../../services/padraoHorario.services";
import type { RequestPadraoHorarioType } from "./types";


const QUERY_KEY = 'padraoHorario'

export function useGetPadraoHorarios(){
    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn: () => PadraoHorarioServices.listarPadraoHorario(),
    })
}

export function useCreatePadraoHorario(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dados: RequestPadraoHorarioType) => PadraoHorarioServices.cadastrarPadraoHorario(dados),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export function useUpdatePadraoHorario(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({id, dados}: {id: number, dados: RequestPadraoHorarioType}) => PadraoHorarioServices.atualizarPadraoHorario(id, dados),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export function useDeletePadraoHorario(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => PadraoHorarioServices.deletarPadraoHorario(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})            
        },
        onError: (err) => {
            console.log(err)
        }
    })
}