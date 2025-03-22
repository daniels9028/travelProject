export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePictureUrl: string;
  phoneNumber: string;
}

export interface ApiResponse<T = null> {
  code: number;
  status: string;
  message: string;
  data?: T;
}

export type LoggedUserResponse = ApiResponse<User>;

export type AllUserResponse = ApiResponse<User[]>;

export type UpdateProfileResponse = ApiResponse;

export type UpdateUserRoleResponse = ApiResponse;
