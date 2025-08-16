import {
    useCreatePadraoHorario,
    useGetPadraoHorarios,
    useDeletePadraoHorario,
    useUpdatePadraoHorario
} from './api'

export function usePadraoHorarioManager(){

    const {data: padroesHorario = [], isLoading: isLoadingPadrao, isError, error} = useGetPadraoHorarios()
    const {mutate: cadastrarPadraoHorario, isPending: isCreating} = useCreatePadraoHorario()
    const {mutate: atualizarPadraoHorario, isPending: isUpdating} = useUpdatePadraoHorario()
    const {mutate: deletarPadraoHorario, isPending: isDeleting} = useDeletePadraoHorario()

    const loading = isCreating || isUpdating || isDeleting
    return {
        padroesHorario,
        isLoadingPadrao,
        loading,
        isError,
        error,

        //Ações
        cadastrarPadraoHorario,
        atualizarPadraoHorario,
        deletarPadraoHorario
    }
}