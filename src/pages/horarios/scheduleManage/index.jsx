// src/pages/labSchedulePage/ScheduleControls.jsx
import ShiftSelector from "./ShiftSelector";
import WeekControls from "./WeekControls";

const ScheduleControls = ({
  scheduleData,
  currentShift,
  setCurrentShift,
  currentWeek,
  setCurrentWeek,
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
        />
      </div>
    </div>
  );
};

export default ScheduleControls;
