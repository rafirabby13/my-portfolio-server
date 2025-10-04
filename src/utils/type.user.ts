export interface CreateUserPayload {
  name: string;
  email: string;
  password?: string; // optional if user can be created without password
  phone: string;
  image?: string;    // optional
}
export interface LoginUserPayload {

  email: string;
  password?: string;
}
export interface CreatePostPayload {
  title: string;
  description?: string;   // full article body
  date: string;       // ISO string (e.g., new Date().toISOString())
  readTime?: string;
  category: string;
  tags: string[];     // array of strings
  image?: string;
  slug: string;       // unique identifier for the blog
  authorId: number;   // required, foreign key linking to User
}
