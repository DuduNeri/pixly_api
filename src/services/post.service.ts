import {
  IPosts,
  PostCreationAttributes,
  UpdatePostDTO,
} from "../interfaces/post.interface";
import { AppError } from "../utils/appError";
import Post from "../models/post.model";

export class PostService {
  //cria um post
  async createPost(data: PostCreationAttributes) {
    try {
      if (!data.userId) {
        throw new AppError(
          400,
          "O ID do usuário é obrigatório para criar um post."
        );
      }

      const payload: PostCreationAttributes = {
        title: data.title,
        contentText: data.contentText,
        contentImage: data.contentImage,
        comments: data.comments ?? [],
        userId: data.userId,
      };

      if (!data.title || !data.contentText) {
        throw new AppError(
          400,
          "O post deve ter pelo menos um título ou conteúdo de texto."
        );
      }

      return await Post.create(payload);
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(400, `Erro ao criar post: ${error.message}`);
    }
  }
  //busca todos os posts
  async getPostsByUsers(
    page: number = 1,
    limit: number = 10
  ): Promise<IPosts[]> {
    try {
      const offset = (page - 1) * limit;
      const posts = await Post.findAll({
        order: [["createdAt", "DESC"]],
        limit: limit,
        offset: offset,
      });

      if (!posts || posts.length === 0) {
        throw new AppError(404, "Nenhum post encontrado");
      }
      return posts;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(400, `Erro ao buscar posts: ${error.message}`);
    }
  }
  //deleta um post
  async deletePost(id: string, userId: string) {
    try {
      const post = await Post.findByPk(id);

      if (!post) {
        throw new AppError(404, "Post não encontrado");
      }

      if (post.userId !== userId) {
        throw new AppError(
          403,
          "Você não tem permissão para excluir este post"
        );
      }

      await post.destroy();

      return { message: "Post excluído com sucesso" };
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(400, `Erro ao deletar post: ${error.message}`);
    }
  }
  //atualiza um post
  async updatePost(
    id: string,
    userId: string,
    data: UpdatePostDTO
  ): Promise<IPosts> {
    try {
      const post = await Post.findByPk(id);

      if (!post) {
        throw new AppError(404, "Post não encontrado");
      }

      if (post.userId !== userId) {
        throw new AppError(
          403,
          "Você não pode alterar o post de outro usuário"
        );
      }

      await post.update(data);

      return post;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(400, `Erro ao atualizar o post: ${error.message}`);
    }
  }
}
