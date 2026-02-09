import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";

export const loginRouter = Router();
const auth = new AuthController();

loginRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;
    const user = await auth.loginController(name, password);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});
