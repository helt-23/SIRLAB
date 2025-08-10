// src/components/modals/ProfileEditModal/ProfileFormSection.jsx
import { InputField } from "../../../components/inputField";
import { User, Mail } from "lucide-react";
import { PasswordSection } from "./paswordForm";

export const ProfileFormSection = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
  onCancel,
  onSave,
}) => {
  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <InputField
        type="text"
        name="name"
        placeholder="Nome completo"
        value={formData.name}
        onChange={handleChange}
        icon={User}
      />
      {errors.name && <p className="error-message">{errors.name}</p>}

      <InputField
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        icon={Mail}
      />
      {errors.email && <p className="error-message">{errors.email}</p>}

      <PasswordSection
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <div className="modal-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="save-btn" onClick={onSave}>
          Salvar Alterações
        </button>
      </div>
    </form>
  );
};
