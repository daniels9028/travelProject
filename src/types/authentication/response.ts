export interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  profilePictureUrl: string;
  phoneNumber: string;
}

export type ApiResponse<T = null, U extends Record<string, unknown> = {}> = {
  code: number;
  status: string;
  message: string;
  data?: T;
} & U;

export type RegisterResponse = ApiResponse<User>;

export type LoginResponse = ApiResponse<User, { token: string }>;

export type LogoutResponse = ApiResponse;
