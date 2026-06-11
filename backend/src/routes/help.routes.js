import { Router } from "express";
import helpController from "../controllers/help.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import { helpSchema } from "../schemas/help.schema.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validateBody(helpSchema),
  helpController.sendHelp
);

export default router;
