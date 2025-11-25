import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req:Request, res:Response) => {
  return res.json({ message: "Pixly API is running 🚀" });
});

export default router;
