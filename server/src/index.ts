import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import myHotelRouter from "./routes/my-hotels.route";
import hotelsRouter from "./routes/hotels";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
app.use("/api/my-hotels", myHotelRouter);
app.use("/api/hotels", hotelsRouter);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.listen(8080, () => {
  console.log(`Server running at Port Number 8080`);
});
