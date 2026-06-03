import "@typespec/http";
import "@typespec/rest";

using TypeSpec.Http;
using TypeSpec.Rest;

@server("/api", "Development server")
@service(#{
  title: "Hexlet Course API",
})
namespace Api {
  model User {
    id: int32;
    name: string;
    email: string;
    role: "admin" | "editor" | "viewer";
    createdAt: utcDateTime;
  }

  model UserFormData {
    @minLength(1)
    @maxLength(100)
    name: string;
    @minLength(1)
    email: string;
    role: "admin" | "editor" | "viewer";
  }

  @route("users")
  interface Users {
    list(): User[];

    create(...UserFormData): User;

    @route("{id}")
    @put
    update(@path id: int32, ...UserFormData): User;

    @route("{id}")
    @delete
    delete(@path id: int32): void;
  }
}
