import express, { Request, Response } from "express";
import User from "../models/user.model";
import { setToken } from "../utilities/token";

const userRouter = express.Router();

userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create(req.body);

    const token = setToken(newUser._id);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    return res
      .status(200)
      .json({ message: "New User Registered", userId: newUser._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

export default userRouter;
