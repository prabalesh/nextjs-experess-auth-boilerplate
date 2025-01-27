import dotenv from "dotenv";

dotenv.config();

const _config = {
    PORT: process.env.PORT || 3000,
    FRONTEND_URL: process.env.FRONTEND_URL || "",
    DATABASE_URL: process.env.DATABASE_URL || "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || "",
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || "",
    SESSION_SECRET: process.env.SESSION_SECRET || "randomsecret",
    REDIS_URI: process.env.REDIS_URI || "redis://default:@127.0.0.1:6379",
};

export const config = Object.freeze(_config);
