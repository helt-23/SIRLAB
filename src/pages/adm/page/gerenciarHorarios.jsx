import { useState, useMemo } from 'react';
import { PlusCircle } from 'lucide-react';
import { SectionWrapper, DeleteButton } from '../components';

const AtribuirHorariosPage = ({ laboratorios, blocos, tiposPadrao, horarios, setHorarios }) => {
  const [blocoFiltro, setBlocoFiltro] = useState('');
  const [buscaLab, setBuscaLab] = useState('');
  const [horarioForm, setHorarioForm] = useState({ 
    dataInicio: '', 
    dataFim: '', 
    laboratorioId: '', 
    tipoPadraoHorarioId: '' 
  });

  const laboratoriosFiltrados = useMemo(() => {
    return laboratorios
      .filter(lab => !blocoFiltro || lab.blocoId === parseInt(blocoFiltro))
      .filter(lab => lab.descricao.toLowerCase().includes(buscaLab.toLowerCase()));
  }, [laboratorios, blocoFiltro, buscaLab]);

  const handleAddHorario = (e) => {
    e.preventDefault();
    if(!horarioForm.laboratorioId || !horarioForm.tipoPadraoHorarioId || !horarioForm.dataInicio || !horarioForm.dataFim) { 
      alert("Preencha todos os campos para atribuir o horário."); 
      return; 
    }
    
    const novoHorario = { 
      id: Date.now(), 
      ...horarioForm, 
      laboratorioId: parseInt(horarioForm.laboratorioId, 10), 
      tipoPadraoHorarioId: parseInt(horarioForm.tipoPadraoHorarioId, 10) 
    };
    
    setHorarios([...horarios, novoHorario]);
    setHorarioForm({ 
      dataInicio: '', 
      dataFim: '', 
      laboratorioId: '', 
      tipoPadraoHorarioId: '' 
    });
  };

  return (
    <div className="space-y-8">
      <SectionWrapper number="1" title="Filtre o Laboratório">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Filtrar por Bloco</label>
            <select 
              value={blocoFiltro} 
              onChange={(e) => setBlocoFiltro(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos os Blocos</option>
              {blocos.map(b => <option key={b.id} value={b.id}>{b.descricao}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Buscar por Nome</label>
            <input 
              type="text" 
              placeholder="Digite o nome do laboratório..." 
              value={buscaLab} 
              onChange={(e) => setBuscaLab(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper number="2" title="Atribua um Padrão de Horário">
        <form onSubmit={handleAddHorario} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Laboratório</label>
              <select 
                name="laboratorioId" 
                value={horarioForm.laboratorioId} 
                onChange={(e) => setHorarioForm({...horarioForm, laboratorioId: e.target.value})} 
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione um laboratório...</option>
                {laboratoriosFiltrados.map(l => <option key={l.id} value={l.id}>{l.descricao}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Tipo de Horário (Padrão)</label>
              <select 
                name="tipoPadraoHorarioId" 
                value={horarioForm.tipoPadraoHorarioId} 
                onChange={(e) => setHorarioForm({...horarioForm, tipoPadraoHorarioId: e.target.value})} 
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione um tipo...</option>
                {tiposPadrao.map(t => <option key={t.id} value={t.id}>{t.descricao}</option>)}
              </select>
            </div>
            
            <div className="flex items-end gap-2 md:col-span-2">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-slate-600 mb-1">Válido de</label>
                <input 
                  type="date" 
                  name="dataInicio" 
                  value={horarioForm.dataInicio} 
                  onChange={(e) => setHorarioForm({...horarioForm, dataInicio: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex-grow">
                <label className="block text-sm font-medium text-slate-600 mb-1">Até</label>
                <input 
                  type="date" 
                  name="dataFim" 
                  value={horarioForm.dataFim} 
                  onChange={(e) => setHorarioForm({...horarioForm, dataFim: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-2">
            <button 
              type="submit" 
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
            >
              <PlusCircle size={18} /> Atribuir Horário
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <h4 className="font-semibold text-slate-700 mb-3">Atribuições existentes:</h4>
          {horarios.length === 0 ? (
            <p className="text-slate-500 text-sm py-2">Nenhuma atribuição cadastrada</p>
          ) : (
            <ul className="space-y-2">
              {horarios.map(h => {
                const lab = laboratorios.find(l => l.id === h.laboratorioId);
                const tipo = tiposPadrao.find(t => t.id === h.tipoPadraoHorarioId);
                
                return (
                  <li 
                    key={h.id} 
                    className="flex justify-between items-center p-3 bg-white rounded-md border text-sm"
                  >
                    <span>
                      <strong>{lab?.descricao || 'Laboratório desconhecido'}</strong> com <strong>"{tipo?.descricao || 'Tipo desconhecido'}"</strong> de {h.dataInicio} a {h.dataFim}
                    </span>
                    <DeleteButton 
                      onClick={() => setHorarios(horarios.filter(i => i.id !== h.id))} 
                      label="Remover atribuição de horário"
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default AtribuirHorariosPage;