import { defineConfig } from "drizzle-kit";
import { config } from "./src/config/config";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema/index.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: config.DATABASE_URL!,
    },
});
