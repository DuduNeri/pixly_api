import { Router, Request, Response } from "express";
import { postController } from "../controllers/post.controller";

export const postRouter = Router();
const Postcontroller = new postController();

postRouter.post("/post", async (req: Request, res: Response) => {
  try {
    const { title, contentText } = req.body;

    let contentImage: string | null = null;

    if (req.file) {
      contentImage = req.file.buffer.toString("base64");
    }

    const newPost = await Postcontroller.post({
      title,
      contentText,
      contentImage,
      userId: (req as any).user.id,
    });

    res.status(200).json(newPost);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
