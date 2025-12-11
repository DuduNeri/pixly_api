import { Router, Request, Response } from "express";
import { PostController } from "../controllers/post.controller";
import { authMidleware } from "../middlewares/auth.middleware";

export const postRouter = Router();
const postController = new PostController();

postRouter.post("/post", authMidleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const { title, contentText, contentImage } = req.body;

    const post = await postController.createPost({
      title,
      contentText,
      contentImage,
      userId: req.user.id,
      comments: [],
    });

    res.status(201).json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

postRouter.get("/posts", authMidleware, async (req: Request, res: Response) => {
  try {
    const posts = await postController.getPosts();
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
