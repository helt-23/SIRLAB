import { useState } from "react";
import {
    useCreateLaboratorio,
    useGetLaboratorios,
    useInactivateLaboratorio,
    useUpdateLaboratorio
} from './api'

export function useLaboratorioManager(){
    const [status, setStatus] = useState(true)

    const {data: laboratorios = [], isLoading, isError, error} = useGetLaboratorios(status)
    const {mutate: cadastrarLaboratorio, isPending: isCreating} = useCreateLaboratorio()
    const {mutate: atualizarLaboratorio, isPending: isUpdating} = useUpdateLaboratorio()
    const {mutate: inativarLaboratorio, isPending: isDeleting} = useInactivateLaboratorio()

    const loading = isCreating || isUpdating || isDeleting
    return {
        laboratorios,
        status,
        isLoading,
        loading,
        isError,
        error,

        //Ações
        setStatus,
        cadastrarLaboratorio,
        atualizarLaboratorio,
        inativarLaboratorio
    }
}