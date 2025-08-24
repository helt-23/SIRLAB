import React, { useState, useMemo } from "react";
import { PlusCircle, Calendar } from "lucide-react";

// Componente da Tabela de Horários
const LaboratorioScheduleTable = ({
  horariosLaboratorio,
  aulas,
  disciplinas,
  onAtribuirAula,
}) => {
  const diasSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  // Extrair todos os horários únicos
  const horariosUnicos = useMemo(() => {
    const horariosSet = new Set();
    horariosLaboratorio.forEach((horario) => {
      const timeSlot = `${horario.horarioInicio} - ${horario.horarioFim}`;
      horariosSet.add(timeSlot);
    });
    return Array.from(horariosSet).sort();
  }, [horariosLaboratorio]);

  // Verificar se um horário está ocupado
  const isHorarioOcupado = (diaIndex, horario) => {
    return aulas.some((aula) => {
      const padraoHorario = horariosLaboratorio.find(
        (p) => p.id === aula.padraoHorarioId
      );
      if (!padraoHorario) return false;

      const timeSlot = `${padraoHorario.horarioInicio} - ${padraoHorario.horarioFim}`;
      return padraoHorario.diaSemana === diaIndex && timeSlot === horario;
    });
  };

  // Obter disciplina atribuída a um horário
  const getDisciplinaNoHorario = (diaIndex, horario) => {
    const aula = aulas.find((a) => {
      const padraoHorario = horariosLaboratorio.find(
        (p) => p.id === a.padraoHorarioId
      );
      if (!padraoHorario) return false;

      const timeSlot = `${padraoHorario.horarioInicio} - ${padraoHorario.horarioFim}`;
      return padraoHorario.diaSemana === diaIndex && timeSlot === horario;
    });

    if (!aula) return null;
    return disciplinas.find((d) => d.id === aula.disciplinaId);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm border border-slate-200">
      <table className="w-full border-collapse table-fixed bg-white">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-4 font-semibold uppercase tracking-wider min-w-[120px]">
              Horário
            </th>
            {diasSemana.map((dia) => (
              <th
                key={dia}
                className="p-4 font-semibold uppercase tracking-wider min-w-[150px]"
              >
                {dia}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horariosUnicos.map((horario) => (
            <tr key={horario} className="even:bg-slate-50">
              <td className="p-3 border border-slate-200 text-center font-medium">
                {horario}
              </td>
              {diasSemana.map((_, diaIndex) => {
                const ocupado = isHorarioOcupado(diaIndex, horario);
                const disciplina = getDisciplinaNoHorario(diaIndex, horario);

                return (
                  <td
                    key={diaIndex}
                    className="p-2 border border-slate-200 text-center h-16"
                  >
                    {ocupado ? (
                      <div
                        className="h-full rounded flex items-center justify-center p-2 text-white font-medium text-sm"
                        style={{
                          backgroundColor: disciplina?.cor || "#f59e0b",
                        }}
                      >
                        {disciplina?.nome || "Aula"}
                      </div>
                    ) : (
                      <button
                        onClick={() => onAtribuirAula(diaIndex, horario)}
                        className="w-full h-full rounded bg-green-100 text-green-800 border border-green-300 hover:bg-green-200 transition-colors flex items-center justify-center text-sm font-medium"
                      >
                        Disponível
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Página de Atribuição de Aulas
const AtribuirAulasPage = ({
  laboratorios,
  blocos,
  padroesHorario,
  aulas,
  setAulas,
  disciplinas,
}) => {
  const [blocoFiltro, setBlocoFiltro] = useState("");
  const [labFiltro, setLabFiltro] = useState("");
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
  const [mostrarModalAtribuicao, setMostrarModalAtribuicao] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

  // Filtrar horários do laboratório selecionado
  const horariosLaboratorio = useMemo(() => {
    if (!labFiltro) return [];
    return padroesHorario.filter(
      (p) => p.laboratorioId === parseInt(labFiltro)
    );
  }, [labFiltro, padroesHorario]);

  // Manipuladores de seleção
  const handleSelectBlock = (blockId) => {
    setBlocoFiltro(blockId);
    setLabFiltro("");
  };

  const handleSelectLab = (labId) => {
    setLabFiltro(labId);
  };

  // Manipulador para atribuir aula
  const handleAtribuirAula = (diaIndex, horario) => {
    if (!disciplinaSelecionada) {
      alert("Por favor, selecione uma disciplina primeiro.");
      return;
    }

    setHorarioSelecionado({ diaIndex, horario });
    setMostrarModalAtribuicao(true);
  };

  // Confirmar atribuição de aula
  const confirmarAtribuicao = () => {
    if (!horarioSelecionado || !disciplinaSelecionada) return;

    // Encontrar o padrão de horário correspondente
    const [inicio, fim] = horarioSelecionado.horario.split(" - ");
    const padraoHorario = horariosLaboratorio.find(
      (p) =>
        p.diaSemana === horarioSelecionado.diaIndex &&
        p.horarioInicio === inicio &&
        p.horarioFim === fim
    );

    if (!padraoHorario) return;

    // Criar nova aula
    const novaAula = {
      id: Date.now(),
      padraoHorarioId: padraoHorario.id,
      disciplinaId: disciplinaSelecionada.id,
      laboratorioId: parseInt(labFiltro),
      professor: "Professor a definir",
    };

    setAulas([...aulas, novaAula]);
    setMostrarModalAtribuicao(false);
    setHorarioSelecionado(null);
  };

  return (
    <div className="space-y-8">
      <section className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-5">
          Atribuição de Aulas
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Selecione o Bloco
            </label>
            <select
              value={blocoFiltro}
              onChange={(e) => handleSelectBlock(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Todos os Blocos</option>
              {blocos.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.descricao}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Selecione o Laboratório
            </label>
            <select
              value={labFiltro}
              onChange={(e) => handleSelectLab(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              disabled={!blocoFiltro}
            >
              <option value="">Selecione um laboratório...</option>
              {laboratorios
                .filter((l) => l.blocoId === parseInt(blocoFiltro))
                .map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.descricao}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Selecione a Disciplina
          </label>
          <div className="flex flex-wrap gap-2 p-2 bg-white rounded-md border min-h-[60px]">
            {disciplinas.length === 0 ? (
              <div className="flex items-center justify-center w-full text-slate-400">
                <span>Nenhuma disciplina cadastrada.</span>
              </div>
            ) : (
              disciplinas.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDisciplinaSelecionada(d)}
                  className={`flex items-center gap-2 p-2 border-2 rounded-md text-sm transition-all ${
                    disciplinaSelecionada?.id === d.id
                      ? "border-blue-600 bg-blue-100 shadow-md"
                      : "border-transparent bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: d.cor }}
                  ></div>
                  {d.nome}
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      {labFiltro ? (
        <section className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-5">
            Horários do Laboratório:{" "}
            {laboratorios.find((l) => l.id === parseInt(labFiltro))?.descricao}
          </h3>

          <LaboratorioScheduleTable
            horariosLaboratorio={horariosLaboratorio}
            aulas={aulas}
            disciplinas={disciplinas}
            onAtribuirAula={handleAtribuirAula}
          />

          <div className="mt-4 p-3 bg-slate-100 rounded-lg border border-slate-200">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-sm mr-2 bg-green-100 border border-green-300"></div>
                <span className="text-sm">Disponível</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-sm mr-2 bg-yellow-100 border border-yellow-300"></div>
                <span className="text-sm">Ocupado</span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="mt-8 p-10 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 min-h-[300px] flex flex-col items-center justify-center">
          <Calendar size={48} className="text-slate-400 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            Selecione um Laboratório
          </h3>
          <p className="text-slate-500 text-center max-w-md">
            Selecione um bloco e um laboratório para visualizar e gerenciar os
            horários disponíveis.
          </p>
        </div>
      )}

      {/* Modal de Confirmação de Atribuição */}
      {mostrarModalAtribuicao && horarioSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Confirmar Atribuição
            </h3>
            <p className="text-slate-600 mb-2">
              <strong>Disciplina:</strong> {disciplinaSelecionada.nome}
            </p>
            <p className="text-slate-600 mb-4">
              <strong>Horário:</strong>{" "}
              {
                ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][
                  horarioSelecionado.diaIndex
                ]
              }{" "}
              - {horarioSelecionado.horario}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarModalAtribuicao(false)}
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarAtribuicao}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtribuirAulasPage;
