import React from 'react';

const ActionCard = ({ icon, title, description, onClick }) => (
  <button onClick={onClick} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-200 w-full text-left focus:ring-2 focus:ring-blue-500 focus:outline-none">
    <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-4">{React.cloneElement(icon, { size: 28 })}</div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm">{description}</p>
  </button>
);

export default ActionCard;