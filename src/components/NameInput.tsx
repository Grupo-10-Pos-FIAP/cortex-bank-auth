import React from "react";
import { Input } from "@grupo10-pos-fiap/design-system";
import type { InputStatus } from "../types/loginFormTypes";

interface NameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  status: InputStatus;
  helperText?: string;
}

const NameInput: React.FC<NameInputProps> = ({
  value,
  onChange,
  onBlur,
  status,
  helperText,
}) => {
  return (
    <Input
      label="Nome"
      type="text"
      placeholder="Digite seu nome"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      status={status}
      leadingIcon="User"
      colorMode="white"
      helperText={helperText}
      required
    />
  );
};

export default NameInput;
