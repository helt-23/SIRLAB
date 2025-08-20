import {
    useGetReservas,
    useSolicitarReserva,
    useConfirmarReserva,
    useNegarReserva,
    useCancelarReserva
} from './api'

export function useReservaManager(){

    const {data: reservas = [], isLoading: isListaLoading, isError: isListError, error: listError} = useGetReservas()
    const {mutateAsync: solicitarReserva, isPending: isCreating} = useSolicitarReserva()
    const {mutate: confirmarReserva, isPending: isUpdatingConf} = useConfirmarReserva()
    const {mutate: negarReserva, isPending: isUpdatingNegar} = useNegarReserva()
    const {mutate: cancelarReserva, isPending: isUpdatingCanc} = useCancelarReserva()

    const loading = isCreating || isUpdatingConf || isUpdatingNegar || isUpdatingCanc
    return {
        reservas,
        isListaLoading,
        loading,
        isListError,
        listError,
        isCreating,
        isUpdatingCanc,
        isUpdatingNegar,

        //Ações
        solicitarReserva,
        confirmarReserva,
        negarReserva,
        cancelarReserva
    }
}