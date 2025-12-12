import { Optional } from "sequelize";

export interface PostAttributes {
  id: string;
  title?: string;
  contentText?: string | null;
  contentImage?: string | null;
  comments: string[];
  userId: string; 
}

export interface IPosts{
  id: string;
  title?: string;
  contentText?: string | null;
  contentImage?: string | null; 
  comments: string[];
  userId: string;
}

export interface UpdatePostDTO {
  title?: string;
  contentText?: string | null;
  contentImage?: string | null;
}


export interface PostCreationAttributes
  extends Optional<
    PostAttributes,
    "id" | "title" | "contentText" | "contentImage" | "comments"
  > {}
