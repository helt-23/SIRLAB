import { useState, useEffect } from 'react';
import { SectionWrapper } from '../components';

const VisualizarHorariosPage = ({ blocos, laboratorios }) => {
  const [blocoSelecionado, setBlocoSelecionado] = useState('');
  const [labsFiltrados, setLabsFiltrados] = useState([]);
  const [labSelecionado, setLabSelecionado] = useState('');

  useEffect(() => {
    if (blocoSelecionado) {
      const blocoId = parseInt(blocoSelecionado, 10);
      setLabsFiltrados(laboratorios.filter(lab => lab.blocoId === blocoId));
    } else {
      setLabsFiltrados([]);
    }
    setLabSelecionado('');
  }, [blocoSelecionado, laboratorios]);

  return (
    <div className="space-y-6">
      <SectionWrapper number="1" title="Filtros de Visualização">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="select-bloco" className="block text-sm font-medium text-slate-600 mb-1">
              Selecione um Bloco
            </label>
            <select 
              id="select-bloco" 
              value={blocoSelecionado} 
              onChange={(e) => setBlocoSelecionado(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos os Blocos</option>
              {blocos.map(bloco => (
                <option key={bloco.id} value={bloco.id}>{bloco.descricao}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="select-lab" className="block text-sm font-medium text-slate-600 mb-1">
              Selecione um Laboratório
            </label>
            <select 
              id="select-lab"
              value={labSelecionado}
              onChange={(e) => setLabSelecionado(e.target.value)}
              disabled={!blocoSelecionado}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
            >
              <option value="">Todos os Laboratórios</option>
              {labsFiltrados.map(lab => (
                <option key={lab.id} value={lab.id}>{lab.descricao}</option>
              ))}
            </select>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper number="2" title="Visualização de Horários">
        <div className="mt-4 p-8 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50 min-h-[400px] flex items-center justify-center">
          <div className="text-center text-blue-600">
            <div className="mx-auto mb-4 bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="font-semibold text-lg">Visualização de Horários</p>
            <p className="text-sm mt-2 max-w-md">
              {blocoSelecionado || labSelecionado
                ? `Mostrando horários para ${labSelecionado ? laboratorios.find(l => l.id === parseInt(labSelecionado))?.descricao : `Bloco ${blocos.find(b => b.id === parseInt(blocoSelecionado))?.descricao}`}`
                : 'Selecione um bloco ou laboratório para visualizar os horários'}
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default VisualizarHorariosPage;