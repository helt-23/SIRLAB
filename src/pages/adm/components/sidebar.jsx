import { Home, LogOut } from 'lucide-react';
import { navItems } from '../data/navItems';

const Sidebar = ({ currentPage, navigateTo, goHome, onLogout }) => (
  <aside className="w-64 bg-slate-700 text-white flex-shrink-0 p-4 border-r border-slate-600 flex flex-col justify-between">
    <nav>
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 px-2">Menu</h3>
      <ul>
        <li><button onClick={goHome} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-white font-medium hover:bg-slate-600 transition-colors focus:ring-2 focus:ring-blue-400 focus:outline-none"><Home size={20} />Painel Principal</button></li>
      </ul>
      <hr className="my-4 border-slate-600" />
      <ul>
        {navItems.map(item => (
          <li key={item.key}>
            <button onClick={() => navigateTo(item.key)} className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors focus:ring-2 focus:ring-blue-400 focus:outline-none ${currentPage === item.key ? 'bg-blue-600 text-white font-semibold' : 'text-slate-200 font-medium hover:bg-slate-600'}`}>
              {item.icon} {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    <div>
      <hr className="my-4 border-slate-600" />
      <button onClick={onLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-200 font-medium hover:bg-red-600 hover:text-white transition-colors focus:ring-2 focus:ring-red-400 focus:outline-none"><LogOut size={20} /> Sair</button>
    </div>
  </aside>
);

export default Sidebar;