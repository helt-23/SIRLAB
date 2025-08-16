import {
    useCreateTipoPadraoHorario,
    useGetTipoPadraoHorarios,
    useDeleteTipoPadraoHorario,
    useUpdateTipoPadraoHorario
} from './api'

export function useTipoPadraoHorarioManager(){

    const {data: tipoPadraoHorario = [], isLoading, isError, error} = useGetTipoPadraoHorarios()
    const {mutate: cadastrarTipoPadraoHorario, isPending: isCreating} = useCreateTipoPadraoHorario()
    const {mutate: atualizarTipoPadraoHorario, isPending: isUpdating} = useUpdateTipoPadraoHorario()
    const {mutate: deletarTipoPadraoHorario, isPending: isDeleting} = useDeleteTipoPadraoHorario()

    const loading = isCreating || isUpdating || isDeleting
    return {
        tipoPadraoHorario,
        isLoading,
        loading,
        isError,
        error,

        //Ações
        cadastrarTipoPadraoHorario,
        atualizarTipoPadraoHorario,
        deletarTipoPadraoHorario
    }
}