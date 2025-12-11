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
