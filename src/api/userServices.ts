import axios from "./axios";
import {
  UpdateProfileCredentials,
  UpdateUserRoleCredentials,
} from "../types/user/credential";
import {
  AllUserResponse,
  LoggedUserResponse,
  UpdateProfileResponse,
  UpdateUserRoleResponse,
} from "../types/user/response";

const getLoggedUserService = async (): Promise<LoggedUserResponse> => {
  const response = await axios.get<LoggedUserResponse>("user");

  return response.data;
};

const getAllUserService = async (): Promise<AllUserResponse> => {
  const response = await axios.get<AllUserResponse>("all-user");

  return response.data;
};

const updateProfileService = async (credentials: UpdateProfileCredentials): Promise<UpdateProfileResponse> => {
  const response = await axios.post<UpdateProfileResponse>(
    "update-profile",
    credentials
  );

  return response.data;
};

const updateUserRoleService = async (credentials: UpdateUserRoleCredentials): Promise<UpdateUserRoleResponse> => {
  const response = await axios.post<UpdateUserRoleResponse>(
    `update-user-role/${credentials.id}`,
    credentials
  );

  return response.data;
};

export default {
  getLoggedUserService,
  getAllUserService,
  updateProfileService,
  updateUserRoleService,
};
