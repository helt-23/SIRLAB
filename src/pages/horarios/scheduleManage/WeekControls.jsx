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

  const weekRange = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? 1 : 1 - dayOfWeek;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday + currentWeek * 7);

    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

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

    const diffInTime = selected.getTime() - currentMonday.getTime();
    const diffInWeeks = Math.floor(diffInTime / (1000 * 60 * 60 * 24 * 7));

    const newWeek = Math.max(minWeek, Math.min(maxWeek, diffInWeeks));
    setCurrentWeek(newWeek);
    setShowDatePicker(false);
  };

  return (
    <div className="flex items-center gap-3 font-medium text-lg flex-wrap justify-center">
      <button
        onClick={() => setCurrentWeek((w) => Math.max(w - 1, minWeek))}
        disabled={currentWeek === minWeek}
        aria-label="Semana anterior"
        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="relative flex items-center gap-2">
        <span>{weekRange}</span>
        <button
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() => setShowDatePicker(!showDatePicker)}
          aria-label="Selecionar data no calendário"
        >
          <Calendar size={16} />
        </button>

        {showDatePicker && (
          <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded p-2 shadow z-10">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                handleDateSelect(e.target.value);
              }}
              onBlur={() => setTimeout(() => setShowDatePicker(false), 200)}
              autoFocus
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
        )}
      </div>

      <button
        onClick={() => setCurrentWeek((w) => Math.min(w + 1, maxWeek))}
        disabled={currentWeek === maxWeek}
        aria-label="Próxima semana"
        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default WeekControls;
