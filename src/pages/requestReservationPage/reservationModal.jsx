// src/pages/requestReservationPage/ReservationModal.jsx
import { FaCheckCircle } from "react-icons/fa";
import { X, File } from "lucide-react";
import ConfirmationDialog from "../../components/ConfirmationDialog ";

const TimeSlotSelector = ({ slots, selectedIds, onChange, errors }) => (
  <div className="mb-4">
    <h3 className="font-medium text-gray-800 mb-2">Horários Disponíveis</h3>
    {slots.length === 0 ? (
      <p>Não há horários disponíveis para este dia.</p>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[180px] overflow-y-auto pr-1 py-1">
        {slots.map((slot) => (
          <div key={`slot-${slot.id}`} className="bg-gray-50 rounded p-1.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all">
            <label className="flex items-center cursor-pointer gap-1.5">
              <input
                type="checkbox"
                checked={selectedIds.includes(slot.id)}
                onChange={() => onChange(slot.id)}
                className="w-4 h-4 accent-blue-800"
              />
              <span className="text-sm">{`${slot.horaInicio} - ${slot.horaFim}`}</span>
            </label>
          </div>
        ))}
      </div>
    )}
    {errors.slots && <p className="text-red-600 text-sm mt-1">{errors.slots}</p>}
  </div>
);

const ReservationForm = ({ 
  children,
  onSubmit,
  onClose,
  reservationType,
  setReservationType,
  description,
  setDescription,
  file,
  handleFileChange,
  formErrors,
  reservationTypes
}) => (
  <form onSubmit={onSubmit}>
    {children}
    
    <div className="mb-4">
      <h3 className="font-medium text-gray-800 mb-2">Tipo de Reserva</h3>
      <select
        value={reservationType}
        onChange={(e) => setReservationType(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
      >
        <option value="">Selecione um tipo</option>
        {reservationTypes.map((type, index) => (
          <option key={`type-${type.value}-${index}`} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      {formErrors.reservationType && (
        <p className="text-red-600 text-sm mt-1">{formErrors.reservationType}</p>
      )}
    </div>

    <div className="mb-4">
      <h3 className="font-medium text-gray-800 mb-2">Descrição</h3>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descreva o objetivo da reserva..."
        className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 min-h-[80px]"
        rows={4}
      />
      {formErrors.description && (
        <p className="text-red-600 text-sm mt-1">{formErrors.description}</p>
      )}
    </div>

    <div className="mb-6">
      <h3 className="font-medium text-gray-800 mb-2">Documento (PDF)</h3>
      <label className="block cursor-pointer">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-dashed border-gray-300 rounded hover:bg-gray-100 hover:border-gray-400 transition-all">
          <File size={16} />
          <span className="text-sm">{file ? file.name : "Selecionar arquivo"}</span>
        </div>
      </label>
      {formErrors.file && <p className="text-red-600 text-sm mt-1">{formErrors.file}</p>}
    </div>

    <div className="flex justify-between gap-3 mt-5 pt-4 border-t border-gray-200">
      <button
        type="button"
        className="flex-1 py-2.5 px-4 bg-blue-900 text-white font-medium rounded hover:bg-blue-800 transition-colors"
        onClick={onClose}
      >
        Voltar
      </button>
      <button 
        type="submit" 
        className="flex-1 py-2.5 px-4 bg-green-500 text-white font-medium rounded hover:bg-green-400 transition-colors"
      >
        Confirmar Solicitação
      </button>
    </div>
  </form>
);

const ReservationSuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[4000]">
    <div className="bg-white rounded-xl p-8 max-w-[400px] w-[90%] text-center flex flex-col items-center animate-in fade-in zoom-in">
      <div className="mb-6">
        <FaCheckCircle size={48} className="text-green-500 mx-auto" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-3">Reserva realizada com sucesso!</h3>
        <p className="text-gray-700">
          Você já pode visualizar a reserva em "Minhas Reservas" no menu.
        </p>
      </div>
      <button
        className="mt-6 py-2 px-6 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors"
        onClick={onClose}
      >
        Fechar
      </button>
    </div>
  </div>
);

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

  // Função para formatar a data corretamente
  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    
    try {
      // Se for string, converte para Date
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
                .filter(slot => selectedSlotIds.includes(slot.id))
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