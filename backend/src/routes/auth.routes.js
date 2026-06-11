import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  loginSchema,
  registerSchema,
  updateThemeSchema,
  updateUserSchema,
} from "../schemas/user.schema.js";

const router = Router();

router.post("/register", validateBody(registerSchema), authController.register);
router.post("/login", validateBody(loginSchema), authController.login);
router.post("/logout", authenticate, authController.logout);
router.get("/current", authenticate, authController.getCurrent);
router.patch(
  "/me",
  authenticate,
  upload.single("avatar"),
  validateBody(updateUserSchema),
  authController.updateProfile
);
router.patch(
  "/theme",
  authenticate,
  validateBody(updateThemeSchema),
  authController.updateTheme
);

export default router;
