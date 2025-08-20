// src/customHooks/useReservation.js
import { useState, useCallback } from "react";
import { useReservaManager } from "../features/reserva/useReserva";

export const useReservation = (labId) => {
  const { solicitarReserva } = useReservaManager();
  
  const [reservationModal, setReservationModal] = useState({
    open: false,
    day: "",
    date: null,
    timeSlots: [],
    labDetails: null,
  });

  const [selectedSlotIds, setSelectedSlotIds] = useState([]);
  const [reservationType, setReservationType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);

  const reservationTypes = [
    { value: 1, label: "Aula" },
    { value: 2, label: "Manutenção" },
    { value: 3, label: "Instalação de Software" },
    { value: 4, label: "Outro" },
  ];

  const openReservationModal = useCallback((day, date, timeSlots, labDetails) => {
    setReservationModal({
      open: true,
      day,
      date,
      timeSlots,
      labDetails,
    });
    resetForm();
  }, []);

  const closeReservationModal = useCallback(() => {
    setReservationModal({
      open: false,
      day: "",
      date: null,
      timeSlots: [],
      labDetails: null,
    });
  }, []);

  const handleSlotChange = useCallback((horarioId) => {
    setSelectedSlotIds(prev => 
      prev.includes(horarioId) 
        ? prev.filter(id => id !== horarioId) 
        : [...prev, horarioId]
    );
    setFormErrors(prev => ({ ...prev, slots: null }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFormErrors(prev => ({ ...prev, file: null }));
    } else {
      setFormErrors(prev => ({ ...prev, file: "Por favor, selecione um arquivo PDF." }));
    }
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (selectedSlotIds.length === 0) {
      newErrors.slots = "Selecione pelo menos um horário.";
    }

    if (!reservationType) {
      newErrors.reservationType = "Selecione o tipo de reserva.";
    }

    if (!description.trim()) {
      newErrors.description = "Insira uma descrição.";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [selectedSlotIds, reservationType, description]);

  const resetForm = useCallback(() => {
    setSelectedSlotIds([]);
    setReservationType("");
    setDescription("");
    setFile(null);
    setFormErrors({});
    setReservationSuccess(false);
  }, []);

  const handleConfirmReservation = useCallback(async() => {
    if (!validateForm()) return;

    // Simulação de ID de usuário - substituir quando o auth estiver funcionando AAAAAAAAAAAA
    const usuarioId = 1; // Valor temporário

    const reservaData = {
      descricao: description,
      caminhoPdf: null, // Implementar upload posteriormente
      tipoReserva: parseInt(reservationType),
      horariosId: selectedSlotIds,
      laboratorioId: parseInt(labId),
      usuarioId
    };

      try {
        // 1. Chama a mutação e espera o resultado
        const resultadoDaApi = await solicitarReserva(reservaData);
        setReservationSuccess(true);
        setTimeout(() => {
          closeReservationModal();
        }, 3000);

      } catch (error) {
        console.error("Erro ao solicitar reserva (no componente):", error);
        setFormErrors({ submit: "Falha ao criar reserva. Tente novamente." });
      } finally {
        // A lógica de `setShowConfirmation` pode ser controlada pelo estado de pending
        setShowConfirmation(false);
      }

  }, [validateForm, description, reservationType, selectedSlotIds, labId, solicitarReserva, closeReservationModal]);

  return {
    isModalOpen: reservationModal.open,
    reservationModal,
    selectedSlotIds,
    reservationType,
    description,
    file,
    formErrors,
    showConfirmation,
    reservationTypes,
    reservationSuccess,
    openReservationModal,
    closeReservationModal,
    handleSlotChange,
    handleFileChange,
    setReservationType,
    setDescription,
    validateForm,
    handleConfirmReservation,
    setShowConfirmation,
  };
};