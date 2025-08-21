// src/pages/labSchedulePage/ShiftSelector.jsx
import { useMemo } from "react";

const ShiftSelector = ({ scheduleData, currentShift, setCurrentShift }) => {
  // Extrair os turnos disponíveis dos horários
  const availableShifts = useMemo(() => {
    if (!scheduleData || !scheduleData.horarios) return [];

    const shifts = new Set();
    scheduleData.horarios.forEach((horario) => {
      const hour = parseInt(horario.horarioInicio.split(":")[0]);
      if (hour >= 6 && hour < 12) shifts.add("manhã");
      else if (hour >= 12 && hour < 18) shifts.add("tarde");
      else shifts.add("noite");
    });

    return Array.from(shifts);
  }, [scheduleData]);

  if (availableShifts.length === 0) return null;

  return (
    <div className="shift-selector">
      <div className="shift-selector__buttons">
        {availableShifts.map((shift) => (
          <button
            key={shift}
            onClick={() => setCurrentShift(shift)}
            className={`shift-selector__button ${
              currentShift === shift ? "shift-selector__button--active" : ""
            }`}
          >
            {shift.charAt(0).toUpperCase() + shift.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShiftSelector;
