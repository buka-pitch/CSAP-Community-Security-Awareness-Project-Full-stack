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
  CheckQuestionAnswer,
  GetFirstQuestion,
  GetLesson,
  GetLessons,
  GetQuestions,
  SaveCurrentLessonState,
} from "../../controllers/CourseControllers/Lessons";
import { CertificateController } from "../../controllers/CourseControllers/Certificate";

const router = express.Router();

router.route("/").get(GetAllCourses).post(CreateCourse);
router.route("/lesson/certificate").post(CertificateController);
router.route("/featured").get(GetFeaturedCourse);
router.route("/:title").get(GetCourse).delete(DeleteCourse).patch(UpdateCourse);
router.route("/lessons/:courseId").get(GetLessons);
router.route("/lesson/:lessonId").get(GetLesson);
router.route("/lesson/quiz/:lessonId/first").get(GetFirstQuestion);
router.route("/lesson/quiz/:lessonId").get(GetQuestions);
router.route("/lesson/quiz/:lessonId/answer").post(CheckQuestionAnswer);
router.route("/save-user-lesson-data").post(SaveCurrentLessonState);
// router.route('/:id/certificate').get();

// router.route('/id:/lessons').get();
// router.route('/:id/lessons/:lessonId').get();
export default router;
