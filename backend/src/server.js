import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import cardsRouter from "./routes/cardsRouter.js";
import tasksRouter from "./routes/tasksRouter.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/cards", cardsRouter);
app.use("/api/tasks", tasksRouter);

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
