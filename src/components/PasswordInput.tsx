import React, { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Input
      label="Senha"
      type={showPassword ? "text" : "password"}
      placeholder="Digite sua senha"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      status={status}
      leadingIcon="Lock"
      trailingIcon={showPassword ? "EyeOff" : "Eye"}
      trailingIconOnClick={handleTogglePassword}
      required
      colorMode="white"
      helperText={helperText}
    />
  );
};

export default PasswordInput;
