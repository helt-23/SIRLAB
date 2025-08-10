const ShiftSelector = ({ scheduleData, currentShift, setCurrentShift }) => {
  if (!scheduleData) return null;

  return (
    <div className="shift-selector">
      <div className="shift-selector__buttons">
        {Object.keys(scheduleData.shifts).map((shift) => (
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
