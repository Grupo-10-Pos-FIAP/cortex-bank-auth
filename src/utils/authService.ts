const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
const USE_MOCK = false;
const REDIRECT_URL =
  process.env.REACT_APP_REDIRECT_URL || "http://localhost:3000/dashboard";

export const loginUser = async (email: string, password: string) => {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockResponse = {
      message: "Usuário autenticado com sucesso",
      result: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvcnRleC1hZG1pbiIsImVtYWlsIjoiY29ydGV4YmFuay5jb250YXRvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWQiOiI2OTVkNzYyZTIwMDk0MGI2ZjJmYTQ3ZWYiLCJpYXQiOjE3Njc3MzI4ODUsImV4cCI6MTc2Nzc3NjA4NX0.xuG5hIdJ-5_BnhveFa0V9g_vAM-o8l7o8enghc7Wvg0",
      },
    };

    const token = mockResponse.result.token;
    localStorage.setItem("token", token);
    window.location.href = REDIRECT_URL;

    return { token, message: mockResponse.message };
  }

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
