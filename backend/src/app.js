import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };

import authRouter from "./routes/auth.routes.js";
import boardsRouter from "./routes/boards.routes.js";
import columnsRouter from "./routes/columns.routes.js";
import cardsRouter from "./routes/cards.routes.js";
import helpRouter from "./routes/help.routes.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRouter);
app.use("/api/boards", boardsRouter);
app.use("/api/columns", columnsRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/help", helpRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
