const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL || "http://localhost:3000/dashboard";

interface LoginResponse {
  result?: {
    token: string;
  };
  message?: string;
}

interface JWTPayload {
  username?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }
    const payload = parts[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const decoded = atob(padded);
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
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

export const loginUser = async (email: string, password: string): Promise<LoginResult> => {
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
    let errorMessage = "Erro ao fazer login";
    try {
      const errorData: { message?: string } = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      if (response.status === 401) {
        errorMessage = "Credenciais inválidas";
      } else if (response.status === 400) {
        errorMessage = "Email e senha são obrigatórios";
      } else if (response.status >= 500) {
        errorMessage = "Erro no servidor. Tente novamente mais tarde";
      }
    }
    throw new Error(errorMessage);
  }

  const data: LoginResponse = await response.json();

  if (!data.result || !data.result.token) {
    throw new Error(data.message || "Resposta inválida do servidor: token não encontrado");
  }

  const token = data.result.token;
  localStorage.setItem("token", token);

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

  if (username) {
    localStorage.setItem("userName", username);
  }

  return { message: data.message || "Conta criada com sucesso" };
};
