import { UpdatePostDTO } from "./../interfaces/post.interface";
import {
  IPosts,
  PostCreationAttributes,
  type CommentAttributes,
} from "../interfaces/post.interface";
import { AppError } from "../utils/appError";
import Post from "../models/post.model";
import User from "../models/user.model";
import Comment from "../models/commetns.model";

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
        comments: data.comments ?? [],
        userId: data.userId,
      });
    } catch (error: any) {
      throw new AppError(400, `Erro ao criar post: ${error.message}`);
    }
  }

  async createComment(data: CommentAttributes) {
    try {
      const comment = await Comment.create(data);
      return comment;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getPostsByUsers(
    page: number = 1,
    limit: number = 10,
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
            attributes: ["id", "name"],
          },
        ],
      });

      if (!posts.length) {
        throw new AppError(404, "Nenhum post encontrado");
      }
      if (posts.length === 0) {
        throw new AppError(404, "Nenhum post encontrado");
      }
      return posts.map((post) => this.formatPost(post));
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
      });

      return posts;
    } catch (error: any) {
      if (error instanceof Error) {
        throw new Error(`Erro ao buscar posts do usuário: ${error.message}`);
      }
      throw new Error("Erro desconhecido ao buscar posts do usuário");
    }
  }

  private formatPost(post: Post): IPosts {
    const plain = post.get({ plain: true });

    return {
      ...plain,
      contentImageUrl: plain.contentImage
        ? `${API_URL}/uploads/${plain.contentImage}`
        : null,
    };
  }
}
