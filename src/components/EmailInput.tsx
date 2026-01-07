import React from "react";
import { Input } from "@grupo10-pos-fiap/design-system";
import type { InputStatus } from "../types/loginFormTypes";

interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  status: InputStatus;
  helperText?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  onBlur,
  status,
  helperText,
}) => {
  return (
    <Input
      label="Email"
      type="email"
      placeholder="seu@email.com"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      status={status}
      leadingIcon="Mail"
      colorMode="white"
      helperText={helperText}
      required
    />
  );
};

export default EmailInput;
