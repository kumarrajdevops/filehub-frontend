import api from "./api";
import axios from "axios";

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post(
      "/token",
      new URLSearchParams({ username, password }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
