export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number?: string;
}
export interface JwtToken {
  access: string;
  refresh: string;
}
export interface UserResponse {
  message: string;
  user: User;
  tokens: JwtToken;
}
export interface AuthData {
  tokens: JwtToken;
  user: any;
}
