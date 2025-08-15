import { useState } from 'react';
import { Header, Footer, Sidebar, PageComponent } from './components';
import { Dashboard, GerenciarBlocosPage, GerenciarLabsPage, VisualizarHorariosPage, ConfigurarPadroesPage, AtribuirHorariosPage} from "./page"

export function AdmPage () {
  const [currentPage, setCurrentPage] = useState('main');
  const userName = "Administrador";

  const [blocos, setBlocos] = useState([
    { id: 1, descricao: 'Bloco A - Principal' }, 
    { id: 2, descricao: 'Bloco B - Anexo' }
  ]);
  
  const [laboratorios, setLaboratorios] = useState([
    { id: 101, descricao: 'Lab de Química 101', sigla: 'LQI101', capacidade: 20, localizacao: 'Sala 1', observacao: '', blocoId: 1 },
    { id: 102, descricao: 'Lab de Biologia 102', sigla: 'LBI102', capacidade: 25, localizacao: 'Sala 2', observacao: '', blocoId: 1 },
    { id: 201, descricao: 'Lab de Física 201', sigla: 'LFI201', capacidade: 15, localizacao: 'Sala 1', observacao: '', blocoId: 2 }
  ]);
  
  const [tiposPadrao, setTiposPadrao] = useState([
    { id: 1, descricao: 'Aulas de 50 min' }, 
    { id: 2, descricao: 'Aulas de 1h 40min' }
  ]);
  
  const [padroesHorario, setPadroesHorario] = useState([
    { id: 1, diaSemana: 0, horarioInicio: '08:00', horarioFim: '08:50', tipoPadraoHorarioId: 1 }
  ]);
  
  const [horarios, setHorarios] = useState([
    { id: 1, dataInicio: '2025-08-01', dataFim: '2025-12-15', laboratorioId: 101, tipoPadraoHorarioId: 1 }
  ]);

  const navigateTo = (page) => setCurrentPage(page);
  const goHome = () => setCurrentPage('main');
  const handleLogout = () => { 
    console.log("Usuário desconectado."); 
    goHome(); 
  };

  const renderPageView = () => {
    const pages = {
      'Visualizar Horários': <VisualizarHorariosPage blocos={blocos} laboratorios={laboratorios} />,
      'Gerenciar Blocos': <GerenciarBlocosPage blocos={blocos} setBlocos={setBlocos} />,
      'Gerenciar Laboratórios': <GerenciarLabsPage laboratorios={laboratorios} setLaboratorios={setLaboratorios} blocos={blocos} />,
      'Configurar Padrões': (
        <ConfigurarPadroesPage 
          tiposPadrao={tiposPadrao} 
          setTiposPadrao={setTiposPadrao} 
          padroesHorario={padroesHorario} 
          setPadroesHorario={setPadroesHorario} 
        />
      ),
      'Atribuir Horários': (
        <AtribuirHorariosPage 
          laboratorios={laboratorios} 
          blocos={blocos} 
          tiposPadrao={tiposPadrao} 
          horarios={horarios} 
          setHorarios={setHorarios} 
        />
      )
    };

    return (
      <div className="flex-grow w-full max-w-screen-2xl mx-auto flex">
        <Sidebar 
          currentPage={currentPage} 
          navigateTo={navigateTo} 
          goHome={goHome} 
          onLogout={handleLogout} 
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">
          <PageComponent title={currentPage}>
            {pages[currentPage] || <p>Página não encontrada</p>}
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
      {currentPage === 'main' 
        ? <Dashboard navigateTo={navigateTo} /> 
        : renderPageView()}
      <Footer />
    </div>
  );
};