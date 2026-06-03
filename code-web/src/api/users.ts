import type { User, UserFormData } from "@/types/user";

const mockUsers: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin", createdAt: "2025-01-15" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "editor", createdAt: "2025-02-20" },
  { id: 3, name: "Charlie Lee", email: "charlie@example.com", role: "viewer", createdAt: "2025-03-10" },
  { id: 4, name: "Diana Chen", email: "diana@example.com", role: "editor", createdAt: "2025-04-05" },
  { id: 5, name: "Eve Williams", email: "eve@example.com", role: "viewer", createdAt: "2025-05-01" },
];

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 300));
}

let nextId = 6;

export const usersApi = {
  async getAll(): Promise<User[]> {
    await delay();
    return [...mockUsers];
  },

  async create(data: UserFormData): Promise<User> {
    await delay();
    const user: User = {
      id: nextId++,
      ...data,
      createdAt: new Date().toISOString().split("T")[0],
    };
    mockUsers.push(user);
    return user;
  },

  async update(id: number, data: UserFormData): Promise<User> {
    await delay();
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("User not found");
    mockUsers[index] = { ...mockUsers[index], ...data };
    return mockUsers[index];
  },

  async delete(id: number): Promise<void> {
    await delay();
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("User not found");
    mockUsers.splice(index, 1);
  },
};
