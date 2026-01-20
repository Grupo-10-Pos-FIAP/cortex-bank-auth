import { useState, useCallback } from "react";
import type {
  SignUpFormData,
  SignUpFormErrors,
  SignUpFormStatus,
} from "../types/loginFormTypes";
import {
  validateEmail,
  validatePasswordStrong,
  validateUsername,
  validateConfirmPassword,
  validateSignUpForm,
} from "../utils/validation";
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

        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: "" }));
        }
      },
    [errors]
  );

  const validateField = useCallback(
    (field: keyof SignUpFormData, value: string) => {
      if (field === "username") {
        const result = validateUsername(value);
        return { isValid: result.isValid, message: result.message || "" };
      }
      if (field === "email") {
        const result = validateEmail(value);
        return { isValid: result.isValid, message: result.message || "" };
      }
      if (field === "password") {
        const result = validatePasswordStrong(value);
        return { isValid: result.isValid, message: result.message || "" };
      }
      if (field === "confirmPassword") {
        const result = validateConfirmPassword(value, formData.password);
        return { isValid: result.isValid, message: result.message || "" };
      }
      return { isValid: true, message: "" };
    },
    [formData.password]
  );

  const handleBlur = useCallback(
    (field: keyof SignUpFormData) => () => {
      const value = formData[field];
      const validation = validateField(field, value);

      setErrors((prev) => ({
        ...prev,
        [field]: validation.isValid ? "" : validation.message,
      }));

      setStatus((prev) => ({
        ...prev,
        [field]: validation.isValid ? "neutral" : "error",
      }));
    },
    [formData, validateField]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const validation = validateSignUpForm(formData);
      setErrors(validation.errors);
      setStatus(validation.status);

      if (!validation.isValid) {
        return { success: false, errors: validation.errors };
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
