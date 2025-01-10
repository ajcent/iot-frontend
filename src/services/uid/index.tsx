import api from "../api";
import { TResponse } from "@/types/response";

export type UID = {
  uid: string;
  amount: number;
  name: string;
  plate_number: string;
};

export type PostUID = {
  plate_number: string;
  amount: number;
  name: string;
};

export const fetchAllUIDs = async () => {
  const response = await api.get<TResponse<UID[]>>("uid");
  return response.data;
};

export const fetchUID = async (uid: string) => {
  const response = await api.get<TResponse<UID>>(`uid/${uid}`);
  return response.data;
};

export const deleteUID = async (id: string) => {
  const response = await api.delete<TResponse<UID[]>>(`uid/${id}`);
  return response.data;
};

export const postUID = async (payload: PostUID) => {
  const response = await api.post<TResponse<UID[]>>("uid", payload);
  return response.data;
};
