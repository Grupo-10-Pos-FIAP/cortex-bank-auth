import type {
  LoginFormData,
  LoginFormErrors,
  LoginFormStatus,
  ValidationResult,
} from "../types";

export const validateEmail = (
  email: string
): { isValid: boolean; message?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { isValid: false, message: "Email é obrigatório" };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Email inválido" };
  }

  return { isValid: true };
};

export const validatePassword = (
  password: string
): { isValid: boolean; message?: string } => {
  if (!password) {
    return { isValid: false, message: "Senha é obrigatória" };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: "Senha deve ter pelo menos 8 caracteres",
    };
  }

  return { isValid: true };
};

export const validateForm = (formData: LoginFormData): ValidationResult => {
  const emailValidation = validateEmail(formData.email);
  const passwordValidation = validatePassword(formData.password);

  const errors: LoginFormErrors = {
    email: emailValidation.isValid ? "" : emailValidation.message,
    password: passwordValidation.isValid ? "" : passwordValidation.message,
  };

  const status: LoginFormStatus = {
    email: emailValidation.isValid ? "success" : "error",
    password: passwordValidation.isValid ? "success" : "error",
  };

  const isValid = emailValidation.isValid && passwordValidation.isValid;

  return { isValid, errors, status };
};
