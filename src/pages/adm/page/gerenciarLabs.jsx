import { useState } from 'react';
import { SectionWrapper, DeleteButton } from '../components';
import {LabForm} from '../forms';

const GerenciarLabsPage = ({ laboratorios, setLaboratorios, blocos }) => {
  const [formState, setFormState] = useState({ 
    descricao: '', 
    sigla: '', 
    capacidade: '', 
    localizacao: '', 
    observacao: '', 
    blocoId: '' 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.descricao.trim() || !formState.blocoId) {
      alert("Descrição e Bloco são obrigatórios.");
      return;
    }
    
    const novoLab = { 
      id: Date.now(),
      descricao: formState.descricao.trim(),
      sigla: formState.sigla.trim(),
      capacidade: parseInt(formState.capacidade, 10) || 0,
      localizacao: formState.localizacao.trim(),
      observacao: formState.observacao.trim(),
      blocoId: parseInt(formState.blocoId, 10)
    };
    
    setLaboratorios([...laboratorios, novoLab]);
    setFormState({ 
      descricao: '', 
      sigla: '', 
      capacidade: '', 
      localizacao: '', 
      observacao: '', 
      blocoId: '' 
    });
  };

  const handleDelete = (id) => {
    setLaboratorios(laboratorios.filter(lab => lab.id !== id));
  };

  return (
    <div className="space-y-6">
      <SectionWrapper number="1" title="Adicionar Novo Laboratório">
        <form onSubmit={handleSubmit} className="space-y-5">
          <LabForm 
            formState={formState} 
            handleInputChange={handleInputChange} 
            blocos={blocos} 
          />
          <div className="flex justify-end">
            <button 
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
            >
              Adicionar Laboratório
            </button>
          </div>
        </form>
      </SectionWrapper>
      
      <SectionWrapper number="2" title="Laboratórios Cadastrados">
        {laboratorios.length === 0 ? (
          <p className="text-slate-500 text-center py-6">Nenhum laboratório cadastrado</p>
        ) : (
          <ul className="space-y-3">
            {laboratorios.map(lab => {
              const bloco = blocos.find(b => b.id === lab.blocoId);
              return (
                <li 
                  key={lab.id} 
                  className="flex justify-between items-center p-4 bg-white rounded-md border border-slate-200 shadow-sm"
                >
                  <div>
                    <p className="font-medium">{lab.descricao}</p>
                    <p className="text-slate-500 text-sm mt-1">
                      {bloco ? bloco.descricao : 'Bloco não encontrado'} • {lab.sigla || 'Sem sigla'} • Capacidade: {lab.capacidade || 'N/A'}
                    </p>
                  </div>
                  <DeleteButton 
                    onClick={() => handleDelete(lab.id)} 
                    label={`Remover laboratório ${lab.descricao}`} 
                  />
                </li>
              );
            })}
          </ul>
        )}
      </SectionWrapper>
    </div>
  );
};

export default GerenciarLabsPage;