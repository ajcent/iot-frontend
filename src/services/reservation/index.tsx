import api from "../api";
import { TResponse } from "@/types/response";

export type Reservation = {
  id: number;
  slot: number;
  name: string;
  is_occupied: boolean;
};

export const fetchReservations = async () => {
  const response = await api.get<TResponse<Reservation[]>>("reservation");
  return response.data;
};
