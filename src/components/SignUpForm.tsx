import React, { useState } from "react";
import { useSignUpForm } from "../hooks/useSignUpForm";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import LoginButton from "./LoginButton";
import PasswordInput from "./PasswordInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import styles from "./LoginForm.module.css";

interface SignUpFormProps {
  onSuccess: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { formData, status, handleChange, handleBlur, handleSubmit } =
    useSignUpForm();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await handleSubmit(e);
      if (result.success) {
        alert("Conta criada com sucesso!");
        onSuccess();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <div className={styles.emailInput}>
        <NameInput
          value={formData.username}
          onChange={handleChange("username")}
          onBlur={handleBlur("username")}
          status={status.username}
        />
      </div>

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

      <div className={styles.passwordInput}>
        <ConfirmPasswordInput
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          onBlur={handleBlur("confirmPassword")}
          status={status.confirmPassword}
        />
      </div>

      <div className={styles.buttonsContainer}>
        <LoginButton
          onClick={() => {}}
          isLoading={isLoading}
        >
          Criar conta
        </LoginButton>
      </div>
    </form>
  );
};

export default SignUpForm;
