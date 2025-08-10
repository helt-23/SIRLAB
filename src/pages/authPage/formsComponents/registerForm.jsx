// src/pages/RegisterForm.jsx
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { InputField } from "../../../components/inputField";
import {
  FaUser,
  FaEnvelope,
  FaIdBadge,
  FaLock,
  FaKey,
  FaCheckCircle,
} from "react-icons/fa";
import { useAuth } from "../../../context/authContext";
import { useAuthForm } from "../../../customHooks/useAuthForm";
import { registerValidations } from "../validations";

export const RegisterForm = ({ onSuccess }) => {
  const { register } = useAuth();
  const {
    formData,
    fieldErrors,
    submitError,
    submitSuccess,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useAuthForm(
    {
      name: "",
      email: "",
      matricula: "",
      password: "",
      passwordConfirm: "",
      role: "student",
    },
    registerValidations
  );

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (submitSuccess) {
      setShowSuccessModal(true);

      // Fecha o modal após 3 segundos e redireciona para login
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        resetForm();
        if (onSuccess) onSuccess();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [submitSuccess, resetForm, onSuccess]);

  const Portal = ({ children }) => {
    const portalRoot = document.getElementById("portal-root");
    return portalRoot ? ReactDOM.createPortal(children, portalRoot) : null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await handleSubmit(register);
  };

  return (
    <div className="form-box register active relative">
      <form className="w-full" onSubmit={handleRegister}>
        <h1 className="title">AUTOREGISTRO</h1>

        {submitError && (
          <div className="error-message animate-shake">
            <div className="error-content">
              <h3 className="error-title">Erro no cadastro</h3>
              <p className="error-text">{submitError}</p>
            </div>
          </div>
        )}

        <InputField
          name="name"
          type="text"
          placeholder="Nome completo"
          icon={FaUser}
          value={formData.name}
          onChange={handleChange}
          error={fieldErrors.name}
          required
        />

        <InputField
          name="email"
          type="email"
          placeholder="E-mail"
          icon={FaEnvelope}
          value={formData.email}
          onChange={handleChange}
          error={fieldErrors.email}
          required
        />

        <InputField
          name="matricula"
          type="text"
          placeholder="Matrícula"
          icon={FaIdBadge}
          value={formData.matricula}
          onChange={handleChange}
          error={fieldErrors.matricula}
          required
        />

        <InputField
          name="password"
          type="password"
          placeholder="Senha"
          icon={FaLock}
          value={formData.password}
          onChange={handleChange}
          error={fieldErrors.password}
          required
        />

        <InputField
          name="passwordConfirm"
          type="password"
          placeholder="Confirme sua senha"
          icon={FaKey}
          value={formData.passwordConfirm}
          onChange={handleChange}
          error={fieldErrors.passwordConfirm}
          required
        />

        <select
          className="user-type"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">Estudante</option>
          <option value="teacher">Professor</option>
          <option value="admin">Bolsista</option>
        </select>

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Carregando..." : "Registrar"}
        </button>
      </form>

      {/* Modal de sucesso */}
      {showSuccessModal && (
        <Portal>
          <div className="register-success-overlay">
            <div className="register-success-modal">
              <div className="register-success-icon">
                <FaCheckCircle size={48} className="text-green-500" />
              </div>
              <div className="register-success-body">
                <h3 className="register-success-title">
                  Cadastro realizado com sucesso!
                </h3>
                <p className="register-success-text">
                  Redirecionando para o login...
                </p>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};
