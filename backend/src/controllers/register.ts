import { verify } from "crypto";
import { NextFunction, Request, Response } from "express";
import prisma from "../utils/PrismaInstanceConfig";
import bcrypt from "bcrypt";
import { ApiResponse } from "../types/global";

export function RegistrationController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body.Name && req.body.Email && req.body.Password) {
    const hash = bcrypt.hashSync(req.body.Password, 10);
    prisma.users
      .create({
        data: {
          Name: req.body.Email,
          Email: req.body.Email,
          Password: hash,
        },
      })
      .then((user) => {
        if (user) {
          const response: ApiResponse = {
            status: "Success",
            statusCode: 201,
            message: "Account Created Successfuly",
            data: user,
          };
          return res.status(response.statusCode).json(response);
        }
      })
      .catch((err) => {
        return next(err);
      });
  }
}
