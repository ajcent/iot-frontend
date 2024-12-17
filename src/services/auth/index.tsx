import { User } from "../../types/auth";
import api from "../api";

export const login = async () => {
  const credentials = {
    username: "Jaboy",
    password: "123456789",
  };

  const response = await api.post<User>("user/login", credentials);
  return response.data;
};

export const fetchProtectedData = async () => {
  return await api.get("/protected");
};
