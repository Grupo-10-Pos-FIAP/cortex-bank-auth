const API_URL = "http://localhost:3010";

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(
    `${API_URL}/users?email=${email}&password=${password}`
  );
  const users = await response.json();

  if (!users.length) {
    throw new Error("Login failed");
  }

  // Simula token
  const token = btoa(`${email}:${password}`);
  localStorage.setItem("token", token);
  return { token, user: users[0] };
};

