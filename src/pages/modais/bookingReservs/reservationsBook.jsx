import { useState } from "react";
import { useLabData } from "../../../context/LabDataContext";
import { X } from "lucide-react";
import ConfirmationDialog from "../../../components/ConfirmationDialog ";
import { ReservationCard } from "./reservationCard";
import {useReservaManager} from "../../../features/reserva/useReserva"
import "./myReserva.css";

export function BookingReservs() {
  const {
    isBookingsModalOpen,
    closeBookingsModal,
    removeUserBooking,
  } = useLabData();
  const useReserva = useReservaManager()
  const reservas = useReserva.reservas

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [bookingToRemove, setBookingToRemove] = useState(null);

  const handleRemoveClick = (id) => {
    setBookingToRemove(id);
    setIsConfirmationOpen(true);
  };

  const handleConfirmRemove = () => {
    if (bookingToRemove) {
      removeUserBooking(bookingToRemove);
      setIsConfirmationOpen(false);
      setBookingToRemove(null);
    }
  };

  if (!isBookingsModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeBookingsModal}>
      <main className="reservations-page" onClick={(e) => e.stopPropagation()}>
        <div className="reservations-container">
          <header className="reservations-header">
            <h1 className="reservations-title">Minhas Reservas</h1>
          </header>

          {reservas.length === 0 ? (
            <div className="div-semReserva">
              <h3>Você não possui reservas</h3>
            </div>
          ) : (
            <section className="reservation-list">
              {reservas.map((booking) => (
                <ReservationCard
                  key={booking.id}
                  booking={booking}
                  onRemoveClick={handleRemoveClick}
                />
              ))}
            </section>
          )}

          <button className="close-modal" onClick={closeBookingsModal}>
            <X size={24} />
          </button>
        </div>
      </main>

      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirmRemove}
        title="Cancelar Reserva"
        message="Tem certeza que deseja cancelar esta reserva?"
        confirmText="Cancelar reserva"
        cancelText="Voltar"
      />
    </div>
  );
}
