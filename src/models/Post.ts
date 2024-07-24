import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PostAttributes {
  id: number;
  title: string;
  content: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public content!: string;

  public readonly createdAt!: Date;
}

Post.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'posts',
      sequelize,
    }
);

export default Post;
