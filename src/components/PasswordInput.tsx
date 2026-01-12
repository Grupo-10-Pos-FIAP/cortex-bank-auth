import React from "react";
import { Input } from "@grupo10-pos-fiap/design-system";
import type { InputStatus } from "../types/loginFormTypes";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  status: InputStatus;
  helperText?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  onBlur,
  status,
  helperText,
}) => {
  return (
    <Input
      label="Senha"
      type="password"
      placeholder="Digite sua senha"
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

export default PasswordInput;
