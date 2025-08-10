// src/components/modals/ProfileEditModal/PasswordSection.jsx
import { InputField } from "../../../components/inputField";
import { Lock } from "lucide-react";

export const PasswordSection = ({ formData, errors, handleChange }) => {
  return (
    <div className="password-section">
      <h3 className="section-title">Alterar Senha</h3>

      <InputField
        type="password"
        name="currentPassword"
        placeholder="Senha atual"
        value={formData.currentPassword}
        onChange={handleChange}
        icon={Lock}
      />

      <InputField
        type="password"
        name="newPassword"
        placeholder="Nova senha"
        value={formData.newPassword}
        onChange={handleChange}
        icon={Lock}
      />
      {errors.newPassword && (
        <p className="error-message">{errors.newPassword}</p>
      )}

      <InputField
        type="password"
        name="confirmPassword"
        placeholder="Confirmar nova senha"
        value={formData.confirmPassword}
        onChange={handleChange}
        icon={Lock}
      />
      {errors.confirmPassword && (
        <p className="error-message">{errors.confirmPassword}</p>
      )}
    </div>
  );
};
