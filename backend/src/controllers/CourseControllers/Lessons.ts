import { NextFunction, Request, Response } from "express";
import prisma from "../../utils/PrismaInstanceConfig";
import { ApiErrorResponse, ApiResponse } from "../../types/global";
import { error } from "console";

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
export function GetLesson(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.params.lessonId) throw new Error("lesson title is Required");
    const { lessonId } = req.params;
    prisma.lesson
      .findUnique({
        where: {
          id: lessonId,
        },
      })
      .then((lesson) => {
        let response: ApiResponse = {
          data: lesson,
          message: "lesson",
          status: "Success",
          statusCode: 200,
        };
        return res.status(200).json(response);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("Lesson Not Dound");
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

export async function CreateLesson(
  req: Request,
  res: Response,
  next: NextFunction
) {}

export async function CreateQuestion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {
    return next(error);
  }
}
export async function GetFirstQuestion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.lessonId) throw new Error("lesson Id is Required!");

    const { lessonId } = req.params;
    const questions = await prisma.question.findFirst({
      where: {
        lessonId: lessonId,
      },
    });

    if (!questions) {
      const response: ApiErrorResponse = {
        message: "NotFound",
        status: "NotFound",
      };
      return res.status(404).json(response);
    }
    if (questions) {
      const response: ApiResponse = {
        data: questions,
        message: "lesson Questions",
        status: "Success",
        statusCode: 200,
      };
      return res.status(response.statusCode).json(response);
    }
  } catch (error) {
    return next(error);
  }
}
export async function GetQuestions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.lessonId) throw new Error("lesson Id is Required!");

    const { lessonId } = req.params;
    const questions = await prisma.question.findMany({
      where: {
        lessonId: lessonId,
      },
    });

    if (!questions) {
      const response: ApiErrorResponse = {
        message: "NotFound",
        status: "NotFound",
      };
      return res.status(404).json(response);
    }
    if (questions) {
      const response: ApiResponse = {
        data: questions,
        message: "lesson Questions",
        status: "Success",
        statusCode: 200,
      };
      return res.status(response.statusCode).json(response);
    }
  } catch (error) {
    return next(error);
  }
}

export async function CheckQuestionAnswer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.body.answer || !req.body.userId || !req.body.questionId) {
      console.log(req.body.answer, req.body.userId, req.body.questionId);
      throw new Error("Required Field Missing");
    }

    const { answer, questionId, userId } = req.body;

    const question = await prisma.question
      .findUnique({
        where: {
          id: questionId,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });

    if (!question) throw new Error("Question NotFound");

    const response: ApiResponse = {
      data: { correct: question.answer === answer },
      message: "question answer",
      status: "Success",
      statusCode: 200,
    };

    return res.status(response.statusCode).json(response);
  } catch (error) {
    return next(error);
  }
}
