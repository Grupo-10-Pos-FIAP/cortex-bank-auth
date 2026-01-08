import React from "react";
import BgImage from "../assets/bg-home.svg";
import SignUpForm from "../components/SignUpForm";
import { Text, Button } from "@grupo10-pos-fiap/design-system";
import styles from "./Login.module.css";

interface SignUpProps {
  onBackToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onBackToLogin }) => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <div className={styles.loginWrapper}>
          <Text variant="h1" weight="bold" color="primary">
            CortexBank
          </Text>
          <Text variant="h4" weight="bold" color="white">
            Criar conta
          </Text>
          <div className={styles.textGroup}>
            <Text variant="body" weight="bold" color="white">
              O futuro das suas finanças merece esse
            </Text>
            <Text variant="body" weight="bold" color="primary">
              up
            </Text>
          </div>
          <SignUpForm onSuccess={onBackToLogin} />
          <div style={{ marginTop: "1rem", width: "100%" }}>
            <Button
              onClick={onBackToLogin}
              type="button"
              variant="negative"
              width="100%"
            >
              Voltar para login
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <img src={BgImage} alt="Background do App" className={styles.bgImage} />
      </div>
    </div>
  );
};

export default SignUp;
