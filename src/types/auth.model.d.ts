export interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}
