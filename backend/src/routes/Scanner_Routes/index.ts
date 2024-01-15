import { Router } from "express";
import { ScanUrl } from "../../controllers/ScannerController";

const router = Router();
router.route("/file").post();
router.route("/url").post(ScanUrl);
export default router;
