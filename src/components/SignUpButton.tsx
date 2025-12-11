import React from "react";
import { Button } from "@grupo10-pos-fiap/design-system";

interface SignUpButtonProps {
  onClick: () => void;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({
  onClick,
}) => {
  return (
    <Button onClick={onClick} variant="negative" width="100%">
      Criar conta
    </Button>
  );
};

export default SignUpButton;
