import { useState, useCallback } from "react";
import type {
  LoginFormData,
  LoginFormErrors,
  LoginFormStatus,
} from "../types/loginFormTypes";
import {
  validateForm,
  validateEmail,
  validatePassword,
} from "../utils/validation";
import { loginUser } from "../services/authService";

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState<LoginFormStatus>({
    email: "neutral",
    password: "neutral",
  });

  const handleChange = useCallback(
    (field: keyof LoginFormData) =>
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
    (field: keyof LoginFormData, value: string) => {
      if (field === "email") {
        const result = validateEmail(value);
        return { isValid: result.isValid, message: result.message };
      }
      if (field === "password") {
        const result = validatePassword(value);
        return { isValid: result.isValid, message: result.message };
      }
      return { isValid: true, message: "" };
    },
    []
  );

  const handleBlur = useCallback(
    (field: keyof LoginFormData) => () => {
      const value = formData[field];
      const validation = validateField(field, value);

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

      const validation = validateForm(formData);
      setErrors(validation.errors);
      setStatus(validation.status);

      if (!validation.isValid) {
        return { success: false, errors: validation.errors };
      }

      try {
        const result = await loginUser(formData.email, formData.password);
        window.location.href = "/dashboard";
        return { success: true, data: result };
      } catch (error) {
        console.error("Login error:", error);
        setErrors((prev) => ({
          ...prev,
        }));
        setStatus((prev) => ({
          ...prev,
          email: "error",
        }));
        alert("Email ou senha incorretos. Tente novamente.");
        return {
          success: false,
        };
      }
    },
    [formData]
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
