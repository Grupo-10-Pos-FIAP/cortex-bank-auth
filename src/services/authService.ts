const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
const REDIRECT_URL =
  process.env.REACT_APP_REDIRECT_URL || "http://localhost:3000/dashboard";

interface LoginResponse {
  result?: {
    token: string;
  };
  message?: string;
}

// Função utilitária para decodificar o payload do JWT (sem verificar assinatura)
const decodeJWT = (token: string): any => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    // Decodifica o payload (segunda parte do JWT)
    const payload = parts[1];
    // Converte de base64url para base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    // Adiciona padding se necessário
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    // Decodifica
    const decoded = atob(padded);
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};

interface RegisterResponse {
  message?: string;
}

export interface LoginResult {
  token: string;
  message?: string;
}

export interface RegisterResult {
  message: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  const response = await fetch(`${API_URL}/user/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data: LoginResponse = await response.json();

  if (!data.result || !data.result.token) {
    throw new Error("Login failed: Invalid response");
  }

  const token = data.result.token;
  localStorage.setItem("token", token);
  
  // Extrair e salvar username do token
  const decoded = decodeJWT(token);
  if (decoded?.username) {
    localStorage.setItem("userName", decoded.username);
  }
  
  window.location.href = REDIRECT_URL;

  return { token, message: data.message };
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<RegisterResult> => {
  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (!response.ok) {
    const errorData: { message?: string } = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao criar conta");
  }

  const data: RegisterResponse = await response.json();
  
  // Salvar username no localStorage após registro bem-sucedido
  if (username) {
    localStorage.setItem("userName", username);
  }
  
  return { message: data.message || "Conta criada com sucesso" };
};
