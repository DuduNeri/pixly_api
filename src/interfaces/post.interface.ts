import { Optional } from "sequelize";

export interface PostAttributes {
  id: string;
  title?: string;
  contentText?: string | null;
  contentImage?: string | null; // Base64 OU URL
  comments: string[];
  userId: string;
}

export interface PostCreationAttributes
  extends Optional<
    PostAttributes,
    "id" | "title" | "contentText" | "contentImage" | "comments"
  > {}
