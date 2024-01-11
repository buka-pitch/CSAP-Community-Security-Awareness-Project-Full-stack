import express, { Application, NextFunction, Request, Response } from "express";
import { ApiResponse, ApiErrorResponse } from "./types/global";
import AuthRoute from "./routes/Auth_Routes";
import CourseRoute from "./routes/Course_Routes";
import AdminRoute from "./routes/Admin_Routes";
import passport from "./utils/PassportConfig";
import expressSession, { Cookie } from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./utils/PrismaInstanceConfig";
import { PrismaClient } from "@prisma/client";
import { AccessChecker, AdminAcessChecker } from "./middlwares/AccessChecker";

import cors from "cors";
// import multer from 'multer';
// import "./utils/PassportConfig";
const app: Application = express();
const PORT = process.env.PORT || 5000;
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "localhost:5173"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(
  expressSession({
    cookie: {
      sameSite: true,
      secure: false,
      maxAge: 3600000, // ms
    },
    name: "csapSid",
    secret: "a santa at nasa",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 7 * 24 * 60, //ms
      dbRecordIdIsSessionId: true,
      ttl: 3600000,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/auth", AuthRoute);
app.use(AccessChecker);
app.use("/course", CourseRoute);
app.use(AdminAcessChecker);
app.use("/admin", AdminRoute);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    const errorData: ApiErrorResponse = {
      status: "Failed",
      message: error.message,
    };
    return res.status(400).json(errorData);
  }
});

app.listen(PORT, () => {
  console.log("server running on http://localhost:" + PORT);
});
