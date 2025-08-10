import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../assets/styles/labNot.css'


{/*ESSA TELA NÃO IMPORTA, JÁ QUE SE NÃO TIVER LABORATÓRIO, ELE NÃO IRÁ APARECER NA INTERFACE */}
function LabNotFound() {
  return (
    <div className="lab-not-found-container">
      <div className="lab-not-found-card">
        <div className="lab-not-found-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>

        <h1 className="lab-not-found-title">Laboratório não encontrado</h1>

        <p className="lab-not-found-message">
          O laboratório que você está tentando acessar não existe ou foi removido.
        </p>

        <Link to="/laboratorios" className="lab-not-found-button">
          <ArrowLeft size={16} />
          <span>Voltar para Laboratórios</span>
        </Link>
      </div>
    </div>
  );
}
export default LabNotFound;