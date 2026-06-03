import type { paths } from "@/types/api";

type User = paths["/users"]["get"]["responses"]["200"]["content"]["application/json"][number];
type UserFormData = paths["/users"]["post"]["requestBody"]["content"]["application/json"];

const BASE = "/api/users";

export const usersApi = {
  async getAll(): Promise<User[]> {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },

  async create(data: UserFormData): Promise<User> {
    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create user");
    return res.json();
  },

  async update(id: number, data: UserFormData): Promise<User> {
    const res = await fetch(`${BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete user");
  },
};
