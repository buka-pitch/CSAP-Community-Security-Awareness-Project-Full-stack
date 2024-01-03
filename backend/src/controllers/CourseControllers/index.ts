import { NextFunction, Request, Response, response } from "express";
import prisma from "../../utils/PrismaInstanceConfig";
import { ApiErrorResponse, ApiResponse } from "../../types/global";
// Controller for getting all courses from db
export async function GetAllCourses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("inside course controller");
    const Courses = await prisma.course.findMany();
    const responseData: ApiResponse = {
      status: "Success",
      statusCode: 200,
      message: "course data",
      data: Courses,
    };
    return res.json(responseData);
  } catch (err) {
    // return the error for the error handler
    return next(err);
  }
}

export async function GetCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.id) {
      const error: ApiErrorResponse = {
        status: "Failed",
        message: "course Id Required !",
      };
      return res.status(400).json(error);
    }
    const courseId = req.params.id;
    const Course = prisma.course
      .findUnique({ where: { id: courseId } })
      .then((course) => {
        if (!course) {
          const responseData = {
            status: "success",
            statusCode: 200,
            message: "no data",
            data: [],
          };
          return res.status(200).json(responseData);
        }
        const responseData = {
          status: "success",
          statusCode: 200,
          message: "Course Data",
          data: course,
        };
        return res.status(200).json(responseData);
      });
  } catch (err) {
    return next(err);
  }
}

export async function CreateCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.body.title && !req.body.description) {
      const course = await prisma.course
        .create({
          data: {
            title: req.body.title,
            description: req.body.description,
          },
        })
        .then((course) => {
          const responseData = {
            status: "success",
            statusCode: 200,
            message: "course created!",
            data: course,
          };
          return res.status(200).json(responseData);
        })
        .catch((err) => {
          return next(err);
        });
    }
  } catch (error) {
    return next(error);
  }
}
export async function UpdateCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.body.id && !req.body.title && !req.body.description) {
      const error: ApiErrorResponse = {
        status: "Failed",
        message: "course Id Required !",
      };
      return res.status(400).json(error);
    }
    const courseId = req.body.id;
    const Course = prisma.course
      .update({
        data: {
          title: req.body.title,
          description: req.body.description,
        },
        where: { id: courseId },
      })
      .then((course) => {
        if (!course) {
          const responseData: ApiResponse = {
            status: "Success",
            statusCode: 200,
            message: "no data",
            data: [],
          };
          return res.status(200).json(responseData);
        }
        const responseData: ApiResponse = {
          status: "Success",
          statusCode: 201,
          message: "Course Updated!",
          data: course,
        };
        return res.status(200).json(responseData);
      });
  } catch (err) {
    return next(err);
  }
}

export async function DeleteCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.id) {
      const error: ApiErrorResponse = {
        status: "Failed",
        message: "course Id Required !",
      };
      return res.status(400).json(error);
    }
    const courseId = req.params.id;
    const Course = await prisma.course.delete({ where: { id: courseId } });
    const responseData: ApiResponse = {
      status: "Success",
      statusCode: 200,
      message: "Course Deleted!",
      data: null,
    };
    return res.status(200).json(responseData);
  } catch (err) {
    return next(err);
  }
}