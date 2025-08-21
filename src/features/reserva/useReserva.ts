import {
    useGetReservas,
    useSolicitarReserva,
    useConfirmarReserva,
    useNegarReserva,
    useCancelarReserva,
    useDeletarReserva
} from './api'

export function useReservaManager(){

    const {data: reservas = [], isLoading: isListaLoading, isError: isListError, error: listError} = useGetReservas()
    const {mutateAsync: solicitarReserva, isPending: isCreating} = useSolicitarReserva()
    const {mutate: confirmarReserva, isPending: isUpdatingConf} = useConfirmarReserva()
    const {mutate: negarReserva, isPending: isUpdatingNegar} = useNegarReserva()
    const {mutate: cancelarReserva, isPending: isUpdatingCanc} = useCancelarReserva()
    const {mutate: deletarReserva, isPending: isUpdatingDel} = useDeletarReserva()

    const loading = isCreating || isUpdatingConf || isUpdatingNegar || isUpdatingCanc || isUpdatingDel
    return {
        reservas,
        isListaLoading,
        loading,
        isListError,
        listError,
        isCreating,
        isUpdatingCanc,
        isUpdatingNegar,
        isUpdatingDel,

        //Ações
        solicitarReserva,
        confirmarReserva,
        negarReserva,
        cancelarReserva,
        deletarReserva
    }
}