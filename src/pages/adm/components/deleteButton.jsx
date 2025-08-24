import { Trash2 } from 'lucide-react';

const DeleteButton = ({ onClick, label }) => (
  <button 
    onClick={onClick} 
    className="text-red-500 hover:text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 group relative"
    aria-label={label}
    title={label}
  >
    <Trash2 size={18} className="transform group-hover:scale-110 transition-transform" />
    <span className="sr-only">{label}</span>
  </button>
);

export default DeleteButton;