import React from "react";
import { Text } from "@grupo10-pos-fiap/design-system";
import styles from "./ForgotPassword.module.css";

const ForgotPassword: React.FC = () => {
  return (
    <a
      className={styles.link}
      href="/auth"
      onClick={() => {
        alert(
          "Não tem ou esqueceu a senha? Entre em contato com nossa equipe,  através do email: cortexbank.contato@gmail.com"
        );
      }}
    >
      <Text variant="caption" color="white" align="right">
        Esqueceu a senha?
      </Text>
    </a>
  );
};

export default ForgotPassword;
