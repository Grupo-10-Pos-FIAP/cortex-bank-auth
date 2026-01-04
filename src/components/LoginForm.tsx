import React, { useState } from "react";
import { useLoginForm } from "../hooks/useLoginForm";
import EmailInput from "./EmailInput";
import LoginButton from "./LoginButton";
import PasswordInput from "./PasswordInput";
import SignUpButton from "./SignUpButton";
import styles from "./LoginForm.module.css";
import ForgotPassword from "./ForgotPassword";

const LoginForm: React.FC = () => {
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
        <ForgotPassword />
      </div>

      <div className={styles.buttonsContainer}>
        <LoginButton
          onClick={() => {}}
          isLoading={isLoading}
        />
        <SignUpButton
          onClick={() => {
            alert("Página em construção!");
          }}
        />
      </div>
    </form>
  );
};

export default LoginForm;
