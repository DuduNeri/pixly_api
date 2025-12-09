import { PostCreationAttributes } from "../interfaces/post.interface";
import { postService } from "../services/post.service";

export class postController {
  private PostService: postService;
  constructor() {
    this.PostService = new postService();
  }

  async post(data: PostCreationAttributes) {
    try {
      return await this.PostService.createPost(data);
    } catch (error: any) {
      throw new Error(`Erro ao cirar post: ${error.message}`);
    }
  }
}
