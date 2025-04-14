export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  error?: string;
}

export interface LoginInput {
  username: string;
  password: string;
} 