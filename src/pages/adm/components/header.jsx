import { useState, useEffect, useRef } from "react";
import { Building2, UserCircle, ChevronDown, LogOut } from "lucide-react";

const Header = ({ userName, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <header className="w-full bg-slate-800 text-white shadow-md z-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-400" />
            <span className="font-bold text-xl ml-3 hidden md:block">
              SIRLAB Manager
            </span>
          </div>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 p-1 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
            >
              <UserCircle className="h-9 w-9 text-slate-300" />
              <div className="text-left hidden sm:block">
                <span className="font-semibold text-sm">{userName}</span>
                <span className="text-xs text-slate-400 block">
                  Perfil Admin
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-200 ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {menuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-30 ring-1 ring-black ring-opacity-5 animate-fade-in-down">
                <button
                  onClick={() => {
                    onLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Sair da Conta</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
