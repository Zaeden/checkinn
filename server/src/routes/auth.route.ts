import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { setToken } from "../utilities/token";
import verifyToken from "../middlewares/auth";

const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = setToken(user._id);

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    return res
      .status(200)
      .json({ message: "User Logged In Successfully", userId: user._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

authRouter.get(
  "/validate-token",
  verifyToken,
  (req: Request, res: Response) => {
    res.status(200).json({ userId: req.userId });
  }
);

authRouter.post("/logout", async (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

export default authRouter;
