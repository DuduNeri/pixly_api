import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { LikeAttributes } from '../interfaces/post.interface';

type LikeCreationAttributes = Optional<LikeAttributes, 'id'>;


class Like extends Model<LikeAttributes, LikeCreationAttributes>
  implements LikeAttributes {
  public id!: string;
  public userId!: string;
  public postId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Like.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
    timestamps: true,

    indexes: [
      {
        unique: true,
        fields: ['userId', 'postId'], 
      },
    ],
  }
);

export default Like;