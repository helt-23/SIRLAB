// src/customHooks/useSchedule.js
import { useMemo } from "react";

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

// Normaliza nomes de dias
const normalizeDia = (dia) =>
  dia
    .toLowerCase()
    .replace("ç", "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// Converte para formato abreviado
const abbreviateDia = (dia) => {
  const diasMap = {
    segunda: "Seg",
    terca: "Ter",
    quarta: "Qua",
    quinta: "Qui",
    sexta: "Sex",
    sabado: "Sab",
    domingo: "Dom",
  };
  return diasMap[dia] || dia;
};

export const useSchedule = (
  horarios,
  currentShift,
  backendMode = false,
  allBookings = []
) => {
  // 1. Processar entrada baseada no modo
  const processedHorarios = useMemo(() => {
    if (!horarios) return [];

    if (backendMode) {
      // Converter estrutura backend para formato mock
      return horarios.flatMap((horario) => ({
        data: horario.data,
        diaSemana: horario.diaSemana,
        horarioInicio: horario.horarioInicio,
        horarioFim: horario.horarioFim,
        id: horario.id,
        isDisponivel: horario.isDisponivel,
        reserva: horario.reserva,
      }));
    }

    return horarios;
  }, [horarios, backendMode]);

  // 2. Filtrar horários pelo turno
  const filteredHorarios = useMemo(() => {
    return processedHorarios.filter(
      (item) => getShift(item.horarioInicio) === currentShift
    );
  }, [processedHorarios, currentShift]);

  // 3. Processar dias da semana
  const diasSemana = useMemo(() => {
    const normalizedDias = filteredHorarios.map((item) =>
      normalizeDia(item.diaSemana)
    );

    const dayOrder = [
      "segunda",
      "terca",
      "quarta",
      "quinta",
      "sexta",
      "sabado",
      "domingo",
    ];

    return [...new Set(normalizedDias)]
      .sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b))
      .map(abbreviateDia);
  }, [filteredHorarios]);

  // 4. Criar slots de horário únicos
  const uniqueTimeSlots = useMemo(() => {
    const slots = filteredHorarios.map((item) =>
      createTimeSlot(item.horarioInicio, item.horarioFim)
    );

    return [...new Set(slots)].sort((a, b) =>
      a.split(" - ")[0].localeCompare(b.split(" - ")[0])
    );
  }, [filteredHorarios]);

  // 5. Montar grade de horários
  const scheduleGrid = useMemo(() => {
    return uniqueTimeSlots.flatMap((slot) =>
      diasSemana
        .map((dia) => {
          const fullDayName = {
            Seg: "segunda",
            Ter: "terca",
            Qua: "quarta",
            Qui: "quinta",
            Sex: "sexta",
            Sab: "sabado",
            Dom: "domingo",
          }[dia];

          const scheduleItem = filteredHorarios.find(
            (item) =>
              normalizeDia(item.diaSemana) === fullDayName &&
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

          // Verificar se é reserva do usuário (backend)
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
            diaSemana: dia,
            tipo: scheduleType,
            dados: scheduleItem.reserva,
            horario: slot,
            isUserBooking,
            horarioId: scheduleItem.id,
          };
        })
        .filter(Boolean)
    );
  }, [filteredHorarios, diasSemana, uniqueTimeSlots, backendMode, allBookings]);

  return {
    diasSemana,
    horariosUnicos: uniqueTimeSlots,
    horarios: scheduleGrid,
  };
};
