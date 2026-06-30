import {
  CreateCommentDTO,
  GetAvatarDTO,
  GetCommentDTO,
  UpdatePhoto,
  UpdatePostDTO,
} from "./../interfaces/post.interface";
import {
  IPosts,
  PostCreationAttributes,
  type CommentAttributes,
} from "../interfaces/post.interface";
import { AppError } from "../utils/appError";
import Post from "../models/post.model";
import User from "../models/user.model";
import Comment from "../models/comments.model";
import Like from "../models/like.model";

const API_URL = process.env.API_URL ?? "http://localhost:3333";

export class PostService {
  async createPost(data: PostCreationAttributes) {
    if (!data.userId) {
      throw new AppError(400, "O ID do usuário é obrigatório.");
    }

    if (!data.title || !data.contentText) {
      throw new AppError(
        400,
        "O post deve ter pelo menos um título e conteúdo.",
      );
    }

    try {
      return await Post.create({
        title: data.title,
        contentText: data.contentText,
        contentImage: data.contentImage,
        userId: data.userId,
        avatar: data.avatar,
      });
    } catch (error: any) {
      throw new AppError(400, `Erro ao criar post: ${error.message}`);
    }
  }

  async createComment(data: CreateCommentDTO) {
    try {
      const comment = await Comment.create(data);
      return comment;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteComment(id: string, userId: string) {
    try {
      
      const comment = await Comment.findByPk(id);

      if (!comment) {
        throw new Error("Comentário não encontrado");
      }

      if (comment.userId !== userId) {
        throw new AppError(403, "Você não tem permissão para excluir este comentário");
      }
      
      await comment.destroy();
      return { message: "Comentario excluído com sucesso" };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new AppError(400, `Erro ao excluir comentário;: ${error.message}`);
    }
  }

  async getCommentsByPostId(postId: string): Promise<GetCommentDTO[]> {
    try {
      const comments = await Comment.findAll({
        order: [["createdAt", "DESC"]],
        where: { postId },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "avatar"],
          },
        ],
      });

      return comments.map((comment) => {
        const data = comment.toJSON() as any;

        return {
          id: data.id,
          content: data.content,
          postId: data.postId,
          userId: data.userId,
          user: {
            id: data.user.id,
            name: data.user.name,
            avatar: data.user.avatar,
          },
        };
      });
    } catch (error) {
      console.error("Erro ao listar comentários do post:", error);
      throw error;
    }
  }
  async getPostsByUsers(
    page: number = 1,
    limit: number = 10,
    currentUserId?: string | null,
  ): Promise<IPosts[]> {
    try {
      const offset = (page - 1) * limit;

      const posts = await Post.findAll({
        order: [["createdAt", "DESC"]],
        limit,
        offset,
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "avatar"],
          },
          {
            model: Like,
            as: "likes",
            attributes: ["userId"],
          },
          {
            model: Comment,
            as: "comments",
            attributes: ["userId", "content"],
          },
        ],
      });

      if (!posts.length) {
        throw new AppError(404, "Nenhum post encontrado");
      }

      return posts.map((post) => this.formatPost(post, currentUserId));
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      throw new AppError(400, `Erro ao buscar posts: ${error.message}`);
    }
  }

  async getPost(id: string): Promise<IPosts> {
    const post = await Post.findByPk(id);

    if (!post) {
      throw new AppError(404, "Post não encontrado");
    }

    return this.formatPost(post);
  }

  async deletePost(id: string, userId: string) {
    const post = await Post.findByPk(id);

    if (!post) {
      throw new AppError(404, "Post não encontrado");
    }

    if (post.userId !== userId) {
      throw new AppError(403, "Sem permissão para excluir este post");
    }

    await post.destroy();
    return { message: "Post excluído com sucesso" };
  }

  

  async updatePost(
    id: string,
    userId: string,
    data: UpdatePostDTO,
  ): Promise<IPosts> {
    const post = await Post.findByPk(id);

    if (!post) {
      throw new AppError(404, "Post não encontrado");
    }

    if (post.userId !== userId) {
      throw new AppError(403, "Sem permissão para editar este post");
    }

    await post.update(data);
    return this.formatPost(post);
  }

  async getPostsByUser(userId: string) {
    try {
      const posts = await Post.findAll({
        where: { userId },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      return posts;
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(`Erro ao buscar posts do usuário: ${error.message}`);
      }
      throw new Error("Erro desconhecido ao buscar posts do usuário");
    }
  }

  async getAvatar(data: GetAvatarDTO) {
    const user = await User.findByPk(data.userId);

    if (!user) {
      throw new AppError(404, "Usuário não encontrado");
    }

    return {
      avatar: user.avatar,
    };
  }

  async updateAvatar(data: UpdatePhoto) {
    const user = await User.findByPk(data.userId);

    if (!user) {
      throw new AppError(404, "Usuário não encontrado");
    }

    await user.update({
      avatar: data.avatar,
    });

    return {
      userId: user.id,
      avatar: user.avatar,
    };
  }

  async createLike(userId: string, postId: string) {
    const likeExists = await Like.findOne({
      where: {
        userId,
        postId,
      },
    });

    if (likeExists) {
      await likeExists.destroy();

      const likesCount = await Like.count({
        where: { postId },
      });

      return {
        liked: false,
        likesCount,
      };
    }

    await Like.create({
      userId,
      postId,
    });

    const likesCount = await Like.count({
      where: { postId },
    });

    return {
      liked: true,
      likesCount,
    };
  }

  private formatPost(post: Post, currentUserId?: string | null): IPosts {
    const plain = post.get({ plain: true });

    const likesArray = (plain.likes || []) as any[];

    return {
      ...plain,
      contentImageUrl: plain.contentImage
        ? `${API_URL}/uploads/${plain.contentImage}`
        : null,

      likesCount: likesArray.length,

      liked: currentUserId
        ? likesArray.some((like: any) => like.userId === currentUserId)
        : false,
    };
  }
}
