import express, { NextFunction, Request, Response } from "express";
import nodemailer from "nodemailer";
import { randomBytes, randomUUID, sign, Sign } from "crypto";
import { ApiErrorResponse, ApiResponse } from "../../types/global";
import { prisma } from "../../utils/PrismaInstanceConfig";
import dotenv from "dotenv";
dotenv.config();

export async function GenerateAndSendOtp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.query.userId && req.query.email) {
      const { userId, email } = req.query;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        // host: "smtp.gmail.com",
        // port: 465,
        // secure: true,
        auth: {
          user: process.env.MAILUSER,
          pass: process.env.MAILPASS,
        },
      });
      const OTP = randomUUID() + "#" + userId;
      let msg = await transporter.sendMail({
        from: "csap (community security awareness program)",
        to: email.toString(),
        subject: "CSAP Account OTP",
        text: "OTP",
        html: `<h3>Join the csap Squad  and Start Learning & Power Up your knowladge on your Security</h3><b>your OTP code </b><code>${process.env.BASEURL}/auth/new-user-activation/otp/${OTP}</code>`,
      });
      console.log(msg.accepted);
      console.log("otp", OTP);
      let response: ApiResponse = {
        message:
          "verification Otp has been sent to your email Please Verify your account to continue",
        status: "Success",
        statusCode: 200,
        data: null,
      };

      const otps = await prisma.activation
        .create({
          data: { link: OTP, expired: false },
        })
        .catch((err) => {
          throw new Error("can not process otp try again !");
        });
      return res.json(response);
    } else {
      let response: ApiErrorResponse = {
        message: "Email and UserId is required to request activation!",
        status: "Failed",
      };
      return res.status(400).json(response);
    }
  } catch (err) {
    console.log(err);
    return next(err);
  }
}

export async function veryifyOtp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.params.otp) {
      let otplink = await prisma.activation
        .findUnique({
          where: { link: req.params.otp },
        })
        .catch((err) => {
          throw new Error("Something went wrong please try again!");
        });
      const CreatedAt = new Date(otplink?.createdAt!);
      const expirationDate = new Date(
        otplink?.createdAt?.getTime()! + 5 * 60000
      );
      const current = new Date();
      if (req.params.otp !== otplink?.link || otplink.expired)
        throw new Error(
          "Verification Otp NotFound Or Expired Please request a new one!"
        );
      if (current < expirationDate) {
        const user = await prisma.users
          .update({
            where: {
              id: otplink?.link.split("#")[1].toString(),
            },
            data: {
              Emailverified: true,
            },
          })
          .catch((err) => {
            console.log(err);
            throw new Error("Something went wrong! try again");
          });
        const response: ApiResponse = {
          message: "Account Activated",
          status: "Success",
          data: null,
          statusCode: 200,
        };
        return res.status(200).json(response);
      } else {
        const response: ApiErrorResponse = {
          message:
            "Expired Otp please request another one if your account is not Activated yet !",
          status: "Failed",
        };

        return res.status(400).json(response);
      }
    }
  } catch (error) {
    return next(error);
  }
}

// export function ResetPassword(){

// }
