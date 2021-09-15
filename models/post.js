"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Post.belongsToMany(models.Tag, {
        through: "Post_Tags",
        as: "tags",
        foreignKey: "postId",
      });
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
