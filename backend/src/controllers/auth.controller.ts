import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { config } from "../config/config";
import { User } from "../db/schema";

export class AuthController {
    constructor(private authService: AuthService) {}

    async getCurrentUser(req: Request, res: Response) {
        try {
            const user = req.user || null;
            if (user) {
                const { id, name, email } = user as User;
                res.json({ id, name, email });
            } else {
                res.status(401).json({ message: "Not authenticated" });
            }
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { email, password, name } = req.body;
            const user = await this.authService.register({
                email,
                password,
                name,
            });
            res.status(201).json(user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
                return;
            }
            res.status(400).json({ msesage: "some error occurred" });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.authService.login(email, password);
            res.json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
                return;
            }
            res.status(400).json({ msesage: "some error occurred" });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            await this.authService.logout(req);
            res.clearCookie("connect.sid"); // Clear session cookie
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error: unknown) {
            res.status(500).json({
                message: "Logout failed",
                error: "internal server error",
            });
        }
    }

    googleCallback(req: Request, res: Response) {
        if (!req.user) {
            return res.redirect(
                `${config.FRONTEND_URL}/login?error=oauth_failed`
            );
        }

        req.login(req.user, (err) => {
            if (err) {
                return res.redirect(
                    `${config.FRONTEND_URL}/login?error=oauth_failed`
                );
            }
            res.redirect(config.FRONTEND_URL);
        });
    }

    githubCallback(req: Request, res: Response) {
        if (!req.user) {
            return res.redirect(
                `${config.FRONTEND_URL}/login?error=oauth_failed`
            );
        }

        req.login(req.user, (err) => {
            if (err) {
                return res.redirect(
                    `${config.FRONTEND_URL}/login?error=oauth_failed`
                );
            }
            res.redirect(config.FRONTEND_URL);
        });
    }
}
