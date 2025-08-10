import { useMemo } from "react";

export const useWeekManager = (currentWeek) => {
  // Calcular datas da semana
  const weekDates = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (domingo) a 6 (sábado)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday + currentWeek * 7);

    // Garante que a data é válida
    if (isNaN(monday.getTime())) {
      console.error("Data inválida calculada, usando data atual");
      return Array(5)
        .fill()
        .map((_, i) => new Date(today.getTime() + i * 86400000));
    }

    return Array.from({ length: 5 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      return date;
    });
  }, [currentWeek]);

  // Mapeamento de dias para datas
  const dayToDateMap = useMemo(() => {
    const days = ["segunda", "terça", "quarta", "quinta", "sexta"];
    return days.reduce((map, day, index) => {
      map[day] = weekDates[index];
      return map;
    }, {});
  }, [weekDates]);

  // Obter data para um dia específico
  const getDateForDay = (day) => {
    return dayToDateMap[day] || new Date();
  };

  // Formatar datas para exibição
  const formatWeekDisplay = useMemo(() => {
    if (weekDates.length === 0) return "";

    const format = (date) => {
      return date
        .toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
        })
        .replace(".", "")
        .toLowerCase();
    };

    const start = format(weekDates[0]);
    const end = format(weekDates[4]);

    return `${start} - ${end}`;
  }, [weekDates]);

  return {
    weekDates,
    dayToDateMap,
    getDateForDay,
    formatWeekDisplay,
  };
};
