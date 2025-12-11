import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { PostAttributes, PostCreationAttributes } from "../interfaces/post.interface";

export class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  public id!: string;
  public title?: string;
  public contentText?: string | null;
  public contentImage?: string | null;
  public comments!: string[];
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    contentText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    contentImage: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },

    comments: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "posts",
    timestamps: true,
  }
);

export default Post;
