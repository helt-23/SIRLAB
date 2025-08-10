// src/hooks/useProfileEdit.js
import { useState, useRef } from "react";

export const useProfileEdit = (initialData = {}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "Usuário",
    email: initialData.email || "usuario@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    ...initialData,
  });

  const [profileImage, setProfileImage] = useState(
    initialData.profileImage || null
  );
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      newErrors.newPassword = "Senha deve ter pelo menos 6 caracteres";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e, onSuccess) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Dados atualizados:", { ...formData, profileImage });
      onSuccess?.();
    }
  };

  const resetForm = () => {
    setFormData({
      name: initialData.name || "Usuário",
      email: initialData.email || "usuario@example.com",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setProfileImage(initialData.profileImage || null);
    setErrors({});
  };

  return {
    formData,
    profileImage,
    errors,
    fileInputRef,
    handleChange,
    handleImageChange,
    triggerFileInput,
    handleSubmit,
    resetForm,
  };
};
