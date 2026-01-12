import React from "react";
import { Input } from "@grupo10-pos-fiap/design-system";
import type { InputStatus } from "../types/loginFormTypes";

interface ConfirmPasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  status: InputStatus;
  helperText?: string;
}

const ConfirmPasswordInput: React.FC<ConfirmPasswordInputProps> = ({
  value,
  onChange,
  onBlur,
  status,
  helperText,
}) => {
  return (
    <Input
      label="Confirmar Senha"
      type="password"
      placeholder="Confirme sua senha"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      status={status}
      leadingIcon="Lock"
      trailingIcon="Eye"
      required
      colorMode="white"
      helperText={helperText}
    />
  );
};

export default ConfirmPasswordInput;
