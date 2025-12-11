import {
  IPosts,
  PostAttributes,
  PostCreationAttributes,
} from "../interfaces/post.interface";
import { AppError } from "../utils/appError";
import Post from "../models/post.model";

export class PostService {
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

      const newPost = await Post.create(payload);
      return newPost;
    } catch (error: any) {
      throw new AppError(400, `Erro ao criar post: ${error.message}`);
    }
  }

  async getPostByUsers(): Promise<IPosts[]> {
    try {
      const posts = await Post.findAll();
      if (!posts || posts.length === 0) {
        throw new AppError(404, "Nenhum post encontrado");
      }
      return posts;
    } catch (error: any) {
      throw new AppError(400, `Erro ao buscar posts: ${error.message}`);
    }
  }
}
