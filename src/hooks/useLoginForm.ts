import { useState, useCallback } from "react";
import type {
  LoginFormData,
  LoginFormErrors,
  LoginFormStatus,
} from "../types/loginFormTypes";
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

        if (errors.email || errors.password) {
          setErrors({
            email: "",
            password: "",
          });
          setStatus({
            email: "neutral",
            password: "neutral",
          });
        }
      },
    [errors]
  );

  const handleBlur = useCallback(
    (_field: keyof LoginFormData) => () => {
      // No-op: Login form doesn't require blur validation
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const result = await loginUser(formData.email, formData.password);
        return { success: true, data: result };
      } catch (error) {
        console.error("Login error:", error);
        setErrors({
          email: "Email ou senha inválidos",
          password: "Email ou senha inválidos",
        });
        setStatus({
          email: "error",
          password: "error",
        });
        alert("Dados inválidos, verifique suas credenciais e tente novamente");
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
