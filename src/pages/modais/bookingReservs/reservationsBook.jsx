import { useState } from "react";
import { useLabData } from "../../../context/LabDataContext";
import { X } from "lucide-react";
import ConfirmationDialog from "../../../components/ConfirmationDialog ";
import { ReservationCard } from "./reservationCard";
import { useReservaManager } from "../../../features/reserva/useReserva";

export function BookingReservs() {
  const {
    isBookingsModalOpen,
    closeBookingsModal,
    removeUserBooking,
  } = useLabData();
  const useReserva = useReservaManager();
  const reservas = useReserva.reservas;

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
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
      onClick={closeBookingsModal}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 relative flex-grow flex flex-col">
          <header className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 relative inline-block pb-3">
              Minhas Reservas
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
            </h1>
          </header>

          {reservas.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              </div>
              <h3 className="text-xl font-medium text-gray-600">Você não possui reservas</h3>
              <p className="text-gray-500 mt-2">Todas as suas reservas aparecerão aqui quando forem criadas.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2">
              {reservas.map((booking) => (
                <ReservationCard
                  key={booking.id}
                  booking={booking}
                  onRemoveClick={handleRemoveClick}
                />
              ))}
            </div>
          )}

          <button 
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
            onClick={closeBookingsModal}
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>
      </div>

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