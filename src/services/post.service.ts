import {
  PostAttributes,
  PostCreationAttributes,
} from "../interfaces/post.interface";
import { AppError } from "../utils/appError";
import Post from "../models/post.model";

export class postService {
  async createPost(data: PostCreationAttributes) {
    try {
      return await Post.create(data);
    } catch (error: any) {
      throw new AppError(400, `Erro ao criar post: ${error.message}`);
    }
  }
}
