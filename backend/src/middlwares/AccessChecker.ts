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
    if (req.user) {
      return next();
    } else {
      const response: ApiErrorResponse = {
        message: "Unauthorized",
        status: "Failed",
      };
      return res.status(403).json(response);
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
