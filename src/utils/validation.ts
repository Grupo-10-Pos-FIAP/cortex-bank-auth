import type {
  LoginFormData,
  LoginFormErrors,
  LoginFormStatus,
  SignUpFormData,
  SignUpFormErrors,
  SignUpFormStatus,
  SignUpValidationResult,
  ValidationResult,
} from "../types/loginFormTypes";

interface FieldValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateEmail = (email: string): FieldValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return {
      isValid: false,
      message: "Informe um e-mail válido",
    };
  }

  return { isValid: true };
};

export const validatePassword = (password: string): FieldValidationResult => {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      message: "A senha deve ter pelo menos 8 caracteres",
    };
  }

  return { isValid: true };
};

export const validateUsername = (username: string): FieldValidationResult => {
  if (!username) {
    return { isValid: false, message: "Nome é obrigatório" };
  }

  if (username.length < 3) {
    return {
      isValid: false,
      message: "Nome deve ter pelo menos 3 caracteres",
    };
  }

  return { isValid: true };
};

export const validateConfirmPassword = (
  confirmPassword: string,
  password: string
): FieldValidationResult => {
  if (!confirmPassword) {
    return {
      isValid: false,
      message: "Confirmação de senha é obrigatória",
    };
  }

  if (confirmPassword !== password) {
    return {
      isValid: false,
      message: "As senhas não coincidem",
    };
  }

  return { isValid: true };
};

export const validateLoginForm = (
  formData: LoginFormData
): ValidationResult => {
  const emailValidation = validateEmail(formData.email);
  const passwordValidation = validatePassword(formData.password);

  const errors: LoginFormErrors = {
    email: emailValidation.isValid ? "" : emailValidation.message || "",
    password: passwordValidation.isValid
      ? ""
      : passwordValidation.message || "",
  };

  const status: LoginFormStatus = {
    email: emailValidation.isValid ? "success" : "error",
    password: passwordValidation.isValid ? "success" : "error",
  };

  const isValid = emailValidation.isValid && passwordValidation.isValid;

  return { isValid, errors, status };
};

export const validateSignUpForm = (
  formData: SignUpFormData
): SignUpValidationResult => {
  const usernameValidation = validateUsername(formData.username);
  const emailValidation = validateEmail(formData.email);
  const passwordValidation = validatePassword(formData.password);
  const confirmPasswordValidation = validateConfirmPassword(
    formData.confirmPassword,
    formData.password
  );

  const errors: SignUpFormErrors = {
    username: usernameValidation.isValid
      ? ""
      : usernameValidation.message || "",
    email: emailValidation.isValid ? "" : emailValidation.message || "",
    password: passwordValidation.isValid
      ? ""
      : passwordValidation.message || "",
    confirmPassword: confirmPasswordValidation.isValid
      ? ""
      : confirmPasswordValidation.message || "",
  };

  const status: SignUpFormStatus = {
    username: usernameValidation.isValid ? "success" : "error",
    email: emailValidation.isValid ? "success" : "error",
    password: passwordValidation.isValid ? "success" : "error",
    confirmPassword: confirmPasswordValidation.isValid ? "success" : "error",
  };

  const isValid =
    usernameValidation.isValid &&
    emailValidation.isValid &&
    passwordValidation.isValid &&
    confirmPasswordValidation.isValid;

  return { isValid, errors, status };
};
