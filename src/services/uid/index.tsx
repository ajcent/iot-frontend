import api from "../api";
import { TResponse } from "@/types/response";

export type UID = {
  uid: string;
  amount: number;
  name: string;
};

export const fetchUIDs = async () => {
  const response = await api.get<TResponse<UID[]>>("uid");
  return response.data;
};

export const deleteUID = async (id: string) => {
  const response = await api.delete<TResponse<UID[]>>(`uid/${id}`);
  return response.data;
};

export const postUID = async (payload: UID) => {
  const response = await api.post<TResponse<UID[]>>("uid", payload);
  return response.data;
};
