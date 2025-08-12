import { Users, CalendarClock } from "lucide-react";
import "../styles/labcard.css"; // Importando o arquivo CSS

export function LaboratoryCard({ lab, handleVerHorarios }) {
  return (
    <div className="lab-card">
      <div className="lab-card-image-container">
        {lab.image ? (
          <img
            src={lab.image}
            alt={lab.localizacap || lab.descricao}
            className="lab-card-image"
          />
        ) : (
          <div className="lab-card-image-placeholder">
            <span className="lab-card-image-placeholder-text">Sem imagem</span>
          </div>
        )}
        <div className="lab-card-image-overlay">
          <h3 className="lab-card-title">{lab.localizacao || lab.descricao}</h3>
        </div>
      </div>

      {/* Detalhes do Laboratório */}
      <div className="lab-card-details">
        <div className="lab-card-details-content">
          <div className="lab-card-detail-row">
            <Users className="lab-card-icon" />
            <span>{lab.capacidade} lugares disponíveis</span>
          </div>

          <p className="lab-card-description">
            {lab.descricao || lab.observacao || "Laboratório sem descrição"}
          </p>
        </div>

        <button
          onClick={() => handleVerHorarios(lab.id)}
          className="lab-card-button"
        >
          <CalendarClock className="lab-card-icon" />
          Ver horários
        </button>
      </div>
    </div>
  );
}
