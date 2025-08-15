import { Trash2 } from 'lucide-react';

const DeleteButton = ({ onClick, label }) => (
  <button 
    onClick={onClick} 
    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
    aria-label={label}
  >
    <Trash2 size={18} />
  </button>
);

export default DeleteButton;