export interface Response<T | null> {
  status: boolean;
  message?: string;
  data?: T;
}
