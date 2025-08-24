import React from 'react';

const ActionCard = ({ icon, title, description, onClick }) => (
  <button 
    onClick={onClick} 
    className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-300 w-full text-left focus:ring-2 focus:ring-slate-800 focus:outline-none group relative overflow-hidden"
    aria-label={`Acessar ${title}`}
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-slate-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
    <div className="bg-slate-700 text-white p-3 rounded-full mb-4 group-hover:bg-slate-800 transition-colors">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900">{title}</h3>
    <p className="text-slate-500 text-sm group-hover:text-slate-600">{description}</p>
  </button>
);

export default ActionCard;