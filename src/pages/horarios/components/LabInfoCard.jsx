import { Users, Clock, Info } from "lucide-react";

export function LabInfoCard({ labDetails, setShowDetail, showDetail }) {
  if (!labDetails) return null;

  return (
    <>
      <div className="lab-info-card">
        <div className="lab-info-card__content">
          <h2 className="lab-info-card__title">{labDetails.descricao}</h2>

          <div className="lab-info-card__details">
            <div className="lab-info-card__details-item">
              <Users size={16} className="icon" />
              <div>
                <strong>{labDetails.capacidade} lugares</strong>
                <span>Capacidade total</span>
              </div>
            </div>

            <div className="lab-info-card__details-item">
              <Clock size={16} className="icon" />
              <div>
                <strong>Sala {labDetails.localizacao}</strong>
                <span>Localização</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lab-info-card__actions">
          <button
            className="lab-info-card__button info-button"
            onClick={() => setShowDetail(true)}
            aria-label="Ver detalhes completos"
          >
            <Info size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

export default LabInfoCard;
