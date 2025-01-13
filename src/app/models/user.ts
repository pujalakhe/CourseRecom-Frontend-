export interface User {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  phone_number?: string;
}
export interface UserResponse {
  message: string;
  user: User;
}
