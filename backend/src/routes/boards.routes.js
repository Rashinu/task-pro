import { Router } from "express";
import boardsController from "../controllers/boards.controller.js";
import columnsController from "../controllers/columns.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createBoardSchema, updateBoardSchema } from "../schemas/board.schema.js";
import { createColumnSchema } from "../schemas/column.schema.js";

const router = Router();

router.use(authenticate);

router.get("/", boardsController.getAll);
router.post("/", validateBody(createBoardSchema), boardsController.create);
router.get("/:boardId", boardsController.getById);
router.patch(
  "/:boardId",
  validateBody(updateBoardSchema),
  boardsController.update
);
router.delete("/:boardId", boardsController.remove);

router.post(
  "/:boardId/columns",
  validateBody(createColumnSchema),
  columnsController.create
);

export default router;
