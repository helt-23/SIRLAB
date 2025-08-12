import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LaboratorioServices } from "../../services/laboratorio.services";
import type { RequestLaboratorioType } from "./types";

const QUERY_KEY = 'laboratorio'

export function useGetLaboratorios(status: boolean, blocoId?: number){
    return useQuery({
        queryKey: [QUERY_KEY, status, blocoId],
        queryFn: () => LaboratorioServices.listarTodosLaboratorios(status, blocoId),
    })
}

export function useCreateLaboratorio(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dados: RequestLaboratorioType) => LaboratorioServices.cadastrarLaboratorio(dados),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export function useUpdateLaboratorio(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({id, dados}: {id: number, dados: RequestLaboratorioType}) => LaboratorioServices.atualizarLaboratorio(id, dados),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export function useInactivateLaboratorio(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => LaboratorioServices.inativarLaboratorio(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})            
        },
        onError: (err) => {
            console.log(err)
        }
    })
}