import { useState } from "react";
import {
    useCreateBloco,
    useGetBlocos,
    useInactivateBloco,
    useUpdateBloco
} from './api'

export function useBlocoManager(){
    const [status, setStatus] = useState(true)

    const {data: blocos = [], isLoading, isError, error} = useGetBlocos(status)
    const {mutate: cadastrarBloco, isPending: isCreating} = useCreateBloco()
    const {mutate: atualizarBloco, isPending: isUpdating} = useUpdateBloco()
    const {mutate: inativarBloco, isPending: isDeleting} = useInactivateBloco()

    const loading = isCreating || isUpdating || isDeleting
    return {
        blocos,
        status,
        isLoading,
        loading,
        isError,
        error,

        //Ações
        setStatus,
        cadastrarBloco,
        atualizarBloco,
        inativarBloco
    }
}