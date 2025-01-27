import { Request, Response } from "express";
import { User } from "../db/schema";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
