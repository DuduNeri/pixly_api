import { Router, Request, Response } from "express";
import { ImageController } from "../controllers/image.controller";
import { authMidleware } from "../middlewares/auth.middleware";
import { upload } from "../config/multer";

export const imageRoute = Router();
const image = new ImageController();

imageRoute.post(
  "/image",
  authMidleware,
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const newImage = await image.postImage(req.file as Express.Multer.File);

      res.status(201).json(newImage);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

imageRoute.get(
  "/image/:id",
  authMidleware,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const imageData = await image.getImage(id);

      res.status(200).json(imageData);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);
