// src/pages/labSchedulePage/LabScheduleManager.jsx
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLabData } from "../../context/LabDataContext";
import { useSchedule } from "../../customHooks/useSchedule";
import { useWeekManager } from "../../customHooks/useWeekManeger";
import { useReservation } from "../../customHooks/useReservation";
import LabScheduleView from "./labScheduleView";

export function LabScheduleManager() {
  const { labId } = useParams();
  const [currentShift, setCurrentShift] = useState("manhã");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const {
    getLabDetails,
    getLabSchedule,
    addUserBooking,
    getAllBookingsForLab,
  } = useLabData();

  const labDetails = useMemo(
    () => getLabDetails(labId),
    [labId, getLabDetails]
  );
  const scheduleData = useMemo(
    () => getLabSchedule(labId),
    [labId, getLabSchedule]
  );
  const allLabBookings = useMemo(
    () => getAllBookingsForLab(labId) || [],
    [labId, getAllBookingsForLab]
  );

  const { weekDates, getDateForDay } = useWeekManager(currentWeek);

  const { horarios, horariosUnicos, diasSemana } = useSchedule(
    scheduleData,
    currentShift,
    allLabBookings,
    weekDates
  );

  const reservation = useReservation(labId, addUserBooking);

  const handleCellClick = (dia) => {
    const daySlots = horarios.filter(
      (h) => h.diaSemana === dia && h.tipo === "livre"
    );

    const diaNormalizado =
      {
        seg: "segunda",
        segunda: "segunda",
        ter: "terça",
        terça: "terça",
        terca: "terça",
        qua: "quarta",
        quarta: "quarta",
        qui: "quinta",
        quinta: "quinta",
        sex: "sexta",
        sexta: "sexta",
      }[dia.toLowerCase()] || dia;

    const dateForDay = getDateForDay(diaNormalizado);
    reservation.openReservationModal(
      diaNormalizado,
      dateForDay,
      daySlots,
      labDetails
    );
  };

  return (
    <LabScheduleView
      labDetails={labDetails}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
      currentShift={currentShift}
      setCurrentShift={setCurrentShift}
      currentWeek={currentWeek}
      setCurrentWeek={setCurrentWeek}
      scheduleData={scheduleData}
      diasSemana={diasSemana}
      horariosUnicos={horariosUnicos}
      horarios={horarios}
      onCellClick={handleCellClick}
      reservation={reservation}
    />
  );
}
