import React from "react";
import { Button } from "@grupo10-pos-fiap/design-system";

interface LoginButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  isLoading = false,
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      variant="primary"
      width="100%"
      disabled={disabled || isLoading}
    >
      {isLoading ? "Carregando..." : "Entrar"}
    </Button>
  );
};

export default LoginButton;
