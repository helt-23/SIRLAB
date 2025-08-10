import React, { useState, useCallback } from 'react';
import MenuAside from './menuAside';
import { useBreadcrumb } from '../customHooks/usebreadcrumb';
import '../assets/styles/headerModule.css';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const breadcrumbs = useBreadcrumb();
  const isHomePage = location.pathname === '/';

  const pagetitle = breadcrumbs.length > 0
    ? breadcrumbs[breadcrumbs.length - 1].label
    : 'Sistema Integrado de Reservas de Laboratórios (SIRLAB)';

  const user = {
    name: "usuario",
    role: "Sobrevivente",
    photo: null
  };

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <header className="app-header">
        {!isHomePage && <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>}

        <h1 className="header-title">{pagetitle}</h1>
        <div className="header-spacer"></div>

        <MenuAside
          user={user}
          isOpen={menuOpen}
          onClose={toggleMenu}
        />
      </header>
    </>
  );
}