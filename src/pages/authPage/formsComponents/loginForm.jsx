// src/pages/LoginForm.jsx
import { useNavigate } from "react-router-dom";
import { InputField } from "../../../components/inputField";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../../../context/authContext";
import { useAuthForm } from "../../../customHooks/useAuthForm";
import { loginValidations } from "../validations";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading: authLoading } = useAuth();
  const {
    formData,
    fieldErrors,
    submitError,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useAuthForm({ username: "", password: "" }, loginValidations);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await handleSubmit(login);

    if (result.success) {
      navigate("/laboratorios");
    }
  };

  return (
    <div className="form-box login active">
      <form className="w-full" onSubmit={handleLogin}>
        <h1 className="title">LOGIN</h1>

        {submitError && <div className="error-message">{submitError}</div>}

        <InputField
          name="username"
          type="text"
          placeholder="Usuário"
          icon={FaUser}
          value={formData.username}
          onChange={handleChange}
          error={fieldErrors.username}
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

        <div className="my-6">
          <a href="#" className="text-sm hover:underline">
            Esqueceu sua Senha?
          </a>
        </div>

        <button
          type="submit"
          className="btn"
          disabled={authLoading || isSubmitting}
        >
          {authLoading || isSubmitting ? "Carregando..." : "Acessar"}
        </button>
      </form>
    </div>
  );
};
