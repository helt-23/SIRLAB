import { PlusCircle } from 'lucide-react';

const BlockForm = ({ descricao, setDescricao, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
    <div>
      <label htmlFor="block-desc" className="block text-sm font-medium text-slate-600 mb-1">
        Descrição do Bloco
      </label>
      <input 
        type="text" 
        id="block-desc" 
        placeholder="Ex: Bloco Principal" 
        value={descricao} 
        onChange={(e) => setDescricao(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        autoFocus
      />
    </div>
    <button 
      type="submit"
      className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 self-end transition-colors"
    >
      <PlusCircle size={18} /> Adicionar
    </button>
  </form>
);

export default BlockForm;