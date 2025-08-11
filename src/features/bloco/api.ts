import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BlocoServices } from "../../services/bloco.services";
import type { RequestBlocoType } from "./types";


const QUERY_KEY = 'bloco'

export function useGetBlocos(status: boolean){
    return useQuery({
        queryKey: [QUERY_KEY, status],
        queryFn: () => BlocoServices.listarTodosBloco(status),
    })
}

export function useCreateBloco(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dados: RequestBlocoType) => BlocoServices.cadastrarBloco(dados),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export function useUpdateBloco(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({id, dados}: {id: number, dados: RequestBlocoType}) => BlocoServices.atualizarBloco(id, dados),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export function useInactivateBloco(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => BlocoServices.inativarBloco(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY]})            
        },
        onError: (err) => {
            console.log(err)
        }
    })
}