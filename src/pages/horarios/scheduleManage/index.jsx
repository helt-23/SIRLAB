// src/pages/labSchedulePage/ScheduleControls.jsx
import ShiftSelector from "./ShiftSelector";
import WeekControls from "./WeekControls";

const ScheduleControls = ({
  scheduleData,
  currentShift,
  setCurrentShift,
  currentWeek,
  setCurrentWeek,
  minWeek,
  maxWeek,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <ShiftSelector
          scheduleData={scheduleData}
          currentShift={currentShift}
          setCurrentShift={setCurrentShift}
        />
        <WeekControls
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
          minWeek={minWeek}
          maxWeek={maxWeek}
        />
      </div>
    </div>
  );
};

export default ScheduleControls;
