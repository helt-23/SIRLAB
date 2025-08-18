import React from 'react';
import { File } from 'lucide-react';

const ReservationForm = ({ 
  children,
  onSubmit,
  onClose,
  reservationType,
  setReservationType,
  description,
  setDescription,
  file,
  handleFileChange,
  formErrors,
  reservationTypes
}) => (
  <form onSubmit={onSubmit}>
    {children}
    
    <div className="mb-4">
      <h3 className="font-medium text-gray-800 mb-2">Tipo de Reserva</h3>
      <select
        value={reservationType}
        onChange={(e) => setReservationType(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
      >
        <option value="">Selecione um tipo</option>
        {reservationTypes.map((type, index) => (
          <option key={`type-${type.value}-${index}`} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      {formErrors.reservationType && (
        <p className="text-red-600 text-sm mt-1">{formErrors.reservationType}</p>
      )}
    </div>

    <div className="mb-4">
      <h3 className="font-medium text-gray-800 mb-2">Descrição</h3>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descreva o objetivo da reserva..."
        className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 min-h-[80px]"
        rows={4}
      />
      {formErrors.description && (
        <p className="text-red-600 text-sm mt-1">{formErrors.description}</p>
      )}
    </div>

    <div className="mb-6">
      <h3 className="font-medium text-gray-800 mb-2">Documento (PDF)</h3>
      <label className="block cursor-pointer">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-dashed border-gray-300 rounded hover:bg-gray-100 hover:border-gray-400 transition-all">
          <File size={16} />
          <span className="text-sm">{file ? file.name : "Selecionar arquivo"}</span>
        </div>
      </label>
      {formErrors.file && <p className="text-red-600 text-sm mt-1">{formErrors.file}</p>}
    </div>

    <div className="flex justify-between gap-3 mt-5 pt-4 border-t border-gray-200">
      <button
        type="button"
        className="flex-1 py-2.5 px-4 bg-blue-900 text-white font-medium rounded hover:bg-blue-800 transition-colors"
        onClick={onClose}
      >
        Voltar
      </button>
      <button 
        type="submit" 
        className="flex-1 py-2.5 px-4 bg-green-500 text-white font-medium rounded hover:bg-green-400 transition-colors"
      >
        Confirmar Solicitação
      </button>
    </div>
  </form>
);

export default ReservationForm;