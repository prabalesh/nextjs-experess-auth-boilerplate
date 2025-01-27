import { Strategy as GithubStrategy } from "passport-github2";
import { eq } from "drizzle-orm";
import { accounts } from "../db/schema/accounts";
import { users } from "../db/schema/users";
import { UserRole } from "../db/schema/roles";
import { config } from "../config/config";

export function createGithubStrategy(db: any) {
    return new GithubStrategy(
        {
            clientID: config.GITHUB_CLIENT_ID!,
            clientSecret: config.GITHUB_CLIENT_SECRET!,
            callbackURL: "/api/auth/github/callback",
            scope: ["user:email"],
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: any,
            done: any
        ) => {
            try {
                const existingAccount = await db.query.accounts.findFirst({
                    where: eq(accounts.providerId, profile.id),
                });

                if (existingAccount) {
                    const user = await db.query.users.findFirst({
                        where: eq(users.id, existingAccount.userId),
                    });
                    return done(null, user);
                }

                const newUser = await db.transaction(async (tx: any) => {
                    const user = await tx
                        .insert(users)
                        .values({
                            email: profile.emails![0].value,
                            name: profile.displayName,
                            role: UserRole.USER,
                            isVerified: true,
                        })
                        .returning();

                    await tx.insert(accounts).values({
                        userId: user[0].id,
                        provider: "github",
                        providerId: profile.id,
                        accessToken,
                        refreshToken,
                    });

                    return user[0];
                });

                return done(null, newUser);
            } catch (error) {
                return done(error);
            }
        }
    );
}
