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
        return res.status(401).json({
          error: "Usuário não autenticado",
        });
      }

      const { title, contentText, avatar } = req.body;

      const contentImage = req.file ? req.file.filename : null;

      const post = await postController.createPost({
        title,
        contentText,
        userId: req.user.id,
        contentImage,
        avatar,
      });

      return res.status(201).json(post);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
);

postRouter.post(
  "/posts/avatar",
  authMidleware,
  upload.single("avatar"),
  async (req: Request, res: Response) => {
    try {
      // console.log("USER:", req.user);
      // console.log("FILE:", req.file);
      if (!req.user) {
        return res.status(401).json({
          error: "Usuário não autenticado",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          error: "Nenhuma imagem enviada",
        });
      }

      const avatarFileName = req.file.filename;
      console.log(avatarFileName);

      await postController.updateAvatar({
        userId: req.user.id,
        avatar: avatarFileName,
      });

      return res.status(200).json({
        message: "Imagem atualizada com sucesso",
        avatar: avatarFileName,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },
);

postRouter.get(
  "/posts",
  authMidleware,
  async (_req: Request, res: Response) => {
    try {
      const userId = (_req as any).userId || (_req as any).user?.id;


      const posts = await postController.getPosts(userId as string);

      return res.status(200).json(posts); 
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
);

postRouter.get(
  "/posts/avatar",
  authMidleware,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: "Usuário não autenticado",
        });
      }

      const avatar = await postController.getAvatar({
        userId: req.user.id,
        avatar: "",
      });

      return res.status(200).json(avatar);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  },
);

postRouter.get(
  "/post/:id",
  authMidleware,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const post = await postController.getPost(id);

      return res.status(200).json(post);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
);

postRouter.get(
  "/posts/:userId",
  authMidleware,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const posts = await postController.getPostUser(userId);

      return res.status(200).json(posts);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
);

postRouter.delete(
  "/post/:id",
  authMidleware,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: "Não autorizado",
        });
      }

      const { id } = req.params;

      const post = await postController.delete(id, req.user.id);

      return res.status(200).json({
        message: "Post deletado com sucesso",
        post,
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
);

postRouter.put(
  "/post/:id",
  authMidleware,
  upload.single("contentImage"),
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: "Não autorizado",
        });
      }

      const { id } = req.params;
      const { title, contentText } = req.body;

      const updateData: any = {
        title,
        contentText,
      };

      if (req.file) {
        updateData.contentImage = req.file.filename;
      }

      const update = await postController.update(id, req.user.id, updateData);

      return res.status(200).json(update);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },
);

postRouter.post("/like/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId } = req.body;

    const result = await postController.createLikeController(userId, postId);

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({
      error: error.message,
    });
  }
});
