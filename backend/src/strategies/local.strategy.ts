import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { users } from "../db/schema/users";

export function createLocalStrategy(db: any) {
    return new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = await db.query.users.findFirst({
                    where: eq(users.email, email),
                });

                let isMatch = false;
                if (user) {
                    isMatch = await bcrypt.compare(
                        password,
                        user.password || ""
                    );
                }
                if (!isMatch) {
                    return done(null, false, {
                        message: "Incorrect credentials.",
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    );
}
