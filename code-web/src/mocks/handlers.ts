import { http, HttpResponse } from "msw";
import type { paths } from "@/types/api";

type User = paths["/users"]["get"]["responses"]["200"]["content"]["application/json"][number];

const mockUsers: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin", createdAt: "2025-01-15T00:00:00.000Z" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "editor", createdAt: "2025-02-20T00:00:00.000Z" },
  { id: 3, name: "Charlie Lee", email: "charlie@example.com", role: "viewer", createdAt: "2025-03-10T00:00:00.000Z" },
  { id: 4, name: "Diana Chen", email: "diana@example.com", role: "editor", createdAt: "2025-04-05T00:00:00.000Z" },
  { id: 5, name: "Eve Williams", email: "eve@example.com", role: "viewer", createdAt: "2025-05-01T00:00:00.000Z" },
];

let nextId = 6;

export const handlers = [
  http.get("/api/users", () => {
    return HttpResponse.json([...mockUsers]);
  }),

  http.post("/api/users", async ({ request }) => {
    const body = (await request.json()) as Omit<User, "id" | "createdAt">;
    const user: User = {
      id: nextId++,
      ...body,
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(user);
    return HttpResponse.json(user, { status: 200 });
  }),

  http.put("/api/users/:id", async ({ params, request }) => {
    const id = Number(params.id);
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    const body = (await request.json()) as Omit<User, "id" | "createdAt">;
    mockUsers[index] = { ...mockUsers[index], ...body };
    return HttpResponse.json(mockUsers[index]);
  }),

  http.delete("/api/users/:id", ({ params }) => {
    const id = Number(params.id);
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    mockUsers.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
