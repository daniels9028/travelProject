export interface UpdateProfileCredentials {
  name: string;
  email: string;
  profilePictureUrl: string;
  phoneNumber: string;
}

export interface UpdateUserRoleCredentials {
  id: string;
  role: string;
}
