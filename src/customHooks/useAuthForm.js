// src/customHooks/useAuthForm.js
import { useState } from "react";

export const useAuthForm = (initialState, validationRules) => {
  const [formData, setFormData] = useState(initialState);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpa erros quando o usuário começa a digitar
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }

    // Se houver sucesso anterior, reseta o estado de sucesso
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  };

  const validateField = (name, value) => {
    if (!validationRules[name]) return null;

    for (const rule of validationRules[name]) {
      if (!rule.validator(value, formData)) {
        return rule.message;
      }
    }
    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setFieldErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (authAction) => {
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return { success: false };
    }

    try {
      await authAction(formData);
      setSubmitSuccess(true);
      return { success: true };
    } catch (error) {
      setSubmitError(error.message || "Erro na operação");
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setFieldErrors({});
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  return {
    formData,
    fieldErrors,
    submitError,
    submitSuccess,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData,
    setSubmitSuccess,
  };
};
