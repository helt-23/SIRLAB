const LabForm = ({ formState, handleInputChange, blocos }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="blocoId" className="block text-sm font-medium text-slate-600 mb-1">
          Bloco *
        </label>
        <select 
          id="blocoId" 
          name="blocoId" 
          value={formState.blocoId} 
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Selecione um bloco</option>
          {blocos.map(bloco => (
            <option key={bloco.id} value={bloco.id}>
              {bloco.descricao}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-slate-600 mb-1">
          Descrição *
        </label>
        <input 
          type="text" 
          id="descricao" 
          name="descricao" 
          placeholder="Ex: Lab de Química 101" 
          value={formState.descricao} 
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      
      <div>
        <label htmlFor="sigla" className="block text-sm font-medium text-slate-600 mb-1">
          Sigla
        </label>
        <input 
          type="text" 
          id="sigla" 
          name="sigla" 
          placeholder="Ex: LQI101" 
          value={formState.sigla} 
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label htmlFor="capacidade" className="block text-sm font-medium text-slate-600 mb-1">
          Capacidade
        </label>
        <input 
          type="number" 
          id="capacidade" 
          name="capacidade" 
          placeholder="Ex: 25" 
          min="1"
          value={formState.capacidade} 
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="md:col-span-2">
        <label htmlFor="localizacao" className="block text-sm font-medium text-slate-600 mb-1">
          Localização
        </label>
        <input 
          type="text" 
          id="localizacao" 
          name="localizacao" 
          placeholder="Ex: Térreo, sala 12" 
          value={formState.localizacao} 
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
    
    <div>
      <label htmlFor="observacao" className="block text-sm font-medium text-slate-600 mb-1">
        Observação
      </label>
      <textarea 
        id="observacao" 
        name="observacao" 
        placeholder="Ex: Necessário uso de jaleco." 
        value={formState.observacao} 
        onChange={handleInputChange}
        rows="3"
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      ></textarea>
    </div>
  </div>
);

export default LabForm;