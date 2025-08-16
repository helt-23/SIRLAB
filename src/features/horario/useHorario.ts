import {
    useCadastrarHorarioPorPeriodo,
    useDeletarHorarioPorPeriodo
} from './api'

export function useHorarioManager(){

    const {mutate: cadastrarHorarios, isPending: isCreating} = useCadastrarHorarioPorPeriodo()
    const {mutate: deletarHorarios, isPending: isUpdating} = useDeletarHorarioPorPeriodo()

    const loading = isCreating || isUpdating
    return {
        loading,
        //Ações
        cadastrarHorarios,
        deletarHorarios
    }
}