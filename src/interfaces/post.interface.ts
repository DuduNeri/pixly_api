import { Optional } from "sequelize";

export interface PostAttributes {
  id: string;
  title?: string;
  contentText?: string | null;
  contentImage?: string | null;
  comments: string[];
  userId: string;
}

export interface IPosts {
  id: string;
  title?: string;
  contentText?: string | null;
  contentImage?: string | null;
  contentImageUrl?: string | null;
  comments: string[];
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface UpdatePostDTO {
  title?: string;
  contentText?: string | null;
  contentImage?: string | null;
}
export interface PostResponseDTO {
  id: string;
  title?: string;
  contentText?: string | null;
  contentImage?: string | null;
  comments: string[];
  createdAt: Date;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
}


export interface PostCreationAttributes
  extends Optional<
    PostAttributes,
    "id" | "title" | "contentText" | "contentImage" | "comments"
  > {}
