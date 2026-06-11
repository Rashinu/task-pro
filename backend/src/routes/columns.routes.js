import { Router } from "express";
import columnsController from "../controllers/columns.controller.js";
import cardsController from "../controllers/cards.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import { updateColumnSchema } from "../schemas/column.schema.js";
import { createCardSchema } from "../schemas/card.schema.js";

const router = Router();

router.use(authenticate);

router.patch(
  "/:columnId",
  validateBody(updateColumnSchema),
  columnsController.update
);
router.delete("/:columnId", columnsController.remove);

router.post(
  "/:columnId/cards",
  validateBody(createCardSchema),
  cardsController.create
);

export default router;
