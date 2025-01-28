import { HttpError } from "http-errors";
import { config } from "../config/config";
import { Request, Response, NextFunction } from "express";

const globalErrorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;

    if (config.ENV == "development") {
        return res.status(statusCode).json({
            errorStack: err.stack,
        });
    }

    return res.status(statusCode).json({
        message: err.message,
    });
};

export default globalErrorHandler;
