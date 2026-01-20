import React from "react";
import { Button } from "@grupo10-pos-fiap/design-system";

interface LoginButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  isLoading = false,
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <Button onClick={onClick} variant="primary" width="100%" disabled={disabled || isLoading}>
      {isLoading ? "Carregando..." : children || "Entrar"}
    </Button>
  );
};

export default LoginButton;
