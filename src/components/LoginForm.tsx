import React, { useState } from "react";
import { useLoginForm } from "../hooks/useLoginForm";
import EmailInput from "./EmailInput";
import LoginButton from "./LoginButton";
import PasswordInput from "./PasswordInput";
import SignUpButton from "./SignUpButton";

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { formData, errors, status, handleChange, handleBlur, handleSubmit } =
    useLoginForm();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = handleSubmit(e);

      if (result.success) {
        // await api.login(formData);
        alert("Login realizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro ao realizar login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const getHelperText = (field: "email" | "password") => {
    if (status[field] === "success") {
      return field === "email" ? "Email válido" : "Senha válida";
    }
    return errors[field];
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col max-w-md mx-auto p-6 gap-2 space-y-4"
    >
      <EmailInput
        value={formData.email}
        onChange={handleChange("email")}
        onBlur={handleBlur("email")}
        status={status.email}
        helperText={getHelperText("email")}
      />

      <PasswordInput
        value={formData.password}
        onChange={handleChange("password")}
        onBlur={handleBlur("password")}
        status={status.password}
        helperText={getHelperText("password")}
      />

      <LoginButton
        onClick={() => {}}
        isLoading={isLoading}
        disabled={!formData.email || !formData.password}
      />
      <SignUpButton onClick={() => {}} />
    </form>
  );
};

export default LoginForm;
