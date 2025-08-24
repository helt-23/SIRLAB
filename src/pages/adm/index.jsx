import { useState } from "react";
import { Header, Footer, Sidebar, PageComponent } from "./components";
import "./adm.css";
import {
  Dashboard,
  GerenciarBlocosPage,
  GerenciarLabsPage,
  VisualizarHorariosPage,
  ConfigurarPadroesPage,
  AtribuirHorariosPage,
  AtribuirAulasPage,
  GerenciarCursosDisciplinasPage,
} from "./page";
import {
  useBlocoManager,
  useLaboratorioManager,
  useReservaManager,
  usePadraoHorarioManager,
  useTipoPadraoHorarioManager,
  useHorarioManager,
} from "../../features";
export function AdmPage() {
  const [currentPage, setCurrentPage] = useState("main");
  const userName = "Administrador";

  const useReserva = useReservaManager();

  const {
    blocos,
    isBlocosLoading,
    cadastrarBloco,
    atualizarBloco,
    inativarBloco,
  } = useBlocoManager();
  const {
    laboratorios,
    isLabsLoading,
    setBlocoId,
    cadastrarLaboratorio,
    inativarLaboratorio,
  } = useLaboratorioManager();
  const {
    tipoPadraoHorario,
    isLoading,
    cadastrarTipoPadraoHorario,
    deletarTipoPadraoHorario,
  } = useTipoPadraoHorarioManager();
  const {
    padroesHorario,
    isLoadingPadrao,
    cadastrarPadraoHorario,
    deletarPadraoHorario,
  } = usePadraoHorarioManager();
  const { cadastrarHorarios, deletarHorarios, loading } = useHorarioManager();

  const [cursos, setCursos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [aulas, setAulas] = useState([]);
  //setBlocoId()

  const [horarios, setHorarios] = useState([
    {
      id: 1,
      dataInicio: "2025-08-01",
      dataFim: "2025-12-15",
      laboratorioId: 101,
      tipoPadraoHorarioId: 1,
    },
  ]);

  const navigateTo = (page) => setCurrentPage(page);
  const goHome = () => setCurrentPage("main");
  const handleLogout = () => {
    console.log("Usuário desconectado.");
    goHome();
  };

  const renderPageView = () => {
    const pages = {
      "Visualizar Horários": (
        <VisualizarHorariosPage blocos={blocos} laboratorios={laboratorios} />
      ),
      "Gerenciar Blocos": (
        <GerenciarBlocosPage
          blocos={blocos}
          criarBloco={cadastrarBloco}
          inativarBloco={inativarBloco}
        />
      ),
      "Gerenciar Laboratórios": (
        <GerenciarLabsPage
          laboratorios={laboratorios}
          blocos={blocos}
          criarLaboratorio={cadastrarLaboratorio}
          inativarLaboratorio={inativarLaboratorio}
        />
      ),
      "Gerenciar Cursos e Disciplinas": (
        <GerenciarCursosDisciplinasPage
          cursos={cursos}
          setCursos={setCursos}
          disciplinas={disciplinas}
          setDisciplinas={setDisciplinas}
        />
      ),
      "Configurar Padrões": (
        <ConfigurarPadroesPage
          tiposPadrao={tipoPadraoHorario}
          criarTipoPadraoHorario={cadastrarTipoPadraoHorario}
          deletarTipoPadraoHorario={deletarTipoPadraoHorario}
          padroesHorario={padroesHorario}
          criarPadraoHorario={cadastrarPadraoHorario}
          deletarPadraoHorario={deletarPadraoHorario}
        />
      ),
      "Atribuir Aulas": (
        <AtribuirAulasPage
          laboratorios={laboratorios}
          blocos={blocos}
          padroesHorario={padroesHorario}
          aulas={aulas}
          setAulas={setAulas}
          disciplinas={disciplinas}
        />
      ),
      "Atribuir Horários": (
        <AtribuirHorariosPage
          laboratorios={laboratorios}
          blocos={blocos}
          tiposPadrao={tipoPadraoHorario}
          horarios={horarios}
          cadastrarHorarios={cadastrarHorarios}
        />
      ),
    };

    return (
      <div className="flex-grow w-full flex">
        <Sidebar
          currentPage={currentPage}
          navigateTo={navigateTo}
          goHome={goHome}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-100 min-h-screen">
          <PageComponent title={currentPage}>
            {pages[currentPage] || <p className="text-center py-8 text-slate-500 font-medium">Página não encontrada</p>}
          </PageComponent>
        </main>
      </div>
    );
  };
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-slate-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in-down { from { opacity: 0; transform: translateY(-10px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-fade-in-down { animation: fade-in-down 0.2s ease-out forwards; }
        :focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
      `}</style>

      <Header userName={userName} onLogout={handleLogout} />
      {currentPage === "main" ? (
        <Dashboard navigateTo={navigateTo} />
      ) : (
        renderPageView()
      )}
      <Footer />
    </div>
  );
}
