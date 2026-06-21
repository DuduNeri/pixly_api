import {
  PostCreationAttributes,
  IPosts,
  UpdatePostDTO,
  CommentAttributes,
  UpdatePhoto,
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

  getPosts(userId?: string): Promise<IPosts[]> {
    return this.postService.getPostsByUsers(undefined, undefined, userId);
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

  createComment(data: CommentAttributes) {
    return this.postService.createComment(data);
  }

  updateAvatar(data: UpdatePhoto) {
    return this.postService.updateAvatar(data);
  }

  getAvatar(data: UpdatePhoto) {
    return this.postService.getAvatar(data);
  }

  async createLikeController(userId: string, postId: string) {
    return await this.postService.createLike(userId, postId);
  }
}
