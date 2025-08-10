import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, User, Calendar, LogOut, Info } from "lucide-react";
import { useLabData } from "../context/LabDataContext";
import "../assets/styles/menuaside.css";

const MenuAside = ({ user, isOpen, onClose }) => {
  const location = useLocation();
  const { openBookingsModal, openProfileModal } = useLabData();

  useEffect(() => {
    if (isOpen) onClose();
  }, [location]);

  const handleBookingsClick = () => {
    openBookingsModal();
    onClose();
  };

  const handleProfileClick = () => {
    openProfileModal();
    onClose();
  };

  return (
    <>
      {/* Overlay de fundo */}
      {isOpen && (
        <div className="menu-overlay" onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`menu-aside ${isOpen ? "open" : ""}`}>
        <div className="menu-header">
          <button
            className="close-menu"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="user-profile">
          <div className="avatar">
            {user.photo ? (
              <img src={user.photo} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">
                <User size={40} />
              </div>
            )}
          </div>
          <h3 className="user-name">{user.name}</h3>
          <p className="user-role">{user.role}</p>
        </div>

        {/* Itens do Menu */}
        <nav className="menu-items">
          <button className="menu-item" onClick={handleProfileClick}>
            <User size={20} />
            <span>Editar Perfil</span>
          </button>

          <button className="menu-item" onClick={handleBookingsClick}>
            <Calendar size={20} />
            <span>Minhas Reservas</span>
          </button>

          <Link to="/" className="menu-item">
            <LogOut size={20} />
            <span>Sair</span>
          </Link>
        </nav>

        {/* Rodapé do Menu */}
        <div className="menu-footer">
          <Link to="/sobre" className="info-link">
            <Info size={16} />
            <span>Sobre o sistema</span>
          </Link>
          <p className="system-version">v2.0.0</p>
        </div>
      </aside>
    </>
  );
};

export default MenuAside;
