import { Router, Request, Response } from "express";
import { PostController } from "../controllers/post.controller";
import { authMidleware } from "../middlewares/auth.middleware";
import { upload } from "../uploads/uploads";

export const postRouter = Router();
const postController = new PostController();

postRouter.post(
  "/posts",
  authMidleware,
  upload.single("contentImage"),
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const { title, contentText } = req.body;
      const userId = req.user.id;

      const contentImage = req.file ? req.file.filename : null;

      const post = await postController.createPost({
        title,
        contentText,
        userId,
        contentImage,
      });

      return res.status(201).json(post);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },
);

postRouter.get("/posts", authMidleware, async (_req: Request, res: Response) => {
  try {
    const posts = await postController.getPosts();
    return res.status(200).json(posts);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

postRouter.get(
  "/post/:id",
  authMidleware,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const post = await postController.getPost(id);
      return res.status(200).json(post);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },
);

postRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId é obrigatório" });
    }
    const posts = await postController.getPostUser(userId);

    return res.status(200).json(posts);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});

postRouter.delete(
  "/post/:id",
  authMidleware,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(401).json({ error: "Não autorizado" });

      const { id } = req.params;
      const post = await postController.delete(id, req.user.id);

      return res
        .status(200)
        .json({ message: "Post deletado com sucesso", post });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },
);

postRouter.put(
  "/post/:id",
  authMidleware,
  upload.single("contentImage"),
  async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(401).json({ error: "Não autorizado" });

      const { id } = req.params;
      const { title, contentText } = req.body;

      const updateData: any = { title, contentText };
      if (req.file) updateData.contentImage = req.file.filename;

      const update = await postController.update(id, req.user.id, updateData);

      return res.status(200).json(update);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },
);