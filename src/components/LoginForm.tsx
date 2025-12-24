import React, { useState } from "react";
import { useLoginForm } from "../hooks/useLoginForm";
import EmailInput from "./EmailInput";
import LoginButton from "./LoginButton";
import PasswordInput from "./PasswordInput";
import SignUpButton from "./SignUpButton";
import styles from "./LoginForm.module.css";

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { formData, errors, status, handleChange, handleBlur, handleSubmit } =
    useLoginForm();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    Promise.resolve()
      .then(() => handleSubmit(e))
      .then((result: any) => {
        if (result && result.success) {
          alert("Login realizado com sucesso!");
        }
      })
      .catch((error: any) => {
        console.error("Erro no login:", error);
        alert("Erro ao realizar login. Tente novamente.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getHelperText = (field: "email" | "password") => {
    if (status[field] === "success") {
      return field === "email" ? "Email válido" : "Senha válida";
    }
    return errors[field];
  };

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <div className={styles.emailInput}>
        <EmailInput
          value={formData.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          status={status.email}
          helperText={getHelperText("email")}
        />
      </div>

      <div className={styles.passwordInput}>
        <PasswordInput
          value={formData.password}
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          status={status.password}
          helperText={getHelperText("password")}
        />
      </div>

      <div className={styles.buttonsContainer}>
        <LoginButton
          onClick={() => {}}
          isLoading={isLoading}
          disabled={!formData.email || !formData.password}
        />
        <SignUpButton onClick={() => {}} />
      </div>
    </form>
  );
};

export default LoginForm;
