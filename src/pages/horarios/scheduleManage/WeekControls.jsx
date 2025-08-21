// src/pages/labSchedulePage/WeekControls.jsx
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useMemo, useState } from "react";

const WeekControls = ({
  currentWeek,
  setCurrentWeek,
  minWeek = 0,
  maxWeek = 4,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Função memorizada para calcular o intervalo da semana
  const weekRange = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (domingo) a 6 (sábado)

    // Calcula o deslocamento para a segunda-feira:
    const diffToMonday = dayOfWeek === 0 ? 1 : 1 - dayOfWeek;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday + currentWeek * 7);

    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4); // Segunda + 4 dias = sexta

    // Função de formatação
    const formatDate = (date) => {
      return date
        .toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year:
            monday.getFullYear() !== friday.getFullYear()
              ? "numeric"
              : undefined,
        })
        .replace(".", "")
        .toLowerCase();
    };

    const startFormatted = formatDate(monday);
    const endFormatted = formatDate(friday);

    // Verifica se está no mesmo mês e ano
    const sameMonthYear =
      monday.getMonth() === friday.getMonth() &&
      monday.getFullYear() === friday.getFullYear();

    return sameMonthYear
      ? `${startFormatted.split(" ")[0]} - ${endFormatted}`
      : `${startFormatted} - ${endFormatted}`;
  }, [currentWeek]);

  const handleDateSelect = (date) => {
    const selected = new Date(date);
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? 1 : 1 - dayOfWeek;
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() + diffToMonday);

    // Calcula a diferença em semanas
    const diffInTime = selected.getTime() - currentMonday.getTime();
    const diffInWeeks = Math.floor(diffInTime / (1000 * 60 * 60 * 24 * 7));

    // Limita a semana entre minWeek e maxWeek
    const newWeek = Math.max(minWeek, Math.min(maxWeek, diffInWeeks));
    setCurrentWeek(newWeek);
    setShowDatePicker(false);
  };

  return (
    <div className="week-controls">
      <button
        onClick={() => setCurrentWeek((w) => Math.max(w - 1, minWeek))}
        disabled={currentWeek === minWeek}
        aria-label="Semana anterior"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="week-range-container">
        <span className="week-range">{weekRange}</span>
        <button
          className="calendar-button"
          onClick={() => setShowDatePicker(!showDatePicker)}
          aria-label="Selecionar data no calendário"
        >
          <Calendar size={16} />
        </button>

        {showDatePicker && (
          <div className="date-picker">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                handleDateSelect(e.target.value);
              }}
              onBlur={() => setTimeout(() => setShowDatePicker(false), 200)}
              autoFocus
            />
          </div>
        )}
      </div>

      <button
        onClick={() => setCurrentWeek((w) => Math.min(w + 1, maxWeek))}
        disabled={currentWeek === maxWeek}
        aria-label="Próxima semana"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default WeekControls;
