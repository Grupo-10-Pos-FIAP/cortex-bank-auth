import { useState, useCallback } from "react";
import type {
  SignUpFormData,
  SignUpFormErrors,
  SignUpFormStatus,
} from "../types/loginFormTypes";
import { validateEmail, validatePassword } from "../utils/validation";
import { registerUser } from "../services/authService";

export const useSignUpForm = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<SignUpFormErrors>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [status, setStatus] = useState<SignUpFormStatus>({
    username: "neutral",
    email: "neutral",
    password: "neutral",
    confirmPassword: "neutral",
  });

  const handleChange = useCallback(
    (field: keyof SignUpFormData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          [field]: value,
        }));

        // Limpa erro ao começar a digitar
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: "" }));
        }
      },
    [errors]
  );

  const validateField = useCallback(
    (field: keyof SignUpFormData, value: string, password?: string) => {
      if (field === "username") {
        if (!value) {
          return { isValid: false, message: "Nome é obrigatório" };
        }
        if (value.length < 3) {
          return {
            isValid: false,
            message: "Nome deve ter pelo menos 3 caracteres",
          };
        }
        return { isValid: true, message: "" };
      }
      if (field === "email") {
        const result = validateEmail(value);
        return { isValid: result.isValid, message: result.message || "" };
      }
      if (field === "password") {
        const result = validatePassword(value);
        return { isValid: result.isValid, message: result.message || "" };
      }
      if (field === "confirmPassword") {
        if (!value) {
          return { isValid: false, message: "Confirmação de senha é obrigatória" };
        }
        if (password && value !== password) {
          return {
            isValid: false,
            message: "As senhas não coincidem",
          };
        }
        return { isValid: true, message: "" };
      }
      return { isValid: true, message: "" };
    },
    []
  );

  const handleBlur = useCallback(
    (field: keyof SignUpFormData) => () => {
      const value = formData[field];
      const validation = validateField(
        field,
        value,
        field === "confirmPassword" ? formData.password : undefined
      );

      setErrors((prev) => ({
        ...prev,
        [field]: validation.isValid ? "" : validation.message,
      }));

      setStatus((prev) => ({
        ...prev,
        [field]: validation.isValid ? "success" : "error",
      }));
    },
    [formData, validateField]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Valida todos os campos
      const usernameValidation = validateField("username", formData.username);
      const emailValidation = validateEmail(formData.email);
      const passwordValidation = validatePassword(formData.password);
      const confirmPasswordValidation = validateField(
        "confirmPassword",
        formData.confirmPassword,
        formData.password
      );

      const validationErrors: SignUpFormErrors = {
        username: usernameValidation.isValid ? "" : usernameValidation.message || "",
        email: emailValidation.isValid ? "" : emailValidation.message || "",
        password: passwordValidation.isValid ? "" : passwordValidation.message || "",
        confirmPassword: confirmPasswordValidation.isValid
          ? ""
          : confirmPasswordValidation.message || "",
      };

      const validationStatus: SignUpFormStatus = {
        username: usernameValidation.isValid ? "success" : "error",
        email: emailValidation.isValid ? "success" : "error",
        password: passwordValidation.isValid ? "success" : "error",
        confirmPassword: confirmPasswordValidation.isValid ? "success" : "error",
      };

      setErrors(validationErrors);
      setStatus(validationStatus);

      const isValid =
        usernameValidation.isValid &&
        emailValidation.isValid &&
        passwordValidation.isValid &&
        confirmPasswordValidation.isValid;

      if (!isValid) {
        return { success: false, errors: validationErrors };
      }

      try {
        await registerUser(
          formData.username,
          formData.email,
          formData.password
        );
        return { success: true };
      } catch (error) {
        console.error("Sign up error:", error);
        setErrors((prev) => ({
          ...prev,
          email: "Erro ao criar conta. Tente novamente.",
        }));
        setStatus((prev) => ({
          ...prev,
          email: "error",
        }));
        alert("Erro ao criar conta. Tente novamente.");
        return {
          success: false,
        };
      }
    },
    [formData, validateField]
  );

  return {
    formData,
    errors,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
    setFormData,
    setErrors,
    setStatus,
  };
};
