import { Trash2 } from "lucide-react";

// OBSERVAÇÃO, PRECISAMOS QUE APAREÇA O BLOCO E QUAL É O LABORATÓRIO NO CARD, DA FORMA QUE ESTÁ AGORA, ELE SÓ ESTÁ MOSTRANDO O BLOCO
export const ReservationCard = ({ booking, onRemoveClick }) => {
  console.log(booking)
  const labSala = booking.laboratorioDescricao || "Laboratório Desconhecido";
  const labParts = labSala.split("-");
  const labCode = labParts.length > 0 ? labParts[0].trim() : "";
  const labName = labParts.length > 1 ? labParts[1].trim() : labSala;

  const requestDate = booking.dataSolicitacao
    ? new Date(booking.dataSolicitacao)
    : null;

  const bookingDate = booking.bookingDate
    ? new Date(booking.bookingDate)
    : null;

  // Status válidos: ESPERA, Negada, CONFIRMADO
  const isValidStatus = ["ESPERA", "NEGADO", "CONFIRMADO"].includes(
    booking.statusReserva
  );
  const status = isValidStatus ? booking.statusReserva : "ESPERA";

  // Só permite cancelar reservas ESPERAs
  const canCancel = status === "ESPERA";

  return (
    <div className="reservation-card">
      <div className="card-header">
        <h3 className="room-number">
          {labCode && <span className="lab-code">{labCode}</span>}
          {labName}
        </h3>
      </div>

      <div className="reservation-detail">
        <strong>Descrição:</strong> {booking.descricao || "Sem descrição"}
      </div>

      <div className="reservation-details">
        <div className="reservation-detail">
          <strong>Solicitado em:</strong>{" "}
          {requestDate
            ? requestDate.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Data desconhecida"}
        </div>

        <div className="reservation-detail">
          <strong>Data:</strong>{" "}
          {bookingDate
            ? bookingDate.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short",
              })
            : "Data desconhecida"}
          {bookingDate && (
            <span className="weekday">
              ({" "}
              {bookingDate.toLocaleDateString("pt-BR", {
                weekday: "short",
              })}{" "}
              )
            </span>
          )}
        </div>

        <div className="reservation-detail">
          <strong>Horário:</strong> {booking.startTime || "?"} -{" "}
          {booking.endTime || "?"}
        </div>

        <div className="reservation-detail">
          <strong>Dia:</strong> {booking.dia || "Não especificado"}
        </div>

        <div className="reservation-detail">
          <strong>Status:</strong>{" "}
          <span className={`status-badge ${status.toLowerCase()}`}>
            {status}
          </span>
        </div>
      </div>

      {canCancel && (
        <button
          className="cancel-button"
          onClick={() => onRemoveClick(booking.id)}
        >
          <Trash2 size={16} className="icon" />
          Cancelar
        </button>
      )}
    </div>
  );
};
