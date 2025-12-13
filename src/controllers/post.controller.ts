import { PostCreationAttributes, IPosts, UpdatePostDTO } from "../interfaces/post.interface";
import { PostService } from "../services/post.service";

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async createPost(data: PostCreationAttributes) {
    try {
      return await this.postService.createPost(data);
    } catch (error: any) {
      throw new Error(`Erro ao criar post: ${error.message}`);
    }
  }

  async getPosts(): Promise<IPosts[]> {
    try {
      return await this.postService.getPostsByUsers();
    } catch (error: any) {
      throw new Error(`Erro ao buscar os posts dos usuários: ${error.message}`);
    }
  }

  async delete(id: string, userId: string) {
    try {
      return await this.postService.deletePost(id, userId);
    } catch (error: any) {
      throw new Error(`Erro ao deletar post: ${error.message}`);
    }
  }

  async update(
    id: string,
    userId: string,
    data: UpdatePostDTO
  ): Promise<IPosts> {
    try {
      return await this.postService.updatePost(id, userId, data);
    } catch (error: any) {
      throw new Error(`Erro ao atualizar post: ${error.message}`);
    }
  }
}
