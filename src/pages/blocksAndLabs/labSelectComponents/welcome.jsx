import "../styles/welcome.css";
import { LogoSystem } from "../../../public/icones/SystemLogo";
import { ArrowLeft } from "lucide-react";
export function WelcomeScreen() {
  return (
    <div className="welcome-screen">
      <div className="welcome-header">
        <div className="animated-icon">
          <LogoSystem />
        </div>
        <h1>
          Bem-vindo ao <span className="highlight">SIRLAB</span>
        </h1>
        <p>Seu portal para reservas de laboratórios</p>
      </div>

      <div className="welcome-steps">
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h3>Selecione um bloco</h3>
            <p>
              Escolha o bloco onde está localizado o laboratório que deseja usar
            </p>
          </div>
        </div>

        <div className="step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h3>Escolha um laboratório</h3>
            <p>Veja os laboratórios disponíveis no bloco selecionado</p>
          </div>
        </div>

        <div className="step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h3>Reserve seu horário</h3>
            <p>Selecione o dia e horário que deseja utilizar o laboratório</p>
          </div>
        </div>
      </div>

      <div className="welcome-cta">
        <div className="pulse-animation">
          <p className="cta-text">
            <ArrowLeft size={32} /> Para começar, selecione um bloco no menu à
            direita
          </p>
        </div>
      </div>
    </div>
  );
}
