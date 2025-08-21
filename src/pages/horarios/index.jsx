// src/pages/labSchedulePage/LabScheduleManager.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSchedule } from "../../customHooks/useSchedule";
import { useWeekManager } from "../../customHooks/useWeekManeger";
import { useReservation } from "../../customHooks/useReservation";
import { useLaboratorioManager } from "../../features/laboratorio/useLaboratorio";
import {
  diaAbreviadoParaNumero,
  numeroParaDiaCompleto,
} from "../../customHooks/diaSemanaUtil";
import LabScheduleView from "./labScheduleView";

export function LabScheduleManager() {
  const { labId } = useParams();
  const [currentShift, setCurrentShift] = useState("manhã");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const laboratorioManager = useLaboratorioManager(Number(labId));

  const { getDateForDay } = useWeekManager(currentWeek);
  const dadosLaboratorio = laboratorioManager.laboratorioDetalhado;

  // Processa os horários para exibição
  const {
    diasSemana,
    horariosUnicos,
    horarios: gradeHorarios,
  } = useSchedule(dadosLaboratorio?.horarios || [], currentShift);

  const reservation = useReservation(labId);

  const handleCellClick = (diaAbreviado) => {
    // Converter a abreviação para número e depois para o nome completo
    const diaNumero = diaAbreviadoParaNumero(diaAbreviado);
    const diaCompleto = numeroParaDiaCompleto(diaNumero);

    const dateForDay = getDateForDay(diaCompleto);
    const daySlots = (gradeHorarios || []).filter(
      (h) => h.diaSemana === diaAbreviado && h.tipo === "livre"
    );

    reservation.openReservationModal(
      diaAbreviado,
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
