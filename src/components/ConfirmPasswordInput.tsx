import React, { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Input
      label="Confirmar Senha"
      type={showPassword ? "text" : "password"}
      placeholder="Confirme sua senha"
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

export default ConfirmPasswordInput;
