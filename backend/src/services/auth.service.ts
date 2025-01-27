import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { users } from "../db/schema/users";
import { UserRole } from "../db/schema/roles";

export class AuthService {
    constructor(private db: any) {}

    async register(userData: {
        email: string;
        password: string;
        name?: string;
    }) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        return this.db.transaction(async (tx: any) => {
            const user = await tx
                .insert(users)
                .values({
                    email: userData.email,
                    password: hashedPassword,
                    name: userData.name,
                    role: UserRole.USER,
                })
                .returning();

            return user[0];
        });
    }

    async login(email: string, password: string) {
        const user = await this.db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password || "");
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        return user;
    }

    async logout(req: any): Promise<void> {
        return new Promise((resolve, reject) => {
            req.logout((err: Error) => {
                if (err) {
                    return reject(err);
                }
                req.session.destroy((destroyErr: Error) => {
                    if (destroyErr) {
                        return reject(destroyErr);
                    }
                    resolve();
                });
            });
        });
    }
}
