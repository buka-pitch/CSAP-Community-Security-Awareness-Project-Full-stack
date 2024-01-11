import { NextFunction, Request, Response } from "express";
import prisma from "../../utils/PrismaInstanceConfig";
import { ApiResponse } from "../../types/global";

export function GetLessons(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.params.courseId) throw new Error("Course Id is Required");
    const { courseId } = req.params;
    prisma.lesson
      .findMany({
        where: {
          courseId: courseId,
        },
      })
      .then((lessons) => {
        let response: ApiResponse = {
          data: lessons,
          message: "lessons",
          status: "Success",
          statusCode: 200,
        };
        return res.status(200).json(response);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("Something Went Wrong!");
      });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

export function SaveCurrentLessonState(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("user", req.user);
    if (
      !req.body.currentLesson ||
      !req.body.courseId ||
      !req.body.userId ||
      !req.user
    )
      throw new Error("Invalid Required state");
    const { currentLesson, courseId, userId } = req.body;

    prisma.users
      .findFirst({ where: { id: userId } })
      .then((user) => {
        if (!user) throw new Error("No User Found!");

        prisma.users
          .update({
            where: { id: user.id },
            data: {
              data: {
                currentLesson: { courseId, currentLesson },
              },
            },
          })
          .then((user) => {
            const response: ApiResponse = {
              data: user,
              message: "user state saved",
              status: "Success",
              statusCode: 200,
            };
            return res.status(200).json(response);
          })
          .catch((err) => {
            console.log(err);
            throw new Error("SomeThing Went Wrong!");
          });
      })
      .catch((err) => {
        console.log(err);
        throw new Error("Something Went Wrong!");
      });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}
