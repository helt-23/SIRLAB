import React from 'react';

const TimeSlotSelector = ({ slots, selectedIds, onChange, errors }) => {
  return (
  <div className="mb-4">
    <h3 className="font-medium text-gray-800 mb-2">Horários Disponíveis</h3>
    {slots.length === 0 ? (
      <p>Não há horários disponíveis para este dia.</p>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[180px] overflow-y-auto pr-1 py-1">
        {slots.map((slot) => (
          <div key={`slot-${slot.horarioId}`} className="bg-gray-50 rounded p-1.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all">
            <label className="flex items-center cursor-pointer gap-1.5">
              <input
                type="checkbox"
                checked={selectedIds.includes(slot.horarioId)}
                onChange={() => onChange(slot.horarioId)}
                className="w-4 h-4 accent-blue-800"
              />
              <span className="text-sm">{`${slot.horaInicio} - ${slot.horaFim}`}</span>
            </label>
          </div>
        ))}
      </div>
    )}
    {errors.slots && <p className="text-red-600 text-sm mt-1">{errors.slots}</p>}
  </div>
)};

export default TimeSlotSelector;