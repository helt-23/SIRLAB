import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { SectionWrapper, DeleteButton } from '../components';

const ConfigurarPadroesPage = ({ tiposPadrao, criarTipoPadraoHorario, deletarTipoPadraoHorario, padroesHorario, criarPadraoHorario, deletarPadraoHorario }) => {
  const diasSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
  const [tipoDescricao, setTipoDescricao] = useState('');
  const [padraoForm, setPadraoForm] = useState({ 
    diaSemana: '0', 
    horarioInicio: '', 
    horarioFim: '', 
    tipoPadraoHorarioId: '' 
  });

  const handleAddTipo = (e) => {
    e.preventDefault();
    if (!tipoDescricao.trim()) return;
    const novoTipo = { descricao: tipoDescricao.trim() };
    criarTipoPadraoHorario(novoTipo)
    setTipoDescricao('');
  };

  const handleAddPadrao = (e) => {
    e.preventDefault();
    if(!padraoForm.tipoPadraoHorarioId || !padraoForm.horarioInicio || !padraoForm.horarioFim) { 
      alert("Preencha todos os campos do padrão."); 
      return; 
    }
    
    const novoPadrao = { 
      ...padraoForm, 
      diaSemana: parseInt(padraoForm.diaSemana, 10), 
      tipoPadraoHorarioId: parseInt(padraoForm.tipoPadraoHorarioId, 10) 
    };
    
    criarPadraoHorario(novoPadrao)
    setPadraoForm({ 
      diaSemana: '0', 
      horarioInicio: '', 
      horarioFim: '', 
      tipoPadraoHorarioId: '' 
    });
  };

  return (
    <div className="space-y-8">
      <SectionWrapper number="1" title="Crie Tipos de Padrão de Horário">
        <form onSubmit={handleAddTipo} className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="tipo-desc" className="sr-only">Descrição do Tipo</label>
              <input 
                type="text" 
                id="tipo-desc" 
                placeholder="Descrição do novo tipo de horário" 
                value={tipoDescricao} 
                onChange={(e) => setTipoDescricao(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button 
              type="submit" 
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 shrink-0 transition-colors"
            >
              <PlusCircle size={18} /> Adicionar Tipo
            </button>
          </div>
        </form>
        
        <div>
          <h4 className="font-semibold text-slate-700 mb-3">Tipos existentes:</h4>
          {tiposPadrao.length === 0 ? (
            <p className="text-slate-500 text-sm py-2">Nenhum tipo cadastrado</p>
          ) : (
            <ul className="space-y-2">
              {tiposPadrao.map(t => (
                <li 
                  key={t.id} 
                  className="flex justify-between items-center p-3 bg-white rounded-md border text-sm"
                >
                  <span>{t.descricao}</span>
                  <DeleteButton 
                    onClick={() => deletarTipoPadraoHorario(t.id)} 
                    label={`Remover tipo ${t.descricao}`}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </SectionWrapper>

      <SectionWrapper number="2" title="Defina os Padrões de Horário">
        <form onSubmit={handleAddPadrao} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Selecione o Tipo</label>
              <select 
                name="tipoPadraoHorarioId" 
                value={padraoForm.tipoPadraoHorarioId} 
                onChange={(e) => setPadraoForm({...padraoForm, tipoPadraoHorarioId: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione...</option>
                {tiposPadrao.map(t => (
                  <option key={t.id} value={t.id}>{t.descricao}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Dia da Semana</label>
              <select 
                name="diaSemana" 
                value={padraoForm.diaSemana} 
                onChange={(e) => setPadraoForm({...padraoForm, diaSemana: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {diasSemana.map((dia, index) => (
                  <option key={index} value={index}>{dia}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end gap-2">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-slate-600 mb-1">Início</label>
                <input 
                  type="time" 
                  name="horarioInicio" 
                  value={padraoForm.horarioInicio} 
                  onChange={(e) => setPadraoForm({...padraoForm, horarioInicio: e.target.value})} 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex-grow">
                <label className="block text-sm font-medium text-slate-600 mb-1">Fim</label>
                <input 
                  type="time" 
                  name="horarioFim" 
                  value={padraoForm.horarioFim} 
                  onChange={(e) => setPadraoForm({...padraoForm, horarioFim: e.target.value})} 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
            >
              <PlusCircle size={18} /> Adicionar Padrão
            </button>
          </div>
        </form>
        
        <div>
          <h4 className="font-semibold text-slate-700 mb-3">Padrões existentes:</h4>
          {padroesHorario.length === 0 ? (
            <p className="text-slate-500 text-sm py-2">Nenhum padrão cadastrado</p>
          ) : (
            <ul className="space-y-2">
              {padroesHorario.map(p => {
                const tipo = tiposPadrao.find(t => t.id === p.tipoPadraoHorarioId);
                return (
                  <li 
                    key={p.id} 
                    className="flex justify-between items-center p-3 bg-white rounded-md border text-sm"
                  >
                    <span>
                      <strong>{p?.tipoPadrao || 'Tipo desconhecido'}:</strong> {p.diaSemana}, {p.horarioInicio} - {p.horarioFim}
                    </span>
                    <DeleteButton 
                      onClick={() => deletarPadraoHorario(p.id)} 
                      label="Remover padrão de horário"
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

export default ConfigurarPadroesPage;