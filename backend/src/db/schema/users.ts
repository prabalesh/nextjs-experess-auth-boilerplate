import {
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
    boolean,
} from "drizzle-orm/pg-core";
import { UserRole } from "./roles";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    password: varchar("password", { length: 255 }),
    name: varchar("name", { length: 255 }),
    role: text("role").default(UserRole.USER),
    isVerified: boolean("is_verified").default(false),
    createdAt: timestamp("created_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
