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
          <div className="arrow-welcom">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M3.283 10.94a1.5 1.5 0 0 0 0 2.12l5.656 5.658a1.5 1.5 0 1 0 2.122-2.122L7.965 13.5H19.5a1.5 1.5 0 0 0 0-3H7.965l3.096-3.096a1.5 1.5 0 1 0-2.122-2.121z"
                />
              </g>
            </svg>
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
    </div>
  );
}
