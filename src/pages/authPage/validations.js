// src/utils/validations.js
export const loginValidations = {
  username: [
    {
      validator: (value) => !!value.trim(),
      message: "Usuário é obrigatório",
    },
  ],
  password: [
    {
      validator: (value) => !!value,
      message: "Senha é obrigatória",
    },
  ],
};

export const registerValidations = {
  name: [
    {
      validator: (value) => !!value.trim(),
      message: "Nome é obrigatório",
    },
  ],
  email: [
    {
      validator: (value) => !!value.trim(),
      message: "E-mail é obrigatório",
    },
    {
      validator: (value) => /^\S+@\S+\.\S+$/.test(value),
      message: "E-mail inválido",
    },
  ],
  matricula: [
    {
      validator: (value) => !!value.trim(),
      message: "Matrícula é obrigatória",
    },
  ],
  password: [
    {
      validator: (value) => !!value,
      message: "Senha é obrigatória",
    },
    {
      validator: (value) => value.length >= 6,
      message: "Senha deve ter pelo menos 6 caracteres",
    },
  ],
  passwordConfirm: [
    {
      validator: (value, formData) => value === formData.password,
      message: "As senhas não coincidem",
    },
  ],
};
