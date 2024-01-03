import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import passport from "../utils/PassportConfig";
import prisma from "../utils/PrismaInstanceConfig";
import { Users } from "@prisma/client";
import { ApiErrorResponse } from "../types/global";

export async function AccessChecker(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.user);
    if (!req.isAuthenticated()) {
      passport.authenticate(
        "local",
        (err: Error, user: Users, info: Express.AuthInfo, status: number) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          if (!user) {
            return res.redirect(301, "/login");
          }
        }
      )(req, res, next);
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

export function AdminAcessChecker(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // @ts-ignore
  const { Role } = req.user;
  if (req.isAuthenticated() && Role === "ADMIN") {
    return next();
  } else {
    const responseData: ApiErrorResponse = {
      status: "Failed",
      message: "Unauthorized!",
    };

    return res.status(403).json(responseData);
  }
}
