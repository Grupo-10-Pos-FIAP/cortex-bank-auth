import React, { useState } from "react";
import { Button } from "@grupo10-pos-fiap/design-system";
import { useSignUpForm } from "../hooks/useSignUpForm";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import LoginButton from "./LoginButton";
import PasswordInput from "./PasswordInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import styles from "./LoginForm.module.css";

interface SignUpFormProps {
  onSuccess: () => void;
  onBackToLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSuccess,
  onBackToLogin,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { formData, status, errors, handleChange, handleBlur, handleSubmit } =
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
          helperText={errors.username || ""}
        />
      </div>

      <div className={styles.emailInput}>
        <EmailInput
          value={formData.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          status={status.email}
          helperText={errors.email || ""}
        />
      </div>

      <div className={styles.passwordInput}>
        <PasswordInput
          value={formData.password}
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          status={status.password}
          helperText={errors.password || ""}
        />
      </div>

      <div className={styles.passwordInput}>
        <ConfirmPasswordInput
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          onBlur={handleBlur("confirmPassword")}
          status={status.confirmPassword}
          helperText={errors.confirmPassword || ""}
        />
      </div>

      <div className={styles.buttonsContainer}>
        <LoginButton onClick={() => {}} isLoading={isLoading}>
          Criar conta
        </LoginButton>
        <Button
          onClick={onBackToLogin}
          type="button"
          variant="negative"
          width="100%"
        >
          Voltar para login
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
