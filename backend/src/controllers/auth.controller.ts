import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { config } from "../config/config";
import { User } from "../db/schema";
import createHttpError from "http-errors";

export class AuthController {
    constructor(private authService: AuthService) {}

    async getCurrentUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user || null;
            if (user) {
                const { id, name, email } = user as User;
                res.json({ id, name, email });
            } else {
                next(createHttpError(401, "Not authorized"));
            }
        } catch (error) {
            next(createHttpError(500, "Internal server error"));
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, name } = req.body;
            const user = await this.authService.register({
                email,
                password,
                name,
            });
            res.status(201).json(user);
        } catch (error: unknown) {
            next(createHttpError(500, "Something went wrong"));
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await this.authService.login(email, password);
            res.json(user);
        } catch (error) {
            next(createHttpError(500, "Something went wrong"));
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            await this.authService.logout(req);
            res.clearCookie("connect.sid"); // Clear session cookie
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error: unknown) {
            next(createHttpError(500, "Something went wrong"));
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
