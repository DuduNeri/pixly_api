import { Optional } from "sequelize";

export interface PostAttributes {
  id: string;
  title?: string;
  contentText?: string | null;
  contentImage?: string | null; // Base64 ou URL
  comments: string[];
  userId: string; // vem do token, não do body
}

export interface PostCreationAttributes
  extends Optional<
    PostAttributes,
    "id" | "title" | "contentText" | "contentImage" | "comments"
  > {}
