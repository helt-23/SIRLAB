// src/context/LabDataContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import {
  getBlocos,
  getLaboratorios,
  getSchedules,
  getUserBookings,
  getAllBookings // Adicione esta nova função no labService
} from '../services/labServices';

const LabDataContext = createContext();

export const LabDataProvider = ({ children }) => {
  const [blocos, setBlocos] = useState([]);
  const [laboratorios, setLaboratorios] = useState({});
  const [schedules, setSchedules] = useState({});
  const [userBookings, setUserBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]); // Novo estado para todas as reservas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        setBlocos(getBlocos());
        setLaboratorios(getLaboratorios());
        setSchedules(getSchedules());

        // Busca reservas do usuário
        const userBookingsData = getUserBookings();
        setUserBookings(userBookingsData);

        // Busca TODAS as reservas
        const allBookingsData = getAllBookings();
        setAllBookings(allBookingsData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openBookingsModal = () => setIsBookingsModalOpen(true);
  const closeBookingsModal = () => setIsBookingsModalOpen(false);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const getLabDetails = (labId) => laboratorios[labId] || null;
  const getLabSchedule = (labId) => schedules[labId] || null;

  // Função para obter todas as reservas de um laboratório específico
  const getAllBookingsForLab = (labId) => {
    return allBookings.filter(booking => booking.labId === labId);
  };

  const addUserBooking = (newBooking) => {
    const newId = allBookings.length > 0
      ? Math.max(...allBookings.map(b => b.id)) + 1
      : 1;

    const bookingToAdd = {
      ...newBooking,
      id: newId,
      status: "pendente" // Status padrão para novas reservas
    };

    // Atualiza ambas as listas
    setUserBookings(prev => [...prev, bookingToAdd]);
    setAllBookings(prev => [...prev, bookingToAdd]);

    return bookingToAdd;
  };

  const removeUserBooking = (bookingId) => {
    setUserBookings(prev => prev.filter(b => b.id !== bookingId));
    setAllBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  // Função para atualizar o status de uma reserva (ex: de pendente para confirmado)
  const updateBookingStatus = (bookingId, newStatus) => {
    setAllBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    );

    setUserBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    );
  };

  return (
    <LabDataContext.Provider value={{
      blocos,
      laboratorios,
      schedules,
      loading,
      error,
      userBookings,
      allBookings, // Disponibiliza todas as reservas
      isBookingsModalOpen,
      isProfileModalOpen,
      openBookingsModal,
      closeBookingsModal,
      openProfileModal,
      closeProfileModal,
      getLabDetails,
      getLabSchedule,
      getAllBookingsForLab, // Nova função
      addUserBooking,
      removeUserBooking,
      updateBookingStatus // Nova função para atualizar status
    }}>
      {children}
    </LabDataContext.Provider>
  );
};

export const useLabData = () => {
  const context = useContext(LabDataContext);
  if (context === undefined) {
    throw new Error('useLabData must be used within a LabDataProvider');
  }
  return context;
};