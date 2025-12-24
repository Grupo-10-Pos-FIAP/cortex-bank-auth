import React from "react";
import BgImage from "../assets/bg-home.svg";
import LoginForm from "../components/LoginForm";
import { Text } from "@grupo10-pos-fiap/design-system";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <div className={styles.loginWrapper}>
          <Text variant="h1" weight="bold" color="primary">
            CortexBank
          </Text>
          <Text variant="h4" weight="bold" color="white">
            Acesso para clientes
          </Text>
          <div className={styles.textGroup}>
            <Text variant="body" weight="bold" color="white">
              O futuro das suas finanças merece esse
            </Text>
            <Text variant="body" weight="bold" color="primary">
              up
            </Text>
          </div>
          <LoginForm />
        </div>
      </div>

      <div className={styles.imageContainer}>
        <img src={BgImage} alt="Background do App" className={styles.bgImage} />
      </div>
    </div>
  );
};

export default Login;
