// src/pages/labSchedulePage/LabScheduleManager.jsx
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLabData } from "../../context/LabDataContext";
import { useSchedule } from "../../customHooks/useSchedule";
import { useWeekManager } from "../../customHooks/useWeekManeger.js";
import { useReservation } from "../../customHooks/useReservation";
import { useLaboratorioManager } from "../../features/laboratorio/useLaboratorio"
import LabScheduleView from "./labScheduleView";
import "./app.css";

export function LabScheduleManager() {
  const { labId } = useParams();
  const [currentShift, setCurrentShift] = useState("manhã");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  
  const useLaboratorio = useLaboratorioManager()
  const dadosLaboratorio = useLaboratorio.laboratorioDetalhado

  const {
    getLabDetails,
    getHorariosForLab, // Nova função
    addUserBooking,
  } = useLabData();

  const labDetails = useMemo(
    () => {
      getLabDetails(labId)
      useLaboratorio.setLabId(labId)

    },
    [labId, getLabDetails]
  );

  // Gerenciamento de semana
  const { startDate, endDate, getDateForDay } = useWeekManager(currentWeek);

  // Busca os horários do laboratório para a semana atual
  const horarios = useMemo(() => {
    return getHorariosForLab(labId, startDate, endDate);
  }, [labId, startDate, endDate, getHorariosForLab]);
  // Processa os horários para exibição
  const {
    diasSemana,
    horariosUnicos,
    horarios: gradeHorarios,
  } = useSchedule(dadosLaboratorio?.horarios, currentShift);

  const reservation = useReservation(labId, addUserBooking);

  const handleCellClick = (dia) => {
    const diaNormalizado =
      {
        Seg: "segunda",
        Ter: "terça",
        Qua: "quarta",
        Qui: "quinta",
        Sex: "sexta",
        Sab: "sábado",
        Dom: "domingo",
      }[dia] || dia;

    const dateForDay = getDateForDay(diaNormalizado);
    const daySlots = gradeHorarios.filter(
      (h) => h.diaSemana === dia && h.tipo === "livre"
    );

    reservation.openReservationModal(dia, dateForDay, daySlots, labDetails);
  };

  return (
    <LabScheduleView
      labDetails={dadosLaboratorio?.laboratorio}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
      currentShift={currentShift}
      setCurrentShift={setCurrentShift}
      currentWeek={currentWeek}
      setCurrentWeek={setCurrentWeek}
      diasSemana={diasSemana}
      horariosUnicos={horariosUnicos}
      horarios={gradeHorarios}
      onCellClick={handleCellClick}
      reservation={reservation}
    />
  );
}
