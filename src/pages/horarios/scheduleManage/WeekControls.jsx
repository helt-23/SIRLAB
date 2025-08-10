import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

const WeekControls = ({ currentWeek, setCurrentWeek }) => {
  // Função memorizada para calcular o intervalo da semana
  const weekRange = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (domingo) a 6 (sábado)

    // Calcula o deslocamento para a segunda-feira:
    // - Se hoje é domingo (0), segunda é amanhã (+1)
    // - Caso contrário, segunda é (1 - dia atual)
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

  return (
    <div className="week-controls">
      <button
        onClick={() => setCurrentWeek((w) => Math.max(w - 1, 0))}
        disabled={currentWeek === 0}
        aria-label="Semana anterior"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="week-range">{weekRange}</span>
      <button
        onClick={() => setCurrentWeek((w) => w + 1)}
        aria-label="Próxima semana"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default WeekControls;
