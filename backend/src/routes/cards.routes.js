import { Router } from "express";
import cardsController from "../controllers/cards.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  moveCardSchema,
  updateCardSchema,
} from "../schemas/card.schema.js";

const router = Router();

router.use(authenticate);

router.patch(
  "/:cardId",
  validateBody(updateCardSchema),
  cardsController.update
);
router.delete("/:cardId", cardsController.remove);
router.patch(
  "/:cardId/move",
  validateBody(moveCardSchema),
  cardsController.move
);

export default router;
