import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";
import dotenv from "dotenv";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://recipe-app-h06o.onrender.com"],
  })
);

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

dotenv.config();

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(process.env.PORT || 3001, () => console.log("Server started"));
