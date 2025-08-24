// src/pages/labSchedulePage/LabScheduleManager.jsx
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSchedule } from "../../customHooks/useSchedule";
import { useWeekManager } from "../../customHooks/useWeekManeger";
import { useReservation } from "../../customHooks/useReservation";
import { useLaboratorioManager } from "../../features/laboratorio/useLaboratorio";
import {
  diaAbreviadoParaNumero,
  numeroParaDiaCompleto,
} from "../../customHooks/diaSemanaUtil";
import LabScheduleView from "./LabScheduleView";

export function LabScheduleManager() {
  const { labId } = useParams();
  const [currentShift, setCurrentShift] = useState("manhã");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const laboratorioManager = useLaboratorioManager(Number(labId));

  const { getDateForDay, weekDates, getDayOfMonth } =
    useWeekManager(currentWeek);
  const dadosLaboratorio = laboratorioManager.laboratorioDetalhado;

  // Determinar semanas mínima e máxima com base nos horários disponíveis
  const { minWeek, maxWeek } = useMemo(() => {
    if (!dadosLaboratorio?.horarios || dadosLaboratorio.horarios.length === 0) {
      return { minWeek: 0, maxWeek: 0 };
    }

    // Encontrar a data mais antiga e mais recente nos horários
    const dates = dadosLaboratorio.horarios
      .map((h) => new Date(h.data))
      .filter((date) => !isNaN(date.getTime()));

    if (dates.length === 0) {
      return { minWeek: 0, maxWeek: 0 };
    }

    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? 1 : 1 - dayOfWeek;
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() + diffToMonday);

    // Calcular diferença em semanas
    const minDiff = Math.floor(
      (minDate - currentMonday) / (7 * 24 * 60 * 60 * 1000)
    );
    const maxDiff = Math.floor(
      (maxDate - currentMonday) / (7 * 24 * 60 * 60 * 1000)
    );

    return {
      minWeek: Math.max(0, minDiff),
      maxWeek: Math.max(0, maxDiff),
    };
  }, [dadosLaboratorio]);

  // Processa os horários para exibição - agora passando weekDates
  const {
    diasSemana,
    horariosUnicos,
    horarios: gradeHorarios,
  } = useSchedule(dadosLaboratorio?.horarios || [], currentShift, weekDates);

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
  console.log("dadosLaboratorio", dadosLaboratorio);

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
      weekDates={weekDates}
      getDayOfMonth={getDayOfMonth}
      minWeek={minWeek}
      maxWeek={maxWeek}
    />
  );
}
