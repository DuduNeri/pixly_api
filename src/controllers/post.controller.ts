import {
  PostCreationAttributes,
  IPosts,
  UpdatePostDTO,
  type CommentAttributes,
} from "../interfaces/post.interface";
import { PostService } from "../services/post.service";

export class PostController {
  private readonly postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  createPost(data: PostCreationAttributes) {
    return this.postService.createPost(data);
  }

  getPosts(): Promise<IPosts[]> {
    return this.postService.getPostsByUsers();
  }

  getPost(id: string): Promise<IPosts | null> {
    return this.postService.getPost(id);
  }

  getPostUser(userId: string) {
    return this.postService.getPostsByUser(userId);
  }

  delete(id: string, userId: string) {
    return this.postService.deletePost(id, userId);
  }

  update(id: string, userId: string, data: UpdatePostDTO): Promise<IPosts> {
    return this.postService.updatePost(id, userId, data);
  }

  createComment(data: CommentAttributes){
    return this.postService.createComment(data)
  }
}
