export type InputStatus = "neutral" | "success" | "error";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email: string;
  password: string;
}

export interface LoginFormStatus {
  email: InputStatus;
  password: InputStatus;
}

export interface ValidationResult {
  isValid: boolean;
  errors: LoginFormErrors;
  status: LoginFormStatus;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpFormErrors {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpFormStatus {
  username: InputStatus;
  email: InputStatus;
  password: InputStatus;
  confirmPassword: InputStatus;
}

export interface SignUpValidationResult {
  isValid: boolean;
  errors: SignUpFormErrors;
  status: SignUpFormStatus;
}
