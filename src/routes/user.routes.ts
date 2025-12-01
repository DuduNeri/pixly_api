import { Router, Request, Response } from "express";
import { userController } from "../controllers/user.controller";
import User from "../models/user.model";

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

userRoute.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await UserController.getUse(id);
    console.log(user);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

userRoute.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await UserController.getAll();
    res.status(200).json(users);
  } catch (error: any) {
     res.status(400).json({message: error.message});
  }
});

userRoute.delete("/user/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserController.deletUse(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});
