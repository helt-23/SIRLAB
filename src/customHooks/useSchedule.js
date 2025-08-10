// src/customHooks/useSchedule.js
import { useMemo } from "react";

// Extrai um par { start, end } de uma string “HH:mm - HH:mm”
export const extractTimeRange = (time) => {
  if (!time) return { start: "", end: "" };
  const [start, end] = time.split(" - ");
  return { start, end };
};

/**
 * useSchedule:
 * @param {Object} scheduleData - { diasSemana: [...], shifts: {manhã: [...], tarde:[...], noite:[...]}, aulas: [...] }
 * @param {string} currentShift - turno atual (ex: "manhã", "tarde", "noite")
 * @param {Array} labBookings - lista de reservas (filtrada para aquele laboratório)
 *
 * Retorna: { diasSemana, horariosUnicos, horarios }, onde:
 *  - diasSemana: ex: ["Seg","Ter","Qua","Qui","Sex","Sab"]
 *  - horariosUnicos: array de strings de horários daquele turno (ex: ["13:00 - 13:50", "14:00 - 14:50", ...])
 *  - horarios: array de objetos, um para cada combinação (turno × dia), com campos:
 *      {
 *        horaInicio: "14:00",
 *        horaFim: "14:50",
 *        diaSemana: "Seg",
 *        tipo: "aula" | "reservado" | "livre",
 *        dados: objeto de aula ou reserva (ou null),
 *        horario: "14:00 - 14:50",
 *        isUserBooking: boolean (true se for reserva do próprio usuário)
 *      }
 */
export const useSchedule = (scheduleData, currentShift, labBookings) => {
  // Dias da semana para este laboratório
  const diasSemana = useMemo(
    () => scheduleData?.diasSemana || [],
    [scheduleData]
  );

  // Horários de cada "slot" para o turno selecionado
  const horariosUnicos = useMemo(
    () => scheduleData?.shifts?.[currentShift] || [],
    [scheduleData, currentShift]
  );

  // Filtra apenas reservas confirmadas
  const reservasConfirmadas = useMemo(() => {
    return (
      labBookings?.filter(
        (booking) =>
          booking.status && booking.status.toLowerCase() === "confirmado"
      ) || []
    );
  }, [labBookings]);

  // Monta a lista completa de células
  const horarios = useMemo(() => {
    if (!scheduleData || !horariosUnicos.length) return [];

    return horariosUnicos.flatMap((timeSlot) => {
      // timeSlot é uma string tipo "14:00 - 14:50"
      const { start: slotStart, end: slotEnd } = extractTimeRange(timeSlot);

      return diasSemana.map((dia) => {
        // 1) Verifica se existe 'aula' cadastrada para este dia/hora
        const aula = scheduleData.aulas?.find(
          (a) => a.dia === dia && a.horario === timeSlot
        );
        if (aula) {
          return {
            horaInicio: slotStart,
            horaFim: slotEnd,
            diaSemana: dia,
            tipo: "aula",
            dados: aula,
            horario: timeSlot,
          };
        }

        // 2) Verifica se existe alguma reserva (overlap) CONFIRMADA para este dia/hora
        const reserva = reservasConfirmadas?.find((r) => {
          if (r.dia !== dia) return false;
          // Extrai início e fim da reserva
          const { start: resStart, end: resEnd } = extractTimeRange(r.horario);
          // Verifica se slot está totalmente dentro do intervalo [resStart, resEnd]
          return slotStart >= resStart && slotEnd <= resEnd;
        });

        if (reserva) {
          const isUserBooking = reserva.usuario?.matricula === "2023001";
          return {
            horaInicio: slotStart,
            horaFim: slotEnd,
            diaSemana: dia,
            tipo: "reservado",
            dados: reserva,
            horario: timeSlot,
            isUserBooking,
          };
        }

        // 3) Se não for aula nem reserva → "livre"
        return {
          horaInicio: slotStart,
          horaFim: slotEnd,
          diaSemana: dia,
          tipo: "livre",
          dados: null,
          horario: timeSlot,
        };
      });
    });
  }, [scheduleData, diasSemana, horariosUnicos, reservasConfirmadas]);

  return { diasSemana, horariosUnicos, horarios };
};
