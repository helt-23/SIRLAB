import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ReservationSuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[4000]">
    <div className="bg-white rounded-xl p-8 max-w-[400px] w-[90%] text-center flex flex-col items-center animate-in fade-in zoom-in">
      <div className="mb-6">
        <FaCheckCircle size={48} className="text-green-500 mx-auto" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-3">Reserva realizada com sucesso!</h3>
        <p className="text-gray-700">
          Você já pode visualizar a reserva em "Minhas Reservas" no menu.
        </p>
      </div>
      <button
        className="mt-6 py-2 px-6 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors"
        onClick={onClose}
      >
        Fechar
      </button>
    </div>
  </div>
);

export default ReservationSuccessModal;