// src/context/LabDataContext.js
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  getBlocos,
  getLaboratorios,
  getSchedules,
  getHorarios, // Import mantido
  getUserBookings,
  getAllBookings // Adicione esta nova função no labService
} from '../services/labServices';

const LabDataContext = createContext();

export const LabDataProvider = ({ children }) => {
  const [blocos, setBlocos] = useState([]);
  const [laboratorios, setLaboratorios] = useState({});
  const [schedules, setSchedules] = useState({});
  const [horarios, setHorarios] = useState([]); // Novo estado
  const [userBookings, setUserBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Função para buscar horários
  const fetchHorarios = useCallback((labId, startDate, endDate) => {
    try {
      const data = getHorarios(labId, startDate, endDate);
      setHorarios(data);

      // Extrai reservas dos horários e atualiza allBookings
      const reservas = data
        .filter((item) => item.reserva)
        .map((item) => ({
          ...item.reserva,
          data: item.data,
          horarioInicio: item.horarioInicio,
          horarioFim: item.horarioFim,
        }));

      setAllBookings((prev) => [
        ...prev.filter((b) => !reservas.some((r) => r.id === b.id)),
        ...reservas,
      ]);

      return data;
    } catch (err) {
      setError("Erro ao buscar horários: " + err.message);
      return [];
    }
  }, []);

  useEffect(() => {
    const fetchInitialData = () => {
      try {
        setLoading(true);
        setBlocos(getBlocos());
        setLaboratorios(getLaboratorios());
        setSchedules(getSchedules());
        setUserBookings(getUserBookings());

        // Busca inicial de horários (exemplo com datas padrão)
        fetchHorarios(1, "2025-08-18", "2025-08-23");

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [fetchHorarios]);

  const openBookingsModal = () => setIsBookingsModalOpen(true);
  const closeBookingsModal = () => setIsBookingsModalOpen(false);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);
  const getLabDetails = (labId) => laboratorios[labId] || null;
  const getLabSchedule = (labId) => schedules[labId] || null;

  // Função para obter todas as reservas de um laboratório específico
  const getAllBookingsForLab = (labId) => {
    return allBookings.filter((booking) => booking.labId === labId);
  };

  const addUserBooking = (newBooking) => {
    const newId =
      allBookings.length > 0
        ? Math.max(...allBookings.map((b) => b.id)) + 1
        : 1;

    const bookingToAdd = {
      ...newBooking,
      id: newId,
      status: "pendente", // Status padrão para novas reservas
    };

    // Atualiza ambas as listas
    setUserBookings((prev) => [...prev, bookingToAdd]);
    setAllBookings((prev) => [...prev, bookingToAdd]);

    return bookingToAdd;
  };

  const removeUserBooking = (bookingId) => {
    setUserBookings((prev) => prev.filter((b) => b.id !== bookingId));
    setAllBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  // Função para atualizar o status de uma reserva (ex: de pendente para confirmado)
  const updateBookingStatus = (bookingId, newStatus) => {
    setAllBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );

    setUserBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
  };
  const getHorariosForLab = (labId, startDate, endDate) => {
    return getHorarios(labId, startDate, endDate);
  };

  return (
    <LabDataContext.Provider
      value={{
        blocos,
        laboratorios,
        loading,
        error,
        userBookings,
        allBookings,
        isBookingsModalOpen,
        isProfileModalOpen,
        openBookingsModal,
        closeBookingsModal,
        openProfileModal,
        closeProfileModal,
        getLabDetails,
        getLabSchedule,
        getAllBookingsForLab,
        addUserBooking,
        removeUserBooking,
        updateBookingStatus,
        getHorariosForLab,
      }}
    >
      {children}
    </LabDataContext.Provider>
  );
};

export const useLabData = () => {
  const context = useContext(LabDataContext);
  if (context === undefined) {
    throw new Error("useLabData must be used within a LabDataProvider");
  }
  return context;
};
