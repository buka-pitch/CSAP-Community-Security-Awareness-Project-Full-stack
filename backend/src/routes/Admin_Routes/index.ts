import { NextFunction, Request, Response } from "express";
import express from "express";
import { prisma } from "../../utils/PrismaInstanceConfig";
import { ApiResponse } from "../../types/global";

const router = express.Router();
router.route("/").get((req, res, next) => {
  res.json({ message: "hey" });
});
// router
//   .route("/user-count")
//   .get(async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       console.log("inside controller");
//       // const userCount = (await prisma.users.findMany()).length;

//       const response: ApiResponse = {
//         statusCode: 200,
//         message: null,
//         status: "Success",
//         data: {
//           // userCount,
//         },
//       };
//       return res.json(response);
//     } catch (error) {
//       console.log(error);

//       return next(error);
//     }
//   });

export default router;
