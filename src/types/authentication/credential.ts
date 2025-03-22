export interface RegisterCredentials {
  email: string;
  name: string;
  password: string;
  passwordRepeat: string;
  role: string;
  profilePictureUrl: string;
  phoneNumber: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
