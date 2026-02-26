import { DataTypes, Model } from "sequelize";
import { CommentAttributes, CommentCreationAttributes } from "../interfaces/post.interface";

class Comment extends Model<
  CommentAttributes,
  CommentCreationAttributes
> implements CommentAttributes {
  public id!: string;
  public content!: string;
  public postId!: string;
  public userId!: string;
}
export default Comment;
