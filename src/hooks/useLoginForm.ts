import { useState, useCallback } from "react";
import type { LoginFormData, LoginFormErrors, LoginFormStatus } from "../types";
import { validateForm } from "../utils/validation";

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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          return { isValid: false, message: "Email é obrigatório" };
        }
        if (!emailRegex.test(value)) {
          return { isValid: false, message: "Email inválido" };
        }
        return { isValid: true, message: "Email válido" };
      }

      if (field === "password") {
        if (!value) {
          return { isValid: false, message: "Senha é obrigatória" };
        }
        if (value.length < 8) {
          return {
            isValid: false,
            message: "Senha deve ter pelo menos 8 caracteres",
          };
        }
        return { isValid: true, message: "" };
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
    (e: React.FormEvent) => {
      e.preventDefault();
      const validation = validateForm(formData);

      setErrors(validation.errors);
      setStatus(validation.status);

      if (validation.isValid) {
        console.log("Login realizado:", formData);
        // Aqui você pode chamar uma API de login
        return { success: true, data: formData };
      }

      return { success: false, errors: validation.errors };
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
