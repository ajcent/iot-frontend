import { LoginFormInputs } from "@/pages/login";
import { User } from "../../types/auth";
import api from "../api";

export const login = async (data: LoginFormInputs) => {
  const credentials = {
    username: data.username,
    password: data.password,
  };

  const response = await api.post<User>("user/login", credentials);
  return response.data;
};

export const fetchProtectedData = async () => {
  return await api.get("/protected");
};
