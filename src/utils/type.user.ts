export interface CreateUserPayload {
  name: string;
  email: string;
  password?: string; // optional if user can be created without password
  phone: string;
  image?: string;    // optional
}