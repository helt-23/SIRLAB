// src/components/requestReservationPage/ConfirmationDialog.jsx
import '../assets/styles/confirmationDialog.css'; // Arquivo CSS separado
import { X } from 'lucide-react';

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmação",
  message = "Tem certeza que deseja realizar esta ação?",
  confirmText = "Confirmar",
  cancelText = "Voltar"
}) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose}>
          <X size={20} />
        </button>

        <h3 className="dialog-title">{title}</h3>
        <div className="dialog-message">{message}</div>

        <div className="dialog-actions">
          <button className="dialog-button secondary" onClick={onClose}>
            {cancelText}
          </button>
          <button className="dialog-button primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;