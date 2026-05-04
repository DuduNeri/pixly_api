import Post from "./post.model";
import User from "./user.model";
import Like from "./likes";

Post.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(Post, {
  foreignKey: "userId",
  as: "posts",
});

User.hasMany(Like, { foreignKey: 'userId' });
Like.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Like, { foreignKey: 'postId' });
Like.belongsTo(Post, { foreignKey: 'postId' });