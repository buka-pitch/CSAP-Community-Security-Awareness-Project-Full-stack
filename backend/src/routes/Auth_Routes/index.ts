import express from "express";
import LocalStrtegy from "passport-local";
import {
  GetUser,
  LoginController,
  LogoutController,
} from "../../controllers/AuthControllers/login";
import { RegistrationController } from "../../controllers/register";
import { ApiResponse } from "../../types/global";
const router = express.Router();

router.route("/login").post(LoginController);
router.route("/logout").get(LogoutController);
router.route("/register").post(RegistrationController);
router.route("/user").get(GetUser);

export default router;
