import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import toolsRouter from "./routes/tools";
import { errorHandler } from "./middleware/errorHandler";
const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use("/api/v1/tools", toolsRouter);

// ...other routers

app.use(errorHandler);
export default app;