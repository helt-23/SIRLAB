import { Home, LogOut } from 'lucide-react';
import { navItems } from '../data/navItems';

const Sidebar = ({ currentPage, navigateTo, goHome, onLogout }) => (
  <aside className="w-64 bg-white flex-shrink-0 p-4 border-r border-slate-200 flex flex-col justify-between">
    <nav>
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Menu</h3>
      <ul>
        <li><button onClick={goHome} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"><Home size={20} />Painel Principal</button></li>
      </ul>
      <hr className="my-4" />
      <ul>
        {navItems.map(item => (
          <li key={item.key}>
            <button onClick={() => navigateTo(item.key)} className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none ${currentPage === item.key ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-slate-600 font-medium hover:bg-slate-100'}`}>
              {item.icon} {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    <div>
      <hr className="my-4" />
      <button onClick={onLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-red-100 hover:text-red-700 transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none"><LogOut size={20} /> Sair</button>
    </div>
  </aside>
);

export default Sidebar;