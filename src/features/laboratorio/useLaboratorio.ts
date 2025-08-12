import { useState } from "react";
import {
    useCreateLaboratorio,
    useGetLaboratorioDetalhado,
    useGetLaboratorios,
    useInactivateLaboratorio,
    useUpdateLaboratorio
} from './api'

export function useLaboratorioManager(){
    const [status, setStatus] = useState(true)
    const [blocoId, setBlocoId] = useState()
    const [labId, setLabId] = useState(2)

    const {data: laboratorios = [], isLoading: isListaLoading, isError: isListError, error: listError} = useGetLaboratorios(status, blocoId)
    const {data: laboratorioDetalhado, isLoading: isDetalhesLoading, isError: isDetalhesError, error: detalhesError} = useGetLaboratorioDetalhado(labId)
    const {mutate: cadastrarLaboratorio, isPending: isCreating} = useCreateLaboratorio()
    const {mutate: atualizarLaboratorio, isPending: isUpdating} = useUpdateLaboratorio()
    const {mutate: inativarLaboratorio, isPending: isDeleting} = useInactivateLaboratorio()

    const loading = isCreating || isUpdating || isDeleting
    return {
        laboratorios,
        status,
        isListaLoading,
        loading,
        isListError,
        listError,
        isDetalhesLoading,
        isDetalhesError,
        detalhesError,
        blocoId,
        laboratorioDetalhado,

        //Ações
        setStatus,
        cadastrarLaboratorio,
        atualizarLaboratorio,
        inativarLaboratorio,
        setBlocoId,
        setLabId
    }
}