import { Router, Request, Response } from "express";
import { userController } from "../controllers/user.controller";

export const userRoute = Router();
const UserController = new userController();

userRoute.post("/create", async (req: Request, res: Response) => {
  try {
    const user = await UserController.createUser(req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});
