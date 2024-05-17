import { User } from "../../entities";

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  error: boolean;
  result: T;
}

export interface SignInResponse {
  token: string;
  user: User;
}

export interface SignInDto {
  email: string;
  password: string;
}