import { PostCreationAttributes, IPosts, UpdatePostDTO } from "../interfaces/post.interface";
import { PostService } from "../services/post.service";

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async createPost(data: PostCreationAttributes) {
    try {
      return this.postService.createPost(data);
    } catch (error: any) {
      throw new Error(`Erro ao criar post: ${error.message}`);
    }
  }

  async getPosts(): Promise<IPosts[]> {
    try {
      return this.postService.getPostByUsers();
    } catch (error: any) {
      throw new Error(`Erro buscar os posts dos usuários: ${error.message}`);
    }
  }

  async delete(id: string, userId: string) {
    try {
      return this.postService.deletePost(id, userId);
    } catch (error: any) {
      throw new Error(`Erro buscar os deletar post: ${error.message}`);
    }
  }

  async update(
    id: string,
    userId: string,
    data: UpdatePostDTO
  ): Promise<IPosts> {
    try {
      return this.postService.updatePost(id, userId, data)
    } catch (error: any) {
      throw new Error(`Erro atualizar post: ${error.message}`);
    }
  }
}
