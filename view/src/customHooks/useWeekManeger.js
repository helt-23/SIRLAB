// src/customHooks/useWeekManager.js
import { useMemo } from "react";

// Função para obter a data de uma segunda-feira a partir de uma semana relativa
const getMonday = (weekOffset = 0) => {
  const today = new Date();
  const day = today.getDay(); // 0 (domingo) a 6 (sábado)
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Ajuste para segunda-feira
  const monday = new Date(today.setDate(diff + 7 * weekOffset));
  return monday;
};

export const useWeekManager = (currentWeek = 0) => {
  const diasDaSemana = [
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
    "domingo",
  ];

  const monday = useMemo(() => getMonday(currentWeek), [currentWeek]);

  const weekDates = useMemo(() => {
    const dates = [];
    const date = new Date(monday);
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(date);
      dates.push(currentDate.toISOString().split("T")[0]); // Formato YYYY-MM-DD
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }, [monday]);

  const getDateForDay = (dia) => {
    const index = diasDaSemana.indexOf(dia.toLowerCase());
    if (index === -1) return null;
    const date = new Date(monday);
    date.setDate(date.getDate() + index);
    return date.toISOString().split("T")[0];
  };

  const startDate = weekDates[0];
  const endDate = weekDates[6];

  return {
    weekDates,
    startDate,
    endDate,
    getDateForDay,
  };
};
