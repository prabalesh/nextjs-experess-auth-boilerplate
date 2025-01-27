import passport from "passport";
import { eq } from "drizzle-orm";
import { createGoogleStrategy } from "../strategies/google.strategy";
import { createGithubStrategy } from "../strategies/github.strategy";
import { createLocalStrategy } from "../strategies/local.strategy";
import { users } from "../db/schema/users";

export function configurePassport(db: any) {
    // Add strategies
    passport.use(createGoogleStrategy(db));
    passport.use(createGithubStrategy(db));
    passport.use(createLocalStrategy(db));

    // Serialize and deserialize user
    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
        try {
            const [user] = await db
                .select()
                .from(users)
                .where(eq(users.id, Number(id)))
                .limit(1);

            done(null, user || null);
        } catch (error) {
            done(error);
        }
    });
}
