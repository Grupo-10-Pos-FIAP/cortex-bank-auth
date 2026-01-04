import React from "react";
import { Button, Text } from "@grupo10-pos-fiap/design-system";
import styles from "./ForgotPassword.module.css";

const ForgotPassword: React.FC = () => {
  return (
    <a
      className={styles.link}
      href="/auth"
      onClick={() => {
        alert("Página em construção!");
      }}
    >
      <Text variant="caption" color="white" align="right">
        Esqueceu a senha?
      </Text>
    </a>
  );
};

export default ForgotPassword;
