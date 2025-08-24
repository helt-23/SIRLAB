import { ActionCard } from '../components';
import { navItems } from '../data/navItems';

const Dashboard = ({ navigateTo }) => (
  <main className="flex-grow w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      <div className="mb-12 text-center">
        <div className="inline-block bg-slate-800 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">Área Administrativa</div>
        <h1 className="text-4xl font-extrabold text-slate-800">Painel Administrativo</h1>
        <p className="text-lg text-slate-600 mt-3 max-w-2xl mx-auto">Selecione uma das opções abaixo para gerenciar os recursos do sistema.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {navItems.map(item => <ActionCard key={item.key} {...item} onClick={() => navigateTo(item.key)} />)}
      </div>
    </div>
  </main>
);

export default Dashboard;