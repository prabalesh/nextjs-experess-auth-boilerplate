import { Request, Response, NextFunction } from "express";
import { UserRole } from "../db/schema/roles";

export class AuthMiddleware {
    static isAuthenticated(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({ message: "Unauthorized" });
    }

    static hasRole(roles: UserRole[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const userRole = (req.user as any).role;
            if (roles.includes(userRole)) {
                return next();
            }

            res.status(403).json({ message: "Forbidden" });
        };
    }
}
