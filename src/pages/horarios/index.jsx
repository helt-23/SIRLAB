// src/pages/labSchedulePage/LabScheduleManager.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSchedule } from "../../customHooks/useSchedule";
import { useWeekManager } from "../../customHooks/useWeekManeger";
import { useReservation } from "../../customHooks/useReservation";
import { useLaboratorioManager } from "../../features/laboratorio/useLaboratorio";
import LabScheduleView from "./labScheduleView";

export function LabScheduleManager() {
  const { labId } = useParams();
  const [currentShift, setCurrentShift] = useState("manhã");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  
  const laboratorioManager = useLaboratorioManager(Number(labId));

  const { getDateForDay } = useWeekManager(currentWeek);
  const dadosLaboratorio = laboratorioManager.laboratorioDetalhado;
  
  //console.log(dadosLaboratorio)
  // Processa os horários para exibição
  const {
    diasSemana,
    horariosUnicos,
    horarios: gradeHorarios,
  } = useSchedule(dadosLaboratorio?.horarios || [], currentShift);

  const reservation = useReservation(labId);

  const handleCellClick = (dia) => {
    const diaNormalizado = {
      Seg: "segunda",
      Ter: "terça",
      Qua: "quarta",
      Qui: "quinta",
      Sex: "sexta",
      Sab: "sábado",
      Dom: "domingo",
    }[dia] || dia;

    const dateForDay = getDateForDay(diaNormalizado);
    const daySlots = (gradeHorarios || []).filter(
      (h) => h.diaSemana === dia && h.tipo === "livre"
    );

    reservation.openReservationModal(
      dia, 
      dateForDay, 
      daySlots,
      dadosLaboratorio?.laboratorio
    );
  };


  return (
    <LabScheduleView
      labDetails={dadosLaboratorio}
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