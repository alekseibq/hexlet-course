import { readFileSync, writeFileSync } from "fs";

const filePath = process.argv[2];
let content = readFileSync(filePath, "utf-8");

content = content.replace(/import .+ from "@zodios\/core";\n/, "");
content = content.replace(/\nconst endpoints = makeApi\([\s\S]*/, "");

// Export schemas individually
content = content
  .replace(/\nexport const schemas = \{[^}]+};/, "")
  .replace(/^const (User|UserFormData) /gm, "export const $1 ");

writeFileSync(filePath, content);
