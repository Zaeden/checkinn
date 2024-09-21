import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import path from "path";

mongoose.connect(process.env.MONGO_URI as string);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(8080, () => {
  console.log(`Server running at Port Number 8080`);
});
