import CenteredIcon from "../../../public/icones/unfesspaLogo";

export const ToggleBox = ({
  isActive,
  handleRegisterClick,
  handleLoginClick,
}) => (
  <div className="toggle-box">
    <div className={`toggle-panel toggle-left ${!isActive ? "active" : ""}`}>
      <CenteredIcon />
      <h2 className="text-2xl mb-4 font-bold text-center">
        Bem vindo ao SIRLAB!
      </h2>
      <p className="mb-6 text-sm">Não possui uma conta?</p>
      <button className="btn register-btn" onClick={handleRegisterClick}>
        Registrar-se
      </button>
    </div>

    <div className={`toggle-panel toggle-right ${isActive ? "active" : ""}`}>
      <CenteredIcon />
      <h2 className="text-2xl mb-4 font-bold">Bem vindo de volta!</h2>
      <p className="mb-6 text-sm">Já possui uma conta?</p>
      <button className="btn login-btn" onClick={handleLoginClick}>
        Login
      </button>
    </div>
  </div>
);
