import { Link } from "react-router-dom";
import "./home.css";
import { LogoSystem } from "../../public/icones/SystemLogo";
import mapImage from "../../assets/images/mapUnfifesspa.jpeg";

export function HomePage() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <div className="logo-pulse">
            <LogoSystem />
          </div>
          <h1>Seja bem Vindo ao SIRLAB!</h1>
          <h2> SISTEMA INTEGRADO DE RESERVAS DE LABORATÓRIO</h2>
          <p>
            Plataforma integrada para administração, reserva e monitoramento de
            laboratórios e recursos tecnológicos
          </p>
          <Link to="/login" className="explore-btn">
            Explorar Laboratórios
          </Link>
        </div>
      </div>

      <div className="features-section">
        <div className="section-header">
          <h2>Recursos Principais</h2>
          <p>
            O SIRLAB oferece tudo que você precisa para uma gestão eficiente de
            laboratórios
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#1a73e8">
                <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H1c-.55 0-1 .45-1 1s.45 1 1 1h22c.55 0 1-.45 1-1s-.45-1-1-1h-3zM4 6h16v10H4V6z" />
              </svg>
            </div>
            <h3>Visão Geral em Tempo Real</h3>
            <p>
              Acesso instantâneo ao status de todos os laboratórios e
              equipamentos com atualizações em tempo real
            </p>
            <ul className="feature-details">
              <li>Monitoramento de disponibilidade</li>
              <li>Status de equipamentos</li>
              <li>Alertas de manutenção</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#1a73e8">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h1v1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5h1c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z" />
              </svg>
            </div>
            <h3>Sistema de Reservas Inteligente</h3>
            <p>
              Agendamento simplificado de salas e equipamentos com calendário
              integrado e confirmação automática
            </p>
            <ul className="feature-details">
              <li>Calendário visual integrado</li>
              <li>Conflitos de agenda detectados automaticamente</li>
              <li>Notificações por e-mail</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#1a73e8">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            </div>
            <h3>Gestão de Ativos Técnicos</h3>
            <p>
              Controle completo sobre hardwares, softwares e configurações dos
              laboratórios
            </p>
            <ul className="feature-details">
              <li>Inventário detalhado</li>
              <li>Histórico de manutenção</li>
              <li>Especificações técnicas</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="system-details">
        <div className="details-content">
          <div className="details-text">
            <h2>Sobre o SIRLAB</h2>
            <p>
              O SIRLAB é uma plataforma desenvolvida para otimizar a gestão de
              laboratórios acadêmicos e de pesquisa. Nossa solução integra todas
              as funcionalidades necessárias para administrar recursos, agendar
              espaços e monitorar equipamentos de forma eficiente. Uma nova
              forma de auxiliar tanto os discentes quanto os docentes da
              Universiade Federal do Sul e Sudeste do PARÁ.
            </p>

            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-value">Dados a Serem Coletados</div>
                <div className="stat-label">Eficiência Operacional</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">Dados a Serem Coletados</div>
                <div className="stat-label">Redução de Conflitos</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">Dados a Serem Coletados</div>
                <div className="stat-label">Disponibilidade</div>
              </div>
            </div>

            <h3>Benefícios do Sistema</h3>
            <ul className="benefits-list">
              <li>
                <span>Otimização de recursos:</span> Maximize o uso dos
                laboratórios e equipamentos
              </li>
              <li>
                <span>Controle centralizado:</span> Gerencie todos os
                laboratórios em uma única plataforma
              </li>
              <li>
                <span>Relatórios detalhados:</span> Gere análises de uso e
                ocupação para tomada de decisão
              </li>
              <li>
                <span>Acesso remoto:</span> Gerencie laboratórios de qualquer
                lugar, a qualquer momento
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="campus-map-section">
        <div className="section-header">
          <h2>Mapa dos Blocos da Faculdade</h2>
          <p>Localize os laboratórios em nosso campus universitário</p>
        </div>

        <div className="map-container">
          <div className="map-image-container">
            <img
              src={mapImage}
              alt="Mapa de Laboratórios"
              className="map-image"
            />
          </div>
        </div>

        <div className="map-legend">
          <h3>Legenda dos Blocos:</h3>
          <div className="blocks-grid">
            <div className="block-card">
              <h4>Bloco 1</h4>
              <p>
                Salas 01, 02 e 03 – Engenharia Civil; Laboratório de Desenho
                Técnico
              </p>
            </div>

            <div className="block-card">
              <h4>Bloco 2</h4>
              <p>
                Sala 04 – Sala de estudos; Sala 05 – Metodologias ativas; Salas
                06, 07 e 08 – Engenharia de Materiais; Laboratório de Simulação
                Computacional APSE; Laboratório de Física Experimental
              </p>
            </div>

            <div className="block-card">
              <h4>Bloco 3</h4>
              <p>
                Salas 09, 10 e 11 – Geologia; Miniauditório; Galpão de
                Laboratórios
              </p>
            </div>

            <div className="block-card">
              <h4>Bloco 4</h4>
              <p>
                Salas 12, 13, 14 e 15 – Engenharia Elétrica e Engenharia de
                Minas; Laboratório de Química Experimental; Laboratório de
                Planejamento e Lavra de Mina; Laboratório de Análise e
                Desenvolvimento de Sistemas
              </p>
            </div>

            <div className="block-card">
              <h4>Bloco 5</h4>
              <p>
                Secretaria Acadêmica / Sala de reuniões; Direção do Instituto /
                Coordenadoria Administrativa; Sala 18 – Mestrado em Ciências
                Forenses; Salas 19 e 20 – Sistemas de Informação; Laboratório de
                Programação; Salas 22, 23 e 26 – Engenharia da Computação; Sala
                24 – Metodologias Ativas; Sala 27 – Mestrado PROFNIT; Salas 28,
                29 e 30 – Engenharia Química; Salas 31, 32 e 33 – Engenharia
                Mecânica
              </p>
            </div>

            <div className="block-card">
              <h4>Bloco 6</h4>
              <p>Em andamento</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
