import { X } from "lucide-react";

{
  /*PROVAVELMENTE FAREMOS ESSA TELA OU MODAL DO ZERO, NÃO PRECISA MEXER AQUI!!!!!! PROVAVELMENTE FAREMOS ESSA TELA OU MODAL DO ZERO, NÃO PRECISA MEXER AQUI!!!!!! PROVAVELMENTE FAREMOS ESSA TELA OU MODAL DO ZERO, NÃO PRECISA MEXER AQUI!!!!!! PROVAVELMENTE FAREMOS ESSA TELA OU MODAL DO ZERO, NÃO PRECISA MEXER AQUI!!!!!! PROVAVELMENTE FAREMOS ESSA TELA OU MODAL DO ZERO, NÃO PRECISA MEXER AQUI!!!!!!*/
}
export function LabDetailModal({ isOpen, onClose, labDetails }) {
  if (!isOpen || !labDetails) return null;
  
  const laboratorio = labDetails?.laboratorio
  const hardwares = labDetails?.equipamentos || []
  const softwares = labDetails?.softwares || []

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2 className="modal__title">{laboratorio.descricao || "Laboratório"}</h2>
          <div className="lab-status-container">
            <span
              className={`lab-status ${
                laboratorio.disponivel ? "available" : "occupied"
              }`}
            >
              {laboratorio.disponivel ? "Disponível" : "Ocupado"}
            </span>
            <span className="lab-capacity">{laboratorio.capacidade} lugares</span>
          </div>
        </div>

        <div className="modal-content">
          <div className="info-card">
            <div className="info-card-header">
              <h3>Descrição</h3>
            </div>
            <div className="info-card-content">
              <p className="modal__text">
                {laboratorio.descricao || "Sem descrição disponível"}
              </p>
              <p className="modal__text">
                {laboratorio.observacao || "Sem detalhe disponível"}
              </p>
            </div>
          </div>

          <div className="grid-layout">
            <div className="info-card">
              <div className="info-card-header">
                <h3>Hardwares</h3>
              </div>
              <div className="info-card-content">
                {hardwares.length > 0 ? (
                  <ul className="item-list">
                    {hardwares.map((hardware, index) => (
                      <li key={index} className="item">
                        <div className="item-info">
                          <span className="item-name">{hardware.nome}</span>
                          <span className="item-spec">
                            {hardware.especificacao}
                          </span>
                        </div>
                        <span className="item-quantity">
                          {hardware.quantidade} unidades
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-items">Nenhum hardware cadastrado</p>
                )}
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-header">
                <h3>Softwares</h3>
              </div>
              <div className="info-card-content">
                {softwares.length > 0 ? (
                  <ul className="item-list">
                    {softwares.map((software, index) => (
                      <li key={index} className="item">
                        <div className="item-info">
                          <span className="item-name">{software.nome}</span>
                          <span className="item-spec">
                            Versão {software.versao}
                          </span>
                        </div>
                        <span className="item-license">{software.licenca}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-items">Nenhum software cadastrado</p>
                )}
              </div>
            </div>
          </div>

          {labDetails.responsavel && (
            <div className="info-card">
              <div className="info-card-header">
                <h3>Responsável</h3>
              </div>
              <div className="info-card-content">
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-label">Nome:</span>
                    <span className="contact-value">
                      {labDetails.responsavel.nome}
                    </span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Email:</span>
                    <span className="contact-value">
                      {labDetails.responsavel.email}
                    </span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Telefone:</span>
                    <span className="contact-value">
                      {labDetails.responsavel.telefone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
