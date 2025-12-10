import { PostCreationAttributes } from "../interfaces/post.interface";
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
}
