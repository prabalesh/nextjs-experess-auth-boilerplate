import express from "express";
import passport from "passport";
import session from "express-session";
import { db } from "./db";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
import { createAuthRoutes } from "./routes/auth.routes";
import { configurePassport } from "./config/passport";
import { config } from "./config/config";

const app = express();

// Initialize client.
let redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
});

// Express session middleware with Redis
app.use(
    session({
        name: "session._id",
        store: redisStore,
        secret: config.SESSION_SECRET || "default_secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

// json
app.use(express.json());

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport strategies
configurePassport(db);

// Authentication routes
app.use("/api/auth", createAuthRoutes(db));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
