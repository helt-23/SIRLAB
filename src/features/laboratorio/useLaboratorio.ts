import { useState } from "react";
import {
    useCreateLaboratorio,
    useGetLaboratorios,
    useInactivateLaboratorio,
    useUpdateLaboratorio
} from './api'

export function useLaboratorioManager(){
    const [status, setStatus] = useState(true)
    const [blocoId, setBlocoId] = useState()

    const {data: laboratorios = [], isLoading, isError, error} = useGetLaboratorios(status, blocoId)
    const {mutate: cadastrarLaboratorio, isPending: isCreating} = useCreateLaboratorio()
    const {mutate: atualizarLaboratorio, isPending: isUpdating} = useUpdateLaboratorio()
    const {mutate: inativarLaboratorio, isPending: isDeleting} = useInactivateLaboratorio()

    const loading = isCreating || isUpdating || isDeleting
    console.log(blocoId)
    return {
        laboratorios,
        status,
        isLoading,
        loading,
        isError,
        error,
        blocoId,

        //Ações
        setStatus,
        cadastrarLaboratorio,
        atualizarLaboratorio,
        inativarLaboratorio,
        setBlocoId
    }
}