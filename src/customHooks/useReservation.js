import { useState, useCallback } from "react";

export const useReservation = (labId, addUserBooking) => {
  // Estado do modal de reserva
  const [reservationModal, setReservationModal] = useState({
    open: false,
    day: "",
    date: null,
    timeSlots: [],
    labDetails: null,
  });

  // Estado do formulário de reserva
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [reservationType, setReservationType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);

  const reservationTypes = [
    { value: "aula", label: "Aula" },
    { value: "manutencao", label: "Manutenção" },
    { value: "instalacao", label: "Instalação de Software" },
    { value: "outro", label: "Outro" },
  ];

  // Funções para abrir e fechar o modal
  const openReservationModal = useCallback(
    (day, date, timeSlots, labDetails) => {
      setReservationModal({
        open: true,
        day,
        date,
        timeSlots,
        labDetails,
      });
      resetForm();
    },
    []
  );

  const closeReservationModal = useCallback(() => {
    setReservationModal({
      open: false,
      day: "",
      date: null,
      timeSlots: [],
      labDetails: null,
    });
  }, []);

  // Manipulação do formulário
  const handleSlotChange = useCallback(
    (slotTime) => {
      setSelectedSlots((prev) => {
        if (prev.includes(slotTime)) {
          return prev.filter((time) => time !== slotTime);
        } else {
          return [...prev, slotTime];
        }
      });

      if (formErrors.slots) {
        setFormErrors((prev) => ({ ...prev, slots: null }));
      }
    },
    [formErrors]
  );

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFormErrors((prev) => ({ ...prev, file: null }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        file: "Por favor, selecione um arquivo PDF.",
      }));
    }
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (selectedSlots.length === 0) {
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
  }, [selectedSlots, reservationType, description]);

  const resetForm = useCallback(() => {
    setSelectedSlots([]);
    setReservationType("");
    setDescription("");
    setFile(null);
    setFormErrors({});
    setReservationSuccess(false);
  }, []);

  // Submissão da reserva: cria uma reserva para cada horário selecionado
  const handleReserveSubmit = useCallback(() => {
    if (!validateForm()) return false;

    // Verificar se a data é válida
    const bookingDate = reservationModal.date;
    if (!bookingDate || isNaN(bookingDate.getTime())) {
      console.error("Data de reserva inválida");
      return false;
    }

    // Para cada horário selecionado, criar uma reserva
    selectedSlots.forEach((slot) => {
      const [startTime, endTime] = slot.split(" - ");

      const newBooking = {
        id: Date.now() + Math.random(), // ID único
        labId,
        status: "pendente",
        labSala:
          reservationModal.labDetails?.sala || "Laboratório Desconhecido",
        requestDate: new Date().toISOString(),
        bookingDate: bookingDate.toISOString(),
        startTime,
        endTime,
        dia: reservationModal.day,
        horario: slot,
        usuario: { nome: "Usuário", matricula: "2023001" },
        reservationType,
        description,
        file: file ? file.name : null,
      };

      addUserBooking(newBooking);
    });

    return true;
  }, [
    validateForm,
    selectedSlots,
    reservationModal,
    labId,
    addUserBooking,
    reservationType,
    description,
    file,
  ]);

  const handleConfirmReservation = useCallback(() => {
    const success = handleReserveSubmit();
    if (success) {
      setShowConfirmation(false);
      setReservationSuccess(true);

      // Fecha automaticamente após 3 segundos
      setTimeout(() => {
        setReservationSuccess(false);
        closeReservationModal();
      }, 3000);
    }
  }, [handleReserveSubmit, closeReservationModal]);

  return {
    // Estados
     isModalOpen: reservationModal.open,
    reservationModal,
    selectedSlots,
    reservationType,
    description,
    file,
    formErrors,
    showConfirmation,
    reservationTypes,
    reservationSuccess,
    setReservationSuccess,

    // Funções
    openReservationModal,
    closeReservationModal,
    handleSlotChange,
    handleFileChange,
    setReservationType,
    setDescription,
    validateForm,
    resetForm,
    handleReserveSubmit,
    handleConfirmReservation,
    setShowConfirmation,
  };
};
