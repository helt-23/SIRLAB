import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./reservation.css";
import { X, File } from "lucide-react";
import ConfirmationDialog from "../../components/ConfirmationDialog ";

const ReservationModal = ({
  isOpen,
  onClose,
  day,
  date,
  timeSlots = [],
  // Propriedades do hook
  selectedSlots,
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
  const availableSlots = timeSlots.filter((slot) => slot?.tipo === "livre");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="reservation-modal-overlay" onClick={onClose}>
        <div className="reservation-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>

          <h2 className="modal-title">Solicitar Reserva</h2>
          <div className="modal-subtitle">
            <p>Dia: {day || "Não especificado"}</p>
            {date && <p>Data: {date.toLocaleDateString("pt-BR")}</p>}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3 className="section-title">Horários Disponíveis</h3>
              {availableSlots.length === 0 ? (
                <p>Não há horários disponíveis para este dia.</p>
              ) : (
                <div className="time-slots">
                  {availableSlots.map((slot, index) => {
                    const horario = slot.horario || `Slot ${index + 1}`;
                    return (
                      <div key={`${horario}-${index}`} className="slot-item">
                        <label className="slot-label">
                          <input
                            type="checkbox"
                            checked={selectedSlots.includes(horario)}
                            onChange={() => handleSlotChange(horario)}
                            className="slot-checkbox"
                          />
                          <span className="slot-time">{horario}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
              {formErrors.slots && (
                <p className="error-message">{formErrors.slots}</p>
              )}
            </div>

            <div className="form-section">
              <h3 className="section-title">Tipo de Reserva</h3>
              <select
                value={reservationType}
                onChange={(e) => setReservationType(e.target.value)}
                className="reservation-select"
              >
                <option value="">Selecione um tipo</option>
                {reservationTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {formErrors.reservationType && (
                <p className="error-message">{formErrors.reservationType}</p>
              )}
            </div>

            <div className="form-section">
              <h3 className="section-title">Descrição</h3>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o objetivo da reserva..."
                className="reservation-textarea"
                rows={4}
              />
              {formErrors.description && (
                <p className="error-message">{formErrors.description}</p>
              )}
            </div>

            <div className="form-section">
              <h3 className="section-title">Documento (PDF)</h3>
              <label className="file-upload">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <div className="file-upload-label">
                  <File size={16} />
                  <span>{file ? file.name : "Selecionar arquivo"}</span>
                </div>
              </label>
              {formErrors.file && (
                <p className="error-message">{formErrors.file}</p>
              )}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="action-button cancel"
                onClick={onClose}
              >
                Voltar
              </button>
              <button type="submit" className="action-button confirm">
                Confirmar Solicitação
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Confirmação de Reserva */}
      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmReservation}
        title="Confirmar Reserva"
        message={
          <div>
            <p className="mensage-reservation">
              Tem certeza que deseja confirmar esta reserva?
            </p>
            {date && (
              <p>
                <strong>Data:</strong> {date.toLocaleDateString("pt-BR")}
              </p>
            )}
            <p>
              <strong>Horários:</strong>{" "}
              {selectedSlots.join(", ") || "Nenhum horário selecionado"}
            </p>
          </div>
        }
        confirmText="Confirmar"
        cancelText="Voltar"
      />

      {/* Modal de Sucesso */}
      {reservationSuccess && (
        <div className="reservation-success-overlay">
          <div className="reservation-success-modal">
            <div className="success-icon">
              <FaCheckCircle size={48} className="text-green-500" />
            </div>
            <div className="success-content">
              <h3 className="success-title">Reserva realizada com sucesso!</h3>
              <p className="success-text">
                Você já pode visualizar a reserva em "Minhas Reservas" no menu.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationModal;
