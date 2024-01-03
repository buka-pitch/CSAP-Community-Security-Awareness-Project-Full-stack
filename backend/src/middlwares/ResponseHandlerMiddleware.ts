import { ApiResponse } from "../types/global";
import { Request, Response, NextFunction } from 'express';



export function ResponseHandler(response: ApiResponse) {
    // Response handler to format all api responses
    return (req: Request, res: Response, next: NextFunction) => {
        try {

            const { message, data, statusCode, status } = response;
            return res.status(statusCode).json({ status, statusCode, message, data });
        } catch (err) {
            return next(err);
        }
    }
}