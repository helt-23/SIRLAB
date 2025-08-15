import { ActionCard } from '../components';
import { navItems } from '../data/navItems';

const Dashboard = ({ navigateTo }) => (
  <main className="flex-grow w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800">Painel Administrativo(demostração, tela final incompleta)</h1>
        <p className="text-lg text-slate-500 mt-2">Selecione uma das opções abaixo para começar.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {navItems.map(item => <ActionCard key={item.key} {...item} onClick={() => navigateTo(item.key)} />)}
      </div>
    </div>
  </main>
);

export default Dashboard;