export interface TResponse<T> {
  code?: number | string;
  data?: T;
  success: boolean;
}
