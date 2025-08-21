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
    <div className="schedule-controls-container">
      <div className="schedule-controls">
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
