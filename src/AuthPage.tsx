import React from "react";
import BgImage from "./assets/bg-home.svg";
import LoginForm from "./components/LoginForm";
import { Text } from "@grupo10-pos-fiap/design-system";
import "./styles/global.css";

const AuthPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-700">
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="flex flex-col items-center mb-8 gap-2 max-w-md w-full">
          <Text variant="h1" weight="bold" color="primary">
            CortexBank
          </Text>
          <Text variant="h4" weight="bold" color="white">
            Acesso para clientes
          </Text>
          <div className="flex flex-row gap-1">
            <Text variant="body" weight="bold" color="white">
              O futuro das suas finanças merece esse
            </Text>
            <Text variant="body" weight="bold" color="primary">
              up
            </Text>
          </div>
          <LoginForm />
        </div>
      </div>

      <div className="hidden md:flex md:w-7/12 overflow-hidden">
        <img
          src={BgImage}
          alt="Background do App"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthPage;
