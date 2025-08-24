import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

const GerenciarCursosDisciplinasPage = ({
  cursos,
  setCursos,
  disciplinas,
  setDisciplinas,
}) => {
  const [cursoForm, setCursoForm] = useState({
    codigo: "",
    nome: "",
    duracaoSemestres: "",
    tipo: "Graduação",
  });
  const [disciplinaForm, setDisciplinaForm] = useState({
    codigo: "",
    nome: "",
    cargaHoraria: "",
    cor: "#60a5fa",
  });

  const handleCursoSubmit = (e) => {
    e.preventDefault();
    const dataParaBackend = {
      ...cursoForm,
      duracaoSemestres: parseInt(cursoForm.duracaoSemestres),
    };
    console.log("Enviando (Curso):", dataParaBackend);
    setCursos([...cursos, { ...dataParaBackend, id: Date.now() }]);
    setCursoForm({
      codigo: "",
      nome: "",
      duracaoSemestres: "",
      tipo: "Graduação",
    });
  };

  const handleDisciplinaSubmit = (e) => {
    e.preventDefault();
    const dataParaBackend = {
      ...disciplinaForm,
      cargaHoraria: parseInt(disciplinaForm.cargaHoraria),
    };
    console.log("Enviando (Disciplina):", dataParaBackend);
    setDisciplinas([...disciplinas, { ...dataParaBackend, id: Date.now() }]);
    setDisciplinaForm({
      codigo: "",
      nome: "",
      cargaHoraria: "",
      cor: "#60a5fa",
    });
  };

  return (
    <div className="space-y-8">
      <section className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-5">
          Gerenciar Cursos
        </h3>
        <form onSubmit={handleCursoSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Código do Curso
              </label>
              <input
                type="text"
                value={cursoForm.codigo}
                onChange={(e) =>
                  setCursoForm({ ...cursoForm, codigo: e.target.value })
                }
                placeholder="Ex: BCC"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Nome do Curso
              </label>
              <input
                type="text"
                value={cursoForm.nome}
                onChange={(e) =>
                  setCursoForm({ ...cursoForm, nome: e.target.value })
                }
                placeholder="Ex: Ciência da Computação"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Duração (Semestres)
              </label>
              <input
                type="number"
                value={cursoForm.duracaoSemestres}
                onChange={(e) =>
                  setCursoForm({
                    ...cursoForm,
                    duracaoSemestres: e.target.value,
                  })
                }
                placeholder="Ex: 8"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Tipo
              </label>
              <select
                value={cursoForm.tipo}
                onChange={(e) =>
                  setCursoForm({ ...cursoForm, tipo: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option>Graduação</option>
                <option>Pós-Graduação</option>
                <option>Técnico</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <PlusCircle size={18} /> Adicionar Curso
            </button>
          </div>
        </form>
        <hr className="my-6" />
        <h4 className="font-semibold text-slate-700 mb-3">
          Cursos Cadastrados:
        </h4>
        <ul className="space-y-2">
          {cursos.map((c) => (
            <li
              key={c.id}
              className="flex justify-between items-center p-3 bg-white rounded-md border text-sm"
            >
              <span>
                {c.nome} ({c.codigo})
              </span>
              <button
                onClick={() => setCursos(cursos.filter((i) => i.id !== c.id))}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-5">
          Gerenciar Disciplinas
        </h3>
        <form onSubmit={handleDisciplinaSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Código
              </label>
              <input
                type="text"
                value={disciplinaForm.codigo}
                onChange={(e) =>
                  setDisciplinaForm({
                    ...disciplinaForm,
                    codigo: e.target.value,
                  })
                }
                placeholder="Ex: COMP01"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Nome da Disciplina
              </label>
              <input
                type="text"
                value={disciplinaForm.nome}
                onChange={(e) =>
                  setDisciplinaForm({ ...disciplinaForm, nome: e.target.value })
                }
                placeholder="Ex: Interação Humano-Computador"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Carga Horária
              </label>
              <input
                type="number"
                value={disciplinaForm.cargaHoraria}
                onChange={(e) =>
                  setDisciplinaForm({
                    ...disciplinaForm,
                    cargaHoraria: e.target.value,
                  })
                }
                placeholder="Ex: 64"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Cor de Identificação
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={disciplinaForm.cor}
                  onChange={(e) =>
                    setDisciplinaForm({
                      ...disciplinaForm,
                      cor: e.target.value,
                    })
                  }
                  className="h-10 w-10 p-1 border rounded-md"
                />
                <span className="text-sm text-slate-500">
                  Selecione uma cor para a disciplina
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <PlusCircle size={18} /> Adicionar Disciplina
            </button>
          </div>
        </form>
        <hr className="my-6" />
        <h4 className="font-semibold text-slate-700 mb-3">
          Disciplinas Cadastradas:
        </h4>
        <ul className="space-y-2">
          {disciplinas.map((d) => (
            <li
              key={d.id}
              className="flex justify-between items-center p-3 bg-white rounded-md border text-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: d.cor }}
                ></div>
                <span>
                  {d.nome} ({d.codigo})
                </span>
              </div>
              <button
                onClick={() =>
                  setDisciplinas(disciplinas.filter((i) => i.id !== d.id))
                }
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default GerenciarCursosDisciplinasPage;
