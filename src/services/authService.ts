import api from "./api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  [key: string]: number | string;
}

const TOKEN_KEY = "token";

// Save token to localStorage
const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Get stored token
const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove token on logout
const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/login"; // Redirect on logout
};

// Check if user is authenticated
const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // Check token expiration
  } catch {
    return false;
  }
};

// Login function
const login = async (username: string, password: string) => {
  try {
    const { data } = await api.post(
      "/token",
      new URLSearchParams({ username, password }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    setToken(data.access_token);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("Login failed. Please check your credentials.");
  }
};

export { login, logout, isAuthenticated, getToken };
