import { Router } from "express";
import {
  CreateCourse,
  DeleteCourse,
  GetAllCourses,
  GetCourse,
  UpdateCourse,
} from "../../controllers/CourseControllers";

const router = Router();

router.route("/").get(GetAllCourses);
router
  .route("/:id")
  .get(GetCourse)
  .post(CreateCourse)
  .delete(DeleteCourse)
  .patch(UpdateCourse);

// router.route('/:id/certificate').get();

// router.route('/id:/lessons').get();
// router.route('/:id/lessons/:lessonId').get();
export default router;
