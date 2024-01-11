import { NextFunction, Request, Response } from "express";
import prisma from "../../utils/PrismaInstanceConfig";
import bcrypt from "bcrypt";
import { ApiResponse, ApiErrorResponse } from "../../types/global";

export async function RegistrationController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body.Name && req.body.Email && req.body.Password) {
    prisma.users
      .findUnique({
        where: { Email: req.body.Email },
      })
      .then((user) => {
        if (user) {
          const response: ApiErrorResponse = {
            message: "User With this email already Exists!",
            status: "Failed",
          };
          return res.status(400).json(response);
        } else {
          const hash = bcrypt.hashSync(req.body.Password, 10);
          prisma.users
            .create({
              data: {
                Name: req.body.Name,
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
              const response: ApiErrorResponse = {
                message: "Something went Wrong try again later!",
                status: "Failed",
              };
              console.log(response);
              // return res.status(400).json(response);
              return next(err);
            });
        }
      });
  }
}
