import { verify } from "crypto";
import { NextFunction, Request, Response } from "express";
import passport from "../../utils/PassportConfig";
import { ApiResponse } from "../../types/global";

export function LoginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "local",
    (err: Error, user: any, info: Express.AuthInfo) => {
      if (err) return next(err);
      if (!user) return res.status(404).send(info);
      else {
        req.login(user, (err) => {
          if (err) throw err;
          return res.send(req.user);
        });
      }
    }
  )(req, res, next);
}

export function LogoutController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    req.logOut((err) => {
      if (err) return next(err);
    });
    console.log(req.cookies);
    return res
      .status(200)
      .clearCookie("csapSid")
      .json({ status: "Success", message: "session Deleted" });
  } else {
    return res
      .status(404)
      .json({ status: "Failed", message: "User not Found!" });
  }
}

export function GetUser(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    const responseData: ApiResponse = {
      status: "Success",
      message: "current user!",
      data: req.user,
      statusCode: 200,
    };
    return res.status(responseData.statusCode).json(responseData);
  }

  const responseData: ApiResponse = {
    status: "ok",
    message: "User not found!",
    data: [],
    statusCode: 200,
  };
  return res.status(responseData.statusCode).json(responseData);
}
