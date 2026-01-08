import React, { useState } from "react";
import { useLoginForm } from "../hooks/useLoginForm";
import EmailInput from "./EmailInput";
import LoginButton from "./LoginButton";
import PasswordInput from "./PasswordInput";
import SignUpButton from "./SignUpButton";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  onNavigateToSignUp?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onNavigateToSignUp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { formData, status, handleChange, handleBlur, handleSubmit } =
    useLoginForm();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleSubmit(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <div className={styles.emailInput}>
        <EmailInput
          value={formData.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          status={status.email}
        />
      </div>

      <div className={styles.passwordInput}>
        <PasswordInput
          value={formData.password}
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          status={status.password}
        />
      </div>

      <div className={styles.buttonsContainer}>
        <LoginButton
          onClick={() => {}}
          isLoading={isLoading}
        />
        <SignUpButton
          onClick={() => {
            onNavigateToSignUp?.();
          }}
        />
      </div>

      <div className={styles.passwordRecoveryInfo}>
        <p>Não tem ou esqueceu a senha? Entre em contato com nossa equipe, através do email: <a href="mailto:cortexbank.contato@gmail.com">cortexbank.contato@gmail.com</a></p>
      </div>
    </form>
  );
};

export default LoginForm;
