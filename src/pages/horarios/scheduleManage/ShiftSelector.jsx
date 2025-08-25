// src/pages/labSchedulePage/ShiftSelector.jsx
import { useMemo } from "react";

// ShiftSelector Component
const ShiftSelector = ({ scheduleData, currentShift, setCurrentShift }) => {
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
    <div className="flex flex-wrap gap-4">
      <div className="flex gap-2 flex-wrap">
        {availableShifts.map((shift) => (
          <button
            key={shift}
            onClick={() => setCurrentShift(shift)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              currentShift === shift
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-200 text-gray-800"
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
