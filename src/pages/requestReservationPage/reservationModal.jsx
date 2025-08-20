import React from 'react';
import { X } from 'lucide-react';
import ConfirmationDialog from '../../components/ConfirmationDialog ';
import { TimeSlotSelector, ReservationForm, ReservationSuccessModal } from './components'

const ReservationModal = ({
  isOpen,
  onClose,
  day,
  date,
  timeSlots = [],
  selectedSlotIds,
  handleSlotChange,
  reservationType,
  setReservationType,
  description,
  setDescription,
  file,
  handleFileChange,
  formErrors,
  reservationTypes,
  validateForm,
  showConfirmation,
  setShowConfirmation,
  handleConfirmReservation,
  reservationSuccess,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) setShowConfirmation(true);
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    
    try {
      const dateObj = typeof dateValue === 'string' 
        ? new Date(dateValue) 
        : dateValue;
      
      return dateObj.toLocaleDateString("pt-BR");
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };

  if (!isOpen) return null;


  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]" 
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-lg w-[90%] max-w-[540px] p-5 relative shadow-xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="absolute top-3 right-3 bg-transparent border-none cursor-pointer text-gray-500 p-1 rounded-full hover:bg-gray-200 transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          <h2 className="text-xl font-bold mb-1 text-blue-900">Solicitar Reserva</h2>
          <div className="text-gray-600 mb-4 bg-blue-50 px-3 py-1.5 rounded inline-block text-sm">
            <p>Dia: {day || "Não especificado"}</p>
            {date && <p>Data: {formatDate(date)}</p>}
          </div>

          <ReservationForm
            onSubmit={handleSubmit}
            onClose={onClose}
            reservationType={reservationType}
            setReservationType={setReservationType}
            description={description}
            setDescription={setDescription}
            file={file}
            handleFileChange={handleFileChange}
            formErrors={formErrors}
            reservationTypes={reservationTypes}
          >
            <TimeSlotSelector 
              slots={timeSlots} 
              selectedIds={selectedSlotIds} 
              onChange={handleSlotChange}
              errors={formErrors}
            />
          </ReservationForm>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmReservation}
        title="Confirmar Reserva"
        message={
          <div>
            <p className="mb-3">Tem certeza que deseja confirmar esta reserva?</p>
            {date && <p><strong>Data:</strong> {formatDate(date)}</p>}
            <p>
              <strong>Horários:</strong>{" "}
              {timeSlots
                .filter(slot => selectedSlotIds.includes(slot.horarioId))
                .map(slot => `${slot.horaInicio} - ${slot.horaFim}`)
                .join(", ") || "Nenhum horário selecionado"}
            </p>
          </div>
        }
        confirmText="Confirmar"
        cancelText="Voltar"
      />

      {reservationSuccess && <ReservationSuccessModal onClose={onClose} />}
    </>
  );
};

export default ReservationModal;