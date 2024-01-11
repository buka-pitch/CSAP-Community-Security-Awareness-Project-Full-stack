import express from "express";
import {
  CreateCourse,
  DeleteCourse,
  GetAllCourses,
  GetCourse,
  GetFeaturedCourse,
  UpdateCourse,
} from "../../controllers/CourseControllers";
import {
  GetLessons,
  SaveCurrentLessonState,
} from "../../controllers/CourseControllers/Lessons";

const router = express.Router();

router.route("/").get(GetAllCourses).post(CreateCourse);
router.route("/featured").get(GetFeaturedCourse);
router.route("/:title").get(GetCourse).delete(DeleteCourse).patch(UpdateCourse);
router.route("/lessons/:courseId").get(GetLessons);
router.route("/save-user-lesson-data").post(SaveCurrentLessonState);

// router.route('/:id/certificate').get();

// router.route('/id:/lessons').get();
// router.route('/:id/lessons/:lessonId').get();
export default router;
