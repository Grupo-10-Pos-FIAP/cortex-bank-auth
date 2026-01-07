import type {
  LoginFormData,
  LoginFormErrors,
  LoginFormStatus,
  ValidationResult,
} from "../types/loginFormTypes";

export const validateEmail = (
  email: string
): { isValid: boolean; message?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return {
      isValid: false,
      message: "Dados inválidos, verifique suas credenciais e tente novamente",
    };
  }

  return { isValid: true };
};

export const validatePassword = (
  password: string
): { isValid: boolean; message?: string } => {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      message: "Dados inválidos, verifique suas credenciais e tente novamente",
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
