import axios from "./axios";

import {
  RegisterCredentials,
  LoginCredentials,
} from "../types/authentication/credential";

import {
  RegisterResponse,
  LoginResponse,
  LogoutResponse,
} from "../types/authentication/response";

const registerUserService = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>("register", credentials);

  return response.data;
};

const loginUserService = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("login", credentials);

  return response.data;
};

const logoutUserService = async (): Promise<LogoutResponse> => {
  const response = await axios.get<LogoutResponse>("logout");

  return response.data;
};

export default { registerUserService, loginUserService, logoutUserService };
