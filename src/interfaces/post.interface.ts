import { Optional } from "sequelize";

export interface PostAttributes {
  id: string;
  title?: string;
  contentText?: string | null;
  contentImage?: string | null;
  userId: string;
  avatar?: string;
  likes?: string;
}

export interface GetAvatarDTO {
  userId: string;
}

export interface CommentAttributes {
  id: string;
  content: string;
  postId: string;
  userId: string;
}

export type CreateCommentDTO = {
  content: string;
  postId: string;
  userId: string;
};

export type GetCommentDTO = {
  id: string;
  content: string;
  postId: string;
  user: {
    id: string;
    name: string;
    avatar: string | null;
  };
};


export interface CommentCreationAttributes
  extends Optional<CommentAttributes, "id"> {}


export interface IPosts {
  id: string;
  title?: string;
  contentText?: string | null;
  contentImage?: string | null;
  contentImageUrl?: string | null;
  userId: string;
  likes?: string;
  likesCount?: number;
  liked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostDTO {
  title?: string;
  contentText?: string | null;
  contentImage?: string | null;
  comments?: {
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
  }[];
}

export interface UpdatePostDTO {
  title?: string;
  contentText?: string;
  contentImage?: string;
  avatar?: string;
}

export interface UpdatePhoto {
  userId: string;
  avatar: string;
}

export interface UpdatePhoto {
  userId: string;
  avatar: string;
}

export interface PostResponseDTO {
  id: string;
  title?: string;
  contentText?: string | null;
  contentImage?: string | null;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
}

export interface PostCreationAttributes extends Optional<
  PostAttributes,
  "id" | "title" | "contentText" | "contentImage" 
> {}
