import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";

export const loginRouter = Router();
const auth = new AuthController();

loginRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await auth.loginController(email, password);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});
