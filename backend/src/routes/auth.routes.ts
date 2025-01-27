import express from "express";
import passport from "passport";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";

export function createAuthRoutes(db: any) {
    const router = express.Router();
    const authService = new AuthService(db);
    const authController = new AuthController(authService);

    router.get("/me", authController.getCurrentUser.bind(authController));
    router.post("/register", authController.register.bind(authController));
    router.post("/login", authController.login.bind(authController));
    router.post("/logout", authController.logout.bind(authController));

    // Google OAuth routes
    router.get(
        "/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
    );
    router.get(
        "/google/callback",
        passport.authenticate("google", { failureRedirect: "/login" }),
        authController.googleCallback.bind(authController)
    );

    router.get(
        "/github",
        passport.authenticate("github", { scope: ["user:email"] })
    );
    router.get(
        "/github/callback",
        passport.authenticate("github", { failureRedirect: "/login" }),
        authController.githubCallback.bind(authController)
    );
    return router;
}
