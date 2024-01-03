import passport, { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "../PrismaInstanceConfig";
import bcrypt from "bcrypt";
import { $Enums } from "@prisma/client";

type info = {
  message: string;
};
interface User extends Express.User {
  id: string;
  Role: $Enums.UserRole;
  Name: string;
  Email: string;
  Emailverified: Boolean;

  Rateing: number | null;
  chatId: number | null;
  createdAt: Date;
  updatedAt: Date;
  data: object | null;
}

const SALT = 10;
passport.use(
  new LocalStrategy(function verify(
    username: string,
    password: string,
    done: CallableFunction
  ) {
    prisma.users
      .findUnique({ where: { Email: username } })
      .then(async (user) => {
        if (!user) {
          return done(null, false, {
            message: "Incorrect Email or Password!.",
          });
        }

        bcrypt.compare(password, user.Password!, (err, isCorrect) => {
          if (err) throw err;
          if (isCorrect) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Incorrect Email or Password!.",
            });
          }
        });
      });
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.users.findFirst({ where: { id: id } });
    if (user !== null) {
      const { Password, ...data } = user;
      done(null, data);
    }
  } catch (error) {
    done(error);
  }
});

export default passport;
