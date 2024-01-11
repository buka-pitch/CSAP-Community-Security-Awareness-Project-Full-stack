import express from "express";
import LocalStrtegy from "passport-local";
import {
  GetUser,
  LoginController,
  LogoutController,
} from "../../controllers/AuthControllers/login";
import { RegistrationController } from "../../controllers/AuthControllers/register";
import { ApiResponse } from "../../types/global";
import {
  GenerateAndSendOtp,
  veryifyOtp,
} from "../../controllers/AuthControllers/UserActivation";
const router = express.Router();

router.route("/login").post(LoginController);
router.route("/logout").get(LogoutController);
router.route("/register").post(RegistrationController);
router.route("/user").get(GetUser);
router.route("/new-user-activation").get(GenerateAndSendOtp);
router.route("/new-user-activation/otp/:otp").get(veryifyOtp);
export default router;
