// components/Breadcrumb.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import useBreadcrumb from "../customHooks/usebreadcrumb";
import "../assets/styles/breadcrumb.css";

export function Breadcrumb() {
  const breadcrumbs = useBreadcrumb();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    // Navega para a rota base e reseta o estado
    navigate("/laboratorios", { state: { resetSelection: true } });
  };

  return (
    <div className="breadcrumb-container">
      <nav className="breadcrumb-nav" aria-label="Navegação estrutural">
        <ol>
          <li>
            <Link to="/laboratorios" onClick={handleHomeClick}>
              <span className="breadcrumb-icon">
                <Home size={16} />
              </span>
              <span>Home</span>
            </Link>
          </li>

          {breadcrumbs.slice(0, -1).map((crumb, index) => (
            <React.Fragment key={index}>
              <li className="breadcrumb-separator">
                <ChevronRight size={16} />
              </li>
              <li>
                <Link to={crumb.path}>{crumb.label}</Link>
              </li>
            </React.Fragment>
          ))}

          <li className="breadcrumb-separator">
            <ChevronRight size={16} />
          </li>
          <li>
            <span aria-current="page">
              {breadcrumbs[breadcrumbs.length - 1].label}
            </span>
          </li>
        </ol>
      </nav>
    </div>
  );
}
