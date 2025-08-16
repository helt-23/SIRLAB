import { useState } from 'react';
import { SectionWrapper, DeleteButton } from '../components';
import {BlockForm} from '../forms';

const GerenciarBlocosPage = ({ blocos, criarBloco, inativarBloco }) => {
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!descricao.trim()) return;
    const novoBloco = { descricao: descricao.trim() };
    criarBloco(novoBloco)
    setDescricao('');
  };

  const handleDelete = (id) => {
    inativarBloco(id)
  };

  return (
    <div className="space-y-6">
      <SectionWrapper number="1" title="Adicionar Novo Bloco">
        <BlockForm 
          descricao={descricao}
          setDescricao={setDescricao}
          handleSubmit={handleSubmit}
        />
      </SectionWrapper>

      <SectionWrapper number="2" title="Blocos Cadastrados">
        {blocos.length === 0 ? (
          <p className="text-slate-500 text-center py-6">Nenhum bloco cadastrado</p>
        ) : (
          <ul className="space-y-3">
            {blocos.map(bloco => (
              <li 
                key={bloco.id} 
                className="flex justify-between items-center p-4 bg-white rounded-md border border-slate-200 shadow-sm"
              >
                <span className="font-medium">{bloco.descricao}</span>
                <DeleteButton 
                  onClick={() => handleDelete(bloco.id)} 
                  label={`Remover bloco ${bloco.descricao}`} 
                />
              </li>
            ))}
          </ul>
        )}
      </SectionWrapper>
    </div>
  );
};

export default GerenciarBlocosPage;