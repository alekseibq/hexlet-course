export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt: string;
}

export type UserFormData = {
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
};
