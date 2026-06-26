import { DataTypes, Model, Sequelize } from "sequelize";
import {
  CommentAttributes,
  CommentCreationAttributes,
} from "../interfaces/post.interface";

import { sequelize } from "../config/db";

class Comment extends Model<
  CommentAttributes,
  CommentCreationAttributes
> implements CommentAttributes {
  public id!: string;
  public content!: string;
  public postId!: string;
  public userId!: string;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "comments",
    timestamps: true,
  }
);

export default Comment;