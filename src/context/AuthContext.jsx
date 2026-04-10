import { createContext, useState, useEffect } from "react";
import apiClient from "../api/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    const { accessToken, refreshToken } = response.data.data;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const userPayload = parseJwt(accessToken);

    const userResponse = await fetchCurrentUser(userPayload.sub);

    const userData = {
      email: userResponse.email,
      username: userResponse.username,
      role: userResponse.roleName,
      id: userResponse.id,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    return userData;
  };

  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const isAuthenticated = !!user;
  const role = user?.role || null;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, role, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return {};
  }
}

async function fetchCurrentUser(email) {
  const response = await apiClient.get("/api/users", {
    params: { page: 0, size: 100 },
  });

  const users = response.data.data.content;
  const currentUser = users.find((u) => u.email === email);

  if (!currentUser) {
    throw new Error("Current user not found");
  }

  return currentUser;
}
