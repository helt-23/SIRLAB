// src/customHooks/useSchedule.js
import { useMemo } from "react";
import {
  diaStringParaNumero,
  numeroParaDiaAbreviado,
  getDiasNumerosOrdenados,
} from "./diaSemanaUtil";

// Funções auxiliares
const getShift = (startTime) => {
  const hour = parseInt(startTime.split(":")[0]);
  if (hour >= 6 && hour < 12) return "manhã";
  if (hour >= 12 && hour < 18) return "tarde";
  return "noite";
};

const formatTime = (time) => time.slice(0, 5);

const createTimeSlot = (start, end) =>
  `${formatTime(start)} - ${formatTime(end)}`;

export const useSchedule = (
  horarios,
  currentShift,
  weekDates, // Recebendo as datas da semana
  backendMode = false,
  allBookings = []
) => {
  // 1. Filtrar horários pela semana atual
  const horariosDaSemana = useMemo(() => {
    if (!horarios || !weekDates) return [];

    return horarios.filter((horario) => {
      const horarioDate = new Date(horario.data).toISOString().split("T")[0];
      return weekDates.includes(horarioDate);
    });
  }, [horarios, weekDates]);

  // 2. Processar entrada - converter dias para números
  const processedHorarios = useMemo(() => {
    if (!horariosDaSemana) return [];

    return horariosDaSemana.map((horario) => ({
      ...horario,
      diaNumero: diaStringParaNumero(horario.diaSemana),
    }));
  }, [horariosDaSemana]);

  // 3. Filtrar horários pelo turno
  const filteredHorarios = useMemo(() => {
    return processedHorarios.filter(
      (item) => getShift(item.horarioInicio) === currentShift
    );
  }, [processedHorarios, currentShift]);

  // 4. Processar dias da semana - usar números
  const diasNumeros = useMemo(() => {
    const numerosPresentes = filteredHorarios.map((item) => item.diaNumero);
    return getDiasNumerosOrdenados().filter((num) =>
      numerosPresentes.includes(num)
    );
  }, [filteredHorarios]);

  // 5. Converter números para abreviações para exibição
  const diasSemana = useMemo(
    () => diasNumeros.map(numeroParaDiaAbreviado),
    [diasNumeros]
  );

  // 6. Criar slots de horário únicos
  const uniqueTimeSlots = useMemo(() => {
    const slots = filteredHorarios.map((item) =>
      createTimeSlot(item.horarioInicio, item.horarioFim)
    );

    return [...new Set(slots)].sort((a, b) =>
      a.split(" - ")[0].localeCompare(b.split(" - ")[0])
    );
  }, [filteredHorarios]);

  // 7. Montar grade de horários
  const scheduleGrid = useMemo(() => {
    return uniqueTimeSlots.flatMap((slot) =>
      diasNumeros
        .map((diaNumero) => {
          const scheduleItem = filteredHorarios.find(
            (item) =>
              item.diaNumero === diaNumero &&
              createTimeSlot(item.horarioInicio, item.horarioFim) === slot
          );

          if (!scheduleItem) return null;

          let scheduleType;
          if (!scheduleItem.isDisponivel) {
            scheduleType =
              scheduleItem.reserva?.tipoReserva === "AULA"
                ? "aula"
                : "reservado";
          } else {
            scheduleType = "livre";
          }

          // Verificar se é reserva do usuário
          let isUserBooking = false;
          if (backendMode && scheduleItem.reserva) {
            isUserBooking = allBookings.some(
              (b) =>
                b.id === scheduleItem.reserva.id &&
                b.usuario?.matricula === "2023001"
            );
          } else {
            isUserBooking = scheduleItem.reserva?.usuarioNome === "Gabriel";
          }

          return {
            horaInicio: formatTime(scheduleItem.horarioInicio),
            horaFim: formatTime(scheduleItem.horarioFim),
            diaSemana: numeroParaDiaAbreviado(diaNumero), // Para exibição
            diaNumero: diaNumero, // Para cálculos internos
            tipo: scheduleType,
            dados: scheduleItem.reserva,
            horario: slot,
            isUserBooking,
            horarioId: scheduleItem.id,
          };
        })
        .filter(Boolean)
    );
  }, [
    filteredHorarios,
    diasNumeros,
    uniqueTimeSlots,
    backendMode,
    allBookings,
  ]);

  return {
    diasSemana,
    horariosUnicos: uniqueTimeSlots,
    horarios: scheduleGrid,
  };
};
