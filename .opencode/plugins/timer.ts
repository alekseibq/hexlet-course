import { tool } from "@opencode-ai/plugin/tool";
import type { Plugin } from "@opencode-ai/plugin";

export default (async () => {
  return {
    tool: {
      timer: tool({
        description:
          "Get the current time in a specified UTC offset. Accepts a number (e.g., 3 for UTC+3, -5 for UTC-5).",
        args: {
          utc_offset: tool.schema.number({
            description:
              "UTC offset value (e.g., 3 for UTC+3, -5 for UTC-5, 0 for UTC)",
          }),
        },
        execute: async ({ utc_offset }) => {
          const now = new Date();
          const utcMs =
            now.getTime() + now.getTimezoneOffset() * 60_000;
          const offsetDate = new Date(utcMs + utc_offset * 3_600_000);
          const iso = offsetDate.toISOString().replace("Z", "");
          const sign = utc_offset >= 0 ? "+" : "";
          return `Current time at UTC${sign}${utc_offset}: ${iso}`;
        },
      }),
    },
  };
}) satisfies Plugin;
