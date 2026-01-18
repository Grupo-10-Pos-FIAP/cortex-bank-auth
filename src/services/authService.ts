const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
const REDIRECT_URL =
  process.env.REACT_APP_REDIRECT_URL || "http://localhost:3000/dashboard";

export const loginUser = async (email: string, password: string) => {
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

  const data = await response.json();

  if (!data.result || !data.result.token) {
    throw new Error("Login failed: Invalid response");
  }

  const token = data.result.token;
  localStorage.setItem("token", token);
  window.location.href = REDIRECT_URL;

  return { token, message: data.message };
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

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
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao criar conta");
  }

  const data = await response.json();
  return { message: data.message || "Conta criada com sucesso" };
};
