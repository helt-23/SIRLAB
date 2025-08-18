// src/components/ReservationCard.jsx
import { Clock, Calendar, FileText, Tag, XCircle } from "lucide-react";

export const ReservationCard = ({ booking, onRemoveClick }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR");
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };

  // Função para obter a cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMADO":
        return "bg-green-100 text-green-800";
      case "PENDENTE":
        return "bg-yellow-100 text-yellow-800";
      case "NEGADO":
      case "CANCELADO":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Horários estáticos para demonstração
  const staticHorarios = [
    { horaInicio: "08:00", horaFim: "10:00" },
    { horaInicio: "13:30", horaFim: "15:30" },
    { horaInicio: "16:00", horaFim: "18:00" }
  ];

  // Usar horários reais se existirem, senão usar os estáticos
  const horarios = booking.horarios && booking.horarios.length > 0 
    ? booking.horarios 
    : staticHorarios;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <span className="bg-blue-600 text-white rounded-lg px-3 py-1 text-sm font-medium mr-3">
            {booking.laboratorioDescricao || "Lab"}
          </span>
          <span className="text-gray-600">#ID {booking.id}</span>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-start">
            <Tag className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
            <div>
              <p className="text-xs text-gray-500">Tipo</p>
              <p className="text-gray-800 font-medium">{booking.tipoReserva}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Calendar className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
            <div>
              <p className="text-xs text-gray-500">Data da solicitação</p>
              <p className="text-gray-800 font-medium">{formatDate(booking.dataSolicitacao)}</p>
            </div>
          </div>

          <div className="flex items-start">
            <FileText className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
            <div>
              <p className="text-xs text-gray-500">Descrição</p>
              <p className="text-gray-800 font-medium">
                {booking.descricao || "Nenhuma descrição fornecida"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
            <div className="w-full">
              <p className="text-xs text-gray-500 mb-1">Horários</p>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">
                        Hora Início
                      </th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 border-b border-gray-200">
                        Hora Fim
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {horarios.length > 0 ? (
                      horarios.map((horario, index) => (
                        <tr 
                          key={index} 
                          className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="py-2 px-3 text-sm border-b border-gray-200">
                            {horario.horaInicio}
                          </td>
                          <td className="py-2 px-3 text-sm border-b border-gray-200">
                            {horario.horaFim}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td 
                          colSpan="2" 
                          className="py-3 px-3 text-sm text-gray-500 text-center"
                        >
                          Nenhum horário registrado
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        {/* Status movido para cá, acima do botão */}
        <div className="mb-3 flex justify-end">
          <span className={`${getStatusColor(booking.statusReserva)} px-3 py-1 rounded-full text-xs font-semibold`}>
            Status: {booking.statusReserva}
          </span>
        </div>
        
        {booking.statusReserva === "CONFIRMADO" && (
          <button
            onClick={() => onRemoveClick(booking.id)}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            <XCircle size={18} />
            Cancelar Reserva
          </button>
        )}
      </div>
    </div>
  );
};